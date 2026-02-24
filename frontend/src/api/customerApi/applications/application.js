import api from "../../axios"

// Get application at owner dashboard
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

// Accept application recived from customer for hiring us
export const onAccept = async (applicationId,applicantId,applicationStatus) => {

    const payload = {
        applicant_id:applicantId,
        action:applicationStatus
    }

    try{
        let res = await api.patch(`/application/status/${applicationId}/`,payload)
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



export const onReject = async (applicationId,applicantId,applicationStatus) => {

    const payload = {
        applicant_id:applicantId,
        action:applicationStatus
    }

    try{
        let res = await api.patch(`/application/status/${applicationId}/`,payload)
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