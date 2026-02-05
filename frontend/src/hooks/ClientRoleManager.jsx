

import { useEffect,useState } from "react";

export const useClienttRole = () => {
    let [role,setRole] = useState("")

    useEffect(()=>{

        if(role){
            localStorage.setItem("role",role)
        }
        
    },[role])

    return {role,setRole}

}