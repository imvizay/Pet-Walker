import api from "../../axios"
export const getApplications = async () => {

    try{
        let res = await api.get('/application/my/')
        console.log(res.data)
        return {
            success:true,
            data:res.data
        }
    } catch(err){
        console.log("application error:",err?.response?.data)
        return{
            success:false,
            error:err?.response?.data
        }
    }

}