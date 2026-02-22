import { createContext, useContext, useEffect, useState } from "react";
import { clearAuth, getAuth } from "./authStorage";

const AuthContext = createContext()

export function AuthProvider({children}){
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const isAuthenticated = !!token

    useEffect(() => {
        async function loadAuth(){
            try{
                const {token, user} = await getAuth()
                if(token){
                    setToken(token)
                    setUser(user)
                }
            }catch(err){
                console.log('Error while loading authentication', err)
            }finally{
                setIsLoading(false)
            }

        }
        loadAuth()
    },[])

    async function logout(){
        await clearAuth()
        setUser(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{user, token, isAuthenticated, isLoading, setUser, setToken, setIsLoading, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext)

    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}