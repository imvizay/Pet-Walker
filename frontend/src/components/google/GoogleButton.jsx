import { GoogleLogin } from "@react-oauth/google";
import axios from 'axios'

import { useClienttRole } from "../../hooks/ClientRoleManager";
import fetchCurrentUser from "../../api/currentuser";

import { useNavigate } from "react-router-dom";

export default function GoogleLoginButton(){

    let { role } = useClienttRole()
    let navigate = useNavigate()

    let handleSuccess = async (response) => {

        try{
           let res = await axios.post(`http://localhost:8000/api/myauth/google/`,{
            token:response.credential,
            role:role,
           })

           console.log(res.data)

           localStorage.setItem("accessToken",res.data.access)

           await fetchCurrentUser()
           navigate('/') 
        }
        catch(err){
            console.log("error:",err)
        }
    } 

    return(
        <GoogleLogin
        onSuccess={handleSuccess}
        onError={()=>console.log("Login Failed! hehe")}
        />
    )
}