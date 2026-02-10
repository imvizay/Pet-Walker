import { useState ,useEffect} from "react";
import '../../../assets/css/service_provider/servicepanel.css'
import { CheckIcon } from 'lucide-react'
import { getSubscribedPlan } from "../../../api/providerApi/manageServices";
import { activateService,getServices } from "../../../api/providerApi/manageServices";

import { useNavigate } from "react-router-dom"

const SERVICES = [
  { id: 1, name: "walker"},
  { id: 2, name: "groomer"},
  { id: 3, name: "sitter"},
  { id: 4, name: "care"}
];

export default function ServicesPanel() {
  const navigate = useNavigate()

  const [hasSubscription,setSubscription] = useState({})
  const [activeServices,setActiveService] = useState([])
  const [alreadyActivated,setAlreadyActivated] = useState([])
 

  // GET SUBSCRIPTION DATA
  useEffect(()=>{

    const loadSubscription = async () => {
        let res = await getSubscribedPlan()

        if(!res.success){
          return console.log(res.error)
        }
        setSubscription(res.data)
        localStorage.setItem("subscription",JSON.stringify(res.data)) // subscription detail is set on localstorage

    }

    const loadActivatedServices = async () => {
      let res = await getServices()
      if(!res.success) return console.log(res?.data?.error)
      
      let activated = res.data.filter(s=> s.is_active).map(s=>s.service)
      setAlreadyActivated(activated)   
    }

    loadSubscription()
    loadActivatedServices()
  
  },[])

  // console.log(hasSubscription)


  // HANDLE service selection
  const serviceSelection = (id,service) => {

    if(alreadyActivated.includes(service)) return 
    
    console.log("id",id,"service-name",service)

    let allowed = hasSubscription?.max_service || 1 
    console.log("allowed",allowed)

    setActiveService( prev => {

      const alreadyActive = prev.includes(service)

      // If same service clicked twice remove the id from selection
      if(alreadyActive){
        return prev.filter(s => s !== service)
      }

      if(allowed == 1){
        return [service]
      }

      return [...prev,service]
    })
  }

  useEffect(()=>{
    console.log(activeServices)
  },[activeServices])

  // HANDLE SERVICE ACTIVATION REQUEST

  const submitRequest = async () => {

    if(activeServices.length > 0 ){

      let res = await activateService(activeServices)

      if(!res.success) return alert("failed activation api")
       
      console.log(res.data)
      navigate('/service-provider')
      return 
    }

    return alert("check services array values/length might be empty")

  }

  return (
    <div className="servicesContainer">

      <div className="servicesHeader">
        <h2>Active Services</h2>

        <span className={`planBadge ${hasSubscription.plan_name == "premimum" ? "premimum" : "free"}`}>
          {hasSubscription.is_active ? "Subscription Active" : "Free Plan"}
        </span>
      </div>

      <p className="servicesDesc">
        A subscription unlocks all services. Free users may activate one service only.
      </p>

      <div className="servicesGrid">

        {SERVICES.map(obj=>(

          <div
            onClick={() => serviceSelection(obj.id, obj.name)}
            className={` serviceCard ${alreadyActivated.includes(obj.name) ? "locked" : ""} 
            ${activeServices.includes(obj.name) ? "active" : ""}`} key={obj.id} >

            <label>{obj.name.charAt(0).toUpperCase() + obj.name.slice(1).toUpperCase()}</label>

           <span className="toggleDot">

              {(activeServices.includes(obj.name) ||
                alreadyActivated.includes(obj.name)) && (
                
                  <CheckIcon
                    color={alreadyActivated.includes(obj.name) ? "gray" : "blue"}
                    size={18}
                  />
              )}

            </span>
            
          </div>
        ))}

      </div>

      {alreadyActivated.length > 4 ? <button onClick={submitRequest} className="activateServiceButton">Request Service Activation</button> : <span className="messageSpan">Note: All services are activated. </span>}
    </div>
  );
}
