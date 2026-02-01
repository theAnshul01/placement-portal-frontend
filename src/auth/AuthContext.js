import { createContext, useState } from "react";

export const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    // user will look like: {id, email, role}

    const login = (userData) => {
        setUser(userData)
    }

    const logout = () => {
        setUser(null)
    }

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}