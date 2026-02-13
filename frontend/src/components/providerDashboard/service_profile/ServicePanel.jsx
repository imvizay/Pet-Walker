import { useEffect } from "react";
import "../../../assets/css/service_provider/servicepanel.css";
import { CheckIcon } from "lucide-react";
import { activateService } from "../../../api/providerApi/manageServices";
import { useNavigate, useOutletContext } from "react-router-dom";

const SERVICES = [
  { id: 1, name: "walker" },
  { id: 2, name: "groomer" },
  { id: 3, name: "sitter" },
  { id: 4, name: "care" },
];

export default function ServicesPanel() {
  const navigate = useNavigate()

  const {
    hasSubscription,
    activeServices,
    alreadyActivated,
    setActiveService,
  } = useOutletContext()

  // HANDLE service selection
  const serviceSelection = (service) => {
    // alreadyActivated 
    const isLocked = alreadyActivated.some(
      (s) => s.service === service
    )
    if (isLocked) return;

    let allowed = hasSubscription?.max_service || 1;

    setActiveService((prev) => {
      const alreadyActive = prev.includes(service);

      if (alreadyActive) {
        return prev.filter((s) => s !== service);
      }

      if (allowed == 1) {
        return [service];
      }

      return [...prev, service];
    })
  }

  useEffect(() => {
    console.log("ACTIVESERV", activeServices);
  }, [activeServices]);

  // HANDLE SERVICE ACTIVATION REQUEST
  const submitRequest = async () => {
    if (activeServices.length > 0) {
      let res = await activateService(activeServices);

      if (!res.success) return alert("failed activation api");

      navigate("/service-provider");
      return;
    }

    alert("check services array values/length might be empty");
  };

  return (
    <div className="servicesContainer">
      <div className="servicesHeader">
        <h2>Active Services</h2>

        <span
          className={`planBadge ${
            hasSubscription.plan_name == "premimum" ? "premimum": "free"}`}>
          {hasSubscription.is_active ? "Subscription Active" : "Free Plan"} </span>
      </div>

      <p className="servicesDesc">
        A subscription unlocks all services. Free users may activate one service only.
      </p>

      <div className="servicesGrid">
        {SERVICES.map((obj) => {
          // ✔ compute once per card (clean + fast)
          const isActive = activeServices.includes(obj.name);
          const isActivated = alreadyActivated.some( (s) => s.service === obj.name )

          return (
            <div key={obj.id} 
              onClick={() => serviceSelection(obj.name)} 
              className={`serviceCard  ${isActivated ? "locked" : ""} ${isActive ? "active" : ""}`} >
              <label>
                {obj.name.charAt(0).toUpperCase() + obj.name.slice(1).toUpperCase()} </label>

              <span className="toggleDot">
                {(isActive || isActivated) && (
                  <CheckIcon color={isActivated ? "gray" : "blue"} size={18} />
                )}
              </span>
            </div>
          )
        })}

      </div>

      {alreadyActivated.length < 4 ? (
        <button onClick={submitRequest} className="activateServiceButton" >   Request Service Activation </button>
      ) : ( <span className="messageSpan"> Note: All services are activated. </span>)
      }
    </div>
  )
}
