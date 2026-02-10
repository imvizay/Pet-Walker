
import api from "../axios"

// CREATE SERVICE
export const activateService = async (serviceData) => {
    try{
        let res = await api.post(`service/activate/`,serviceData)
        console.log("activating service api response :" , res.data)

        return{
            success:true,
            data:res.data
        }
    }catch(error){
        return {
            success:false,
            data:error?.response?.data
        }
    }
}

// GET SERVICE

export const getServices = async () => {
    try{
        let res = await api.get('services/')
        console.log("(GET:)SERVICES:",res.data)
        return {
            success:true,
            data:res.data
        }
    } catch(error){
        return{
            success:false,
            error:error?.response?.error
        }
    }
}


// GET SUBSCRIPTION

export const getSubscribedPlan = async () => {
    try{
        let res = await api.get('subscription/sub-type/')
        return{
            success:true,
            data:res.data
        }
    }catch(error){
        return {
            success:false,
            error:error?.response?.data
        }
    }
}