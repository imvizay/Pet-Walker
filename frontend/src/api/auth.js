
// center of api call regarding - Create,Login,ResetPassword for service provider and customer

import api from "./axios";

export const createUser = async (userData) => {

  try {

    const res = await api.post("/register/", userData)
    console.log("Registered users:", res.data)
    return {
      success:true,
      data:res?.data
    }

  } catch (error) {

    console.log(error?.response?.data)
    alert("account with this email already exists.")
    return {
      success:false,
      error:error?.response?.data
    }

  }
}



// GENERATE JWT-TOKEN FOR USER ALREADY REGISTERED

export const loginUser = async (data) => {
  try {
    const res = await api.post("myauth/login/", data);
    return { success: true, data: res.data };
  } catch (err) {
    console.log(err.response?.data)
    return {
      success: false,
      error: err.response?.data
    }
  }
}
