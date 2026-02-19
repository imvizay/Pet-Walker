
import api from "../../axios"

export const providerApplication = async () =>{
    try{
       let res = await api.get("/application/provider/")
       console.log("application Data:",res.data)
        return{
            success:true,
            data:res.data
        }
    }catch(err){
        console.log(err.response.data)
        return{
            success:false,
            error:err?.response?.data
        }
    }
}