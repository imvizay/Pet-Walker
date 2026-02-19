import { useEffect, useState } from "react";
import { providerApplication } from "../../../api/providerApi/applications/application";
import '../../../assets/css/service_provider/application.css'

const ApplicationNotifications = () => {

  const [applications, setApplication] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
       const loadApplications = async () => {
         let res = await providerApplication()
         if(!res.success){
           setApplication([])
           return alert("application failed!")
         }
         setApplication(res.data)
       }
   
       loadApplications() 
  }, [])

  
  const accepted = applications.filter(a => a.status === "accepted")
  const rejected = applications.filter(a => a.status === "rejected")
  const pending  = applications.filter(a => a.status === "pending")

  
  const Card = ({item, type}) => (
    <div className={`appCard ${type}`}>
      <img
        src={item.profile_pic || "/defaultuserimg.avif"}
        alt=""
        className="avatar"
      />

      <div className="info">
        <h4>{item.applicant}</h4>
        <p className="pet">Petname : {item.pet_name.toUpperCase()}</p>
        <p className="job">{item.job_name.toUpperCase()}</p>
      </div>

      <div className="status">
        {type === "accepted" && "Accepted"}
        {type === "rejected" && "Rejected"}
        {type === "pending"  && "Pending"}
      </div>
    </div>
  );

  if (loading) return <p>Loading applications...</p>

   return (
    <div className="boardWrapper">
   
      {/* PENDING */}
      <div className="statusColumn">
        <h3>Pending</h3>
        <div className="columnScroll">
          {pending.length === 0 ? (
            <p className="empty">No pending requests</p>
          ) : (
            pending.map(app => (
              <Card key={app.id} item={app} type="pending"/>
            ))
          )}
        </div>
      </div>
       
      {/* ACCEPTED */}
      <div className="statusColumn">
        <h3>Accepted</h3>
        <div className="columnScroll">
          {accepted.length === 0 ? (
            <p className="empty">No accepted applications</p>
          ) : (
            accepted.map(app => (
              <Card key={app.id} item={app} type="accepted"/>
            ))
          )}
        </div>
      </div>
       
      {/* REJECTED */}
      <div className="statusColumn">
        <h3>Rejected</h3>
        <div className="columnScroll">
          {rejected.length === 0 ? (
            <p className="empty">No rejected applications</p>
          ) : (
            rejected.map(app => (
              <Card key={app.id} item={app} type="rejected"/>
            ))
          )}
        </div>
      </div>
       
    </div>
   )

}

export default ApplicationNotifications;
