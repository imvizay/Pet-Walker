// Base Navbar

import { Link } from "react-router-dom";
import '../../assets/css/layout/base.css'
import {PawPrint} from 'lucide-react'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbarBrand">
        <span className="logoDot"><PawPrint/></span>
        <h1 className="brandText">PetWalker</h1>
      </div>

      <nav className="navbarLinks">
        <Link to="/">How it works</Link>
        <Link to="/">Pricing</Link>
        <Link to="/">Find Walkers</Link>
      </nav>

      <div className="navbarActions">
        <Link className="btnPrimary" to="/signup">Sign Up</Link>
        <Link className="btnSecondary" to="/login">Login</Link>
      </div>
    </header>
  );
}

export { Navbar };



// Customer Dashboard Navbar


import { Bell } from "lucide-react";
import '../../assets/css/customer_dashboard/customer_nav.css'
import { NavLink } from "react-router-dom";

function CustomerDashboardNavbar() {
  return (
    <>  
      <div className="cust_navbar">
      <div className="cust_logo"><PawPrint color="green"/> PetWalker</div>

      <div className="cust_navLinks">
        <NavLink to="" >Dashboard</NavLink>
        <NavLink to="jobpost">Jobs</NavLink>
        
        <NavLink to="/customer/history">History</NavLink>
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

export  { CustomerDashboardNavbar }