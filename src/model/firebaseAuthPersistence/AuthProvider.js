import React, { useEffect, useState } from "react"
import { firebaseAppAuth } from "../firebaseSelf/firebaseConfig"


export const AuthContext = React.createContext(undefined)

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [pending, setPending] = useState(true)

    useEffect(() => {
        firebaseAppAuth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        })
    }, [])

    if (pending) return <>Loading...</>

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

