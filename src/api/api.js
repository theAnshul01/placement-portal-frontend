import axios from 'axios'
import { getToken, setToken, clearToken } from '../auth/tokenStore'
import { notifySessionExpired } from '../context/SessionContext'

const api = axios.create({
    baseURL: "http://localhost:3500",
    withCredentials: true
})

api.interceptors.request.use(
    (config) => {
        const token = getToken()

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        // if no response, it's a network error
        if (!error.response) {
            return Promise.reject(error)
        }

        const status = error.response.status

        // DO NOT intercept auth endpoints
        if (originalRequest.url.includes("/api/auth/login") ||
            originalRequest.url.includes("/api/auth/refresh")
        ) {
            return Promise.reject(error)
        }

        // if 403 and request not retried yet -> try refresh //!_retry used to avoid infinite loop
        if (status === 403 && !originalRequest._retry) {
            originalRequest._retry = true

            try {

                // attempt refresh
                const refreshToken = await api.get("/api/auth/refresh")
                const newToken = refreshToken.data.accessToken

                setToken(newToken)

                originalRequest.headers.Authorization = `Bearer ${newToken}`

                return api(originalRequest)

            } catch (refreshError) {
                  
                clearToken();
                
                notifySessionExpired()
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error)
    }
)



export default api