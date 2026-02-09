import api from "../axios";

// current logged-in user
export const getCurrentUser = async () => {
  try {
    const res = await api.get("user/me/");
    console.log(res.data)
    return { success:true, data:res.data };

  } catch (error) {
    return {
      success:false,
      error:error?.response?.data
    }
  }
}


// current user kyc
export const getCurrentKyc = async () => {
  try {
    const res = await api.get("user/me/kyc/")
    return { success:true, data:res.data }

  } catch (error) {
    return {
      success:false,
      error:error?.response?.data
    }
  }
}
