
import axios from "axios";
import api from "../axios";
export const createJob = async (jobData) => {
  try {
    const res = await api.post('/my/jobpost/', jobData)

    return {
      success: true,
      data: res.data
    };

  } catch (error) {
    console.log("yeh wala:", error?.response?.data);

    return {
      success: false,
      error: error?.response?.data
    }
  }
}



export const getJobs = async () => {

    try{
        const res = await api.get(`my/jobpost/`)

        return{
            success:true,
            data:res.data
        }
       
    } catch(err){
        return{
            success:false,
            error:err?.response?.data
        }
    }

}
