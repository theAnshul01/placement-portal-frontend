import { createContext, useContext, useState, useEffect } from "react";

const SessionContext = createContext(null)

let notifyReactSessionExpired = null

export const notifySessionExpired = () => {
    console.log("notifySessionExpired called")

    if(notifyReactSessionExpired){
        notifyReactSessionExpired()
    }
}

export const SessionProvider = ({children}) => {
    const [sessionExpired, setSessionExpired] = useState(false)

    useEffect(()=>{
        notifyReactSessionExpired = () => {
            console.log("✅ React state set: sessionExpired = true")
            setSessionExpired(true)
        }

        return () => {
            notifyReactSessionExpired = null
        }
    },[])


    const clearSessionExpired = () => {
        setSessionExpired(false)
    }

    return (
        <SessionContext.Provider
            value={{ sessionExpired, clearSessionExpired }}
        >
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = () => {
    const ctx = useContext(SessionContext);
    if (!ctx) {
        throw new Error("useSession must be used inside SessionProvider");
    }
    return ctx;
};
