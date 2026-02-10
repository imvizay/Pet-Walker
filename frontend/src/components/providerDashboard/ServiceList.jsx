import { useEffect, useState } from "react";
import ServiceItem from "./ServiceItem";

function ServiceList(){
  
  let [subscription,setSubscription] = useState()

  // FETCH Details From Local State
  useEffect(()=>{

    const subs = localStorage.getItem("subscription")
    if(!subs) return
    setSubscription(subs)

  },[])

  return (
    <div className="serviceCardContainer">
      <h3>Active Services</h3>
      <div className="serviceBox">
        <ServiceItem  />
      </div>
    
    </div>
  );
}
export default ServiceList;
