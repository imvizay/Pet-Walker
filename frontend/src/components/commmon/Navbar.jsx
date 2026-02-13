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
        <Link className="btnPrimary" to="auth/register">Sign Up</Link>
        <Link className="btnSecondary" to="auth/login">Login</Link>
      </div>
    </header>
  );
}

export { Navbar };


