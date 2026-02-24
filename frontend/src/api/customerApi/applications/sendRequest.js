import api from "../../axios";

export const requestProvider = async (data) => {
    console.log("Inside Provider Request API.")
    try{
        let res = api.post('/application/request-provider/',data)
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