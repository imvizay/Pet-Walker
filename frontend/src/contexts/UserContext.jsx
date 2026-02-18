

import { createContext, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
export const UserContext = createContext()


export const UserContextProvider = ({children}) => {
    const navigate = useNavigate()
    const [user,setUser] = useState({})

    useEffect( () => {
        saveUser()
    },[])

    const saveUser = () => {
        let u = JSON.parse(localStorage.getItem("user"))
        if(!u) return null
        setUser(u)
    }

    const logoutUser = () => {
        if(!user) return
        localStorage.removeItem("user")
        setUser(null)
        navigate(`/`) // return to home page
    }

    return(
        <>
        <UserContext.Provider value={{user,saveUser,logoutUser}}>

            {children}

        </UserContext.Provider>
        </>
    )

}

export const useUserContext = () => {
    return useContext(UserContext)
}