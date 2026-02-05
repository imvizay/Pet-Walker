// Api endpoint for getting users USERNAME & ID 


import axios from "axios";
const fetchCurrentUser = async () => {
    const token = localStorage.getItem("accessToken")
    console.log("frontend token:" , token)
    try{
        const res = await axios.get(`http://localhost:8000/api/auth/me/`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        localStorage.setItem("user",JSON.stringify(res.data))
        return res.data
    }
    catch(error){
        console.log("Login Failed!",error)
        return null
    }
}

export default fetchCurrentUser