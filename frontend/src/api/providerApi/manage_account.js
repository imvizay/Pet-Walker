
import api from "../axios";

export const submitKyc = async (data) => {

    try{
        let res = api.put(`me/kyc/`,data)
        return{
            success:true,
            data:res.data
        }
    } catch(error){
        return{
            success:true,
            error:error?.response?.data
        }
    }
}