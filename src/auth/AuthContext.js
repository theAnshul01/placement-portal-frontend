import { createContext, useEffect, useState } from "react";
import api from '../api/api'
import { jwtDecode } from "jwt-decode";
import { setToken, clearToken } from "./tokenStore";


export const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    // user will look like: {id, email, role}
    const [isLoading, setIsLoading] = useState(true)
    // eslint-disable-next-line
    const [accessToken, setAccessToken] = useState(null)
    

    const login = async (credentials) => {
        
        const response = await api.post("/api/auth/login", credentials)
        setUser(response.data.user)
        setAccessToken(response.data.accessToken)
        setToken(response.data.accessToken)
        return response.data.user
        
    }

    

    const logout = async () => {
        await api.post("/api/auth/logout")
        setAccessToken(null)
        clearToken()
        setUser(null)
        
    }

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading
    }

    useEffect(()=>{
        const restoreSession = async() => {
            try {
                const response = await api.get("/api/auth/refresh")
                const decoded = jwtDecode(response.data.accessToken)
                setAccessToken(response.data.accessToken)
                setToken(response.data.accessToken)
                setUser({
                    id: decoded.id,
                    role: decoded.role,
                    name: decoded.name,
                })
            } catch (error) {
                setUser(null)
            } finally{
                setIsLoading(false)
            }
        }

        restoreSession()
    }, [])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}