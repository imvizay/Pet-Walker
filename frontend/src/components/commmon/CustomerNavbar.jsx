
// Customer Dashboard Navbar


import { Bell,PawPrint } from "lucide-react";
import '../../assets/css/customer_dashboard/navbar/customer_navbar.css'
import { NavLink } from "react-router-dom";

function CustomerDashboardNavbar() {
  return (
    <>  
      <div className="cust_navbar">
      <div className="cust_logo"><PawPrint color="green"/> PetWalker</div>

      <div className="cust_navLinks">
        <NavLink to="" >Dashboard</NavLink>
        <NavLink to="jobpost">Jobs</NavLink>
        
        <NavLink to="history">History</NavLink>
      </div>

      <div className="cust_navRight">
        <span className="cust_bell"><Bell/></span>
        <img
          className="cust_avatar"
          src="https://i.pravatar.cc/40"
          alt="profile"
        />
      </div>
    </div>
    </>
  )
}

export default CustomerDashboardNavbar 