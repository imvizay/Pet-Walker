
// Customer Dashboard Navbar


import { Bell,PawPrint } from "lucide-react";
import '../../assets/css/customer_dashboard/navbar/customer_navbar.css'
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect } from "react";
const BASE = 'http://localhost:8000'
function CustomerDashboardNavbar() {

  const {user,logoutUser } = useUserContext()

  useEffect(()=>{
    console.log(user.profile_pic)
  },[])

  return (
    <>  
      <div className="cust_navbar">
      <div className="cust_logo"><PawPrint color="green"/> PetWalker</div>

      <div className="cust_navLinks">
        <NavLink to="" >Home</NavLink>

        <NavLink to="job-feeds">Job Feeds</NavLink>
        <NavLink to={`job-application/${user?.id}`}>Applications</NavLink>

        <NavLink to="job-history">My History</NavLink>

      </div>

      <div className="cust_navRight">
        <span className="cust_bell"><Bell/></span>
        <img
          className="cust_avatar"
          src={`${BASE}${user?.profile_pic}`|| "/defaultuserimg.avif" }
          alt="profile"
        />
        <div className="logoutBtn">
           <button onClick={ () => logoutUser() }>Logout</button>
        </div>
      </div>
      
    </div>
    </>
  )
}

export default CustomerDashboardNavbar 