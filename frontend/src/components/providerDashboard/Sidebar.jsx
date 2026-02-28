import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Sidebar(){
  const navigate = useNavigate();
  const [user,setUser] = useState({});
  const [open,setOpen] = useState(false);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  },[]);

  return (
    <>
      {/* Toggle Button */}
      <div 
        className="mobileMenuToggle" 
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={26}/> : <Menu size={26}/>}
      </div>

      {/* Overlay */}
      {open && (
        <div 
          className="sidebarOverlay" 
          onClick={()=>setOpen(false)} 
        />
      )}

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebarTop">
          <div>
            <h2 className="logoText">PetWalker</h2>
            <p>Provider Portal</p>
          </div>
        </div>

        <nav className="navLinks">
          <Link className="link" to='/provider-dashboard' onClick={()=>setOpen(false)}>Dashboard</Link>
          <Link className="link" to="listed-jobs" onClick={()=>setOpen(false)}>Search Jobs</Link>
          <Link className="link" onClick={()=>setOpen(false)}>Bookings</Link>
          <Link className="link" to="application" onClick={()=>setOpen(false)}>Applications</Link>
        </nav>

        <button 
          onClick={()=>{
            setOpen(false);
            navigate(`service-panel/${user?.id}/`);
          }}
          className="newServiceBtn"
        >
          + New Service
        </button>
      </aside>
    </>
  );
}

export default Sidebar;