import Sidebar from '../../components/providerDashboard/Sidebar';
import '../../assets/css/service_provider/providerdashboard.css'

import { Outlet } from 'react-router-dom';
import { useState,useEffect } from 'react';

import { getSubscribedPlan } from '../../api/providerApi/manageServices';
import { getServices } from '../../api/providerApi/manageServices';
import { publishServiceCall } from '../../api/providerApi/manageServices';





function ProviderDashboard() {

  const [hasSubscription,setSubscription] = useState({})
  const [activeServices,setActiveService] = useState([])
  const [alreadyActivated,setAlreadyActivated] = useState([])

 

  // GET SUBSCRIPTION & ACTIVE SERVICE DATA 
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
      
      let activated = res.data.filter(s=> s.is_active)
      setAlreadyActivated(activated)   
    }

    loadSubscription()
    loadActivatedServices()
  
  },[])


  // TOGGLE SERVICE - PUBLISHED / UNPUBLISHED
 const publishService = async (id, currentStatus) => {

    let res = await publishServiceCall(id)

    if (!res.success) {
      console.log(res.error)
      return
    }

    // Update UI state
    setAlreadyActivated(prev =>
      prev.map(s =>
        s.id === id
          ? { ...s, is_published: !currentStatus }
          : s
      )
    )

    alert(res.message)
  }


  return (
    <div className="dashboardLayout">

      <Sidebar />

      <div className="dashboardMain">

        <Outlet 
          context={{
            // states
            activeServices:activeServices,
            hasSubscription:hasSubscription,
            alreadyActivated:alreadyActivated,
            
            // fn
            setActiveService:setActiveService,
            publishService:publishService,
          }}
        />

      </div>

    </div>
  );
}

export default ProviderDashboard;


