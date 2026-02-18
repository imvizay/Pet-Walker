// get all listed jobs
import api from "../../axios";

export const getJobsAtProvider = async () => {
    try{
    let res = await api.get("/listed-jobs/")
    console.log("listed-jobs-data",res.data)
    return{
        success:true,
        data:res.data
    }
    }
    catch(error){
        console.log(error?.response?.data)
        return{
            success:false,
            error:error?.response?.data
        }
    }

}

export const sendApplication = (data) => {
    try{
        let res = api.post('/application/job/',data)
        console.log("application api response : " ,res.data)
        return {
            success:true,
            data:res.data
        }
    }catch(error){
        console.log("application api error : " ,error?.response?.data)
        return{
            success:false,
            error:error?.response?.data
        }
    }
}
