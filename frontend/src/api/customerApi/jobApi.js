
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


// ALL
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

// SPECIFIC
export const getJobById = async (id) => {
  try {
    const res = await api.get(`my/jobpost/${id}/`);

    return {
      success: true,
      data: res.data
    };

  } catch (err) {
    return {
      success: false,
      error: err?.response?.data
    };
  }
};

// DELETE

export const removeJobById = async (id) => {

  try{
    let res = await api.delete(`my/jobpost/${id}/`)
    return{
      success:true,
    }
  }
  catch(error){
    return{
      success:false,
      error:error?.response?.data
    }
  }

}

export const updateJob = async (id,formData) => {

  try{
    let res = await api.put(`my/jobpost/${id}/`,formData)
    return{
      success:true,
      data:res.data
    }
  }catch(error){
    return{
      success:false,
      error:error?.response?.data
    }
  }

}



// FILTER JOB By ID 
export const searchQueryJob = async (query) => {

  try{
    let res = await api.get(`discover/providers/?query=${query}`)
    return {
      success:true,
      data:res.data
    }
  } catch(error){
    return {
      success:false,
      error:error?.response?.data
    }
  }

}