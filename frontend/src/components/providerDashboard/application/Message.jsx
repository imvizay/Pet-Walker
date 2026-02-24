import { useEffect, useState } from "react";
import { providerApplication , customerRequestAccpetOrReject } from "../../../api/providerApi/applications/application";
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

  useEffect(()=>{
    console.log("At Provider Application Page Applicatons Fetches :",applications)
  },[])


  const handleCustomerRequest = async (application_id,customer_id,status) => {
    const payload = {
      customer:customer_id,
      status:status
    }

    let res = await customerRequestAccpetOrReject(application_id,payload)
    if(!res.success){
      alert("updating request status failed")
      return
    }
    alert("request has been updated")

  }

  
  const Card = ({ item, type }) => (
      <div className={`appCard ${type}`}>

        <img src={item.customer_profile_pic || "/defaultuserimg.avif"} alt="" className="avatar" />

        <div className="info">
          <h4>{item.customer_username}</h4>
          <p>{item.customer_email}</p>
          <p className={`statusText ${type}`}> Status: {type.charAt(0).toUpperCase() + type.slice(1)} </p>
        </div>

        {type === "pending" && (
          <div className="actionButtons">
            <button onClick={()=>handleCustomerRequest(item.id,item.customer,"accepted")} className="btn1">Accept</button>
            <button onClick={()=>handleCustomerRequest(item.id,item.customer,"rejected")} className="btn2">Reject</button>
          </div>
        )}
      </div>
  )

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
