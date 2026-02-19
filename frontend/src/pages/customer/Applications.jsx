import React, { useEffect,useState } from "react";
import "../../assets/css/customer_dashboard/applicationnotification.css";
import { dummyApplications } from "../../utilis/dummyapplications";
import { getApplications } from "../../api/customerApi/applications/application";
import { onAccept,onReject } from "../../api/customerApi/applications/application";

// api

const ApplicationsNotificationPanel = ( ) => {

    const [application,setApplication] = useState([])

    // load application
    useEffect( () => {

        const loadApplication = async () => {
            let res = await getApplications()
            if(!res.success){
                return alert("getting application is failed!")
            }
            setApplication(res.data)
        }

        loadApplication()
        console.log(application[0])
    },[])

  const handleApplication = async (applicationId,applicantId,action) => {
    console.log("INSIDE handleApplication id:", applicationId)
    console.log("INSIDE handleApplication action:",action)

    const requestToCall = action === "accepted" ? onAccept : onReject 

    let res = await requestToCall(applicationId,applicantId,action)

    if(!res.success){
      return alert("request action got failed")
    }
    console.log(application)
    setApplication((prev)=> prev.filter((a)=>a.id != applicationId))
    console.log("Application status has been updated",res.data)

  }
    


  if (!application.length) {
    return (
      <div className="emptyNotification">
        No new applications
      </div>
    );
  }

  return (
    <div className="applicationsPanel">
      {application.map(application => (
        <div key={application.id} className="applicationCard">

          <div className="applicationTop">
            <img src={application.profile_pic} alt={application.pet_name} className="applicationPetImage" />

            <div className="applicationInfo">
              <h4 className="applicationTitle"> {application.applicant} applied for {application.pet_name} </h4>

              <p className="applicationMeta"> Service: {application.service_type.toUpperCase()} </p>

              <p className="applicationTime"> 📅 {application.job_date} </p>
            </div>
          </div>

          <div className="applicationActions">
            <button className="acceptBtn" 
             onClick={() => handleApplication(application.id,application.applicant_id,"accepted")} > Accept </button>

            <button className="rejectBtn" 
             onClick={() => handleApplication(application.id,application.applicant_id,"rejected")} > Reject </button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default ApplicationsNotificationPanel;
