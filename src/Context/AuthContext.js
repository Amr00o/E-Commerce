import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext()




export default function AuthContextProvider({children}) {

    const [userIsLoggendIn, setUserIsLoggedIn] = useState(localStorage.getItem("token")? true : false)

    return <AuthContext.Provider value={{userIsLoggendIn, setUserIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
}