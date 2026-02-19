import api from "../../axios";

export const hireRequest = async () => {
    try{
        let res = api.post('/application/hire-request/',)
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