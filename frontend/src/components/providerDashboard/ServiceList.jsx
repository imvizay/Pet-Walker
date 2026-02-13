import { useEffect, useState } from "react";
import ServiceItem from "./ServiceItem";
import { useOutletContext } from "react-router-dom";
function ServiceList(){
  
  const { alreadyActivated } = useOutletContext()


  return (
    <div className="serviceCardContainer">
      <h3>Active Services</h3>
      <div className="serviceBox">
        <ServiceItem alreadyActivated={alreadyActivated} />

      </div>
    
    </div>
  );
}
export default ServiceList;
