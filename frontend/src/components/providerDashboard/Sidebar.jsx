
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom"
function Sidebar(){
  let navigate = useNavigate()

  const [user,setUser] = useState({})

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    setUser(user)
  },[])
  return (
    <aside className="sidebar">
    <div>
      <h2 className="logoText">PetWalker</h2>
      <p>Provider Portol</p>
    </div>

      <nav className="navLinks">
        <Link className="link" to='/provider-dashboard'>Dashboard</Link>
        <Link className="link" to="listed-jobs">Search Jobs</Link>

        <Link className="link">Bookings</Link>
        <Link className="link">Messages</Link>
       

      </nav>
      <button onClick={()=>navigate(`service-panel/${user.id}/`)} className="newServiceBtn">
        + New Service
      </button>
    </aside>
  );
}
export default Sidebar;
