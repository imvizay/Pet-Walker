import '../../assets/css/service_provider/serviceitem.css'
import { Scissors,Dog,Toilet,HeartHandshake } from 'lucide-react'

import { useOutletContext } from 'react-router-dom';

const icons = {
   walker: {
     icon: <Dog size={20} />,
     bgColor: "#6bb5e7"
   },
   groomer: {
     icon: <Scissors size={20} />,
     bgColor: "#dec253"
   },
   sitter: {
     icon: <Toilet size={20} />,
     bgColor: "#27984f"
   },
   care : {
    icon:<HeartHandshake size={20}/>,
    bgColor:"#FF1493"
   }
 }
 

function ServiceItem({ alreadyActivated = [] }) {

  const { publishService } = useOutletContext()

  if (alreadyActivated.length === 0) {
    return (
      <div className="emptyState">
        No Services Activated Right Now
      </div>
    );
  }

  return (
    <div className="serviceList">

      {alreadyActivated.map((s) => (
        <div className="serviceRowCard" key={s.id}>

          {/* Left Icon Section */}
          <div className="serviceIcon" style={{ backgroundColor: icons[s.service].bgColor }}>
            {icons[s.service].icon}
          </div>

          {/* Center Content */}
          <div className="serviceContent">

            <div className="serviceTop">
              <h2>{s.service}</h2>

              <div className="statusGroup">
                <span className={`chip ${s.is_active ? "on" : "off"}`}>
                  {s.is_active ? "Active" : "Inactive"}
                </span>

                <span className={`chip ${s.is_published ? "pub" : "draft"}`}>
                  {s.is_published ? "Published" : "Draft"}
                </span>
              </div>
            </div>

          </div>

          {/* Right Actions */}
          <div className="serviceActions">
             <button onClick={()=>publishService(s.id,s.is_active)} className={`actionAlt ${s.is_published ? "danger" : "success"}`} >{s.is_published ? "Unpublish" :"Publish now"}</button>

            <button className="actionMain">Manage</button>
          </div>

        </div>
      ))}

    </div>
  );
}

export default ServiceItem
