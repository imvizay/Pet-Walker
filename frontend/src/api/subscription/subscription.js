// Link Free or Pro plan to user.
import api from "../axios"
export const boundSubscription = async (plan,planId) => {
    
    try{
        const res = api.post(`subscription/${plan}/?plan_id=${planId}`)
        return {
            success:true,
            data:res.dataa
        }
    } catch(error){
        return{
            success:false,
            error:error?.response?.data
        }
    }
}