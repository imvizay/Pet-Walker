
// center of api call regarding - Create,Login,ResetPassword for service provider and customer

import api from "./axios";

export const createUser = async (userData) => {

  try {

    const res = await api.post("/register/", userData)
    console.log("Registered users:", res.data)
    return res.data

  } catch (error) {

    console.log(error?.response?.data)
    throw new Error("Creating new user failed")

  }
}


