
import api from "../../axios"

export const providerApplication = async () =>{
    try{
       let res = await api.get("/application/request-received/")
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

export const customerRequestAccpetOrReject = async (application_id,payload) => {
    try{
        const res = api.patch(`application/request-received/status/${application_id}/`,payload)
        return{
            success:true,
            data:res.data
        }
    } catch(error){
        return{
            success:false,
            error:error?.response?.data
        }
    }
}