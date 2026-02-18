import React, { useEffect,useState } from "react";
import "../../assets/css/customer_dashboard/applicationnotification.css";
import { dummyApplications } from "../../utilis/dummyapplications";
import { getApplications } from "../../api/customerApi/applications/application";

// api

const ApplicationsNotificationPanel = ({ applications = dummyApplications, onAccept, onReject }) => {

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
    },[])


  if (!applications.length) {
    return (
      <div className="emptyNotification">
        No new applications
      </div>
    );
  }

  return (
    <div className="applicationsPanel">
      {applications.map(application => (
        <div key={application.id} className="applicationCard">

          <div className="applicationTop">
            <img
              src={application.pet_profile}
              alt={application.pet_name}
              className="applicationPetImage"
            />

            <div className="applicationInfo">
              <h4 className="applicationTitle">
                {application.applicantName} applied for {application.pet_name}
              </h4>

              <p className="applicationMeta">
                Service: {application.service_type}
              </p>

              <p className="applicationTime">
                📅 {application.job_date}
              </p>
            </div>
          </div>

          <div className="applicationActions">
            <button
              className="acceptBtn"
              onClick={() => onAccept(application.id)}
            >
              Accept
            </button>

            <button
              className="rejectBtn"
              onClick={() => onReject(application.id)}
            >
              Reject
            </button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default ApplicationsNotificationPanel;
