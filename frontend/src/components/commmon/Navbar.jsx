import { Link } from "react-router-dom";
import '../../assets/css/layout/base.css'
import { PawPrint, Menu, X } from 'lucide-react'
import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";

function Navbar() {

  const { user, logoutUser } = useUserContext();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user?.id) {
    return (
      <header className="navbar">
        <div className="navbarBrand">
          <span className="logoDot"><PawPrint size={22} /></span>
          <h1 className="brandText"><Link style={{textDecoration:"none"}} to='/'>PetWalker</Link></h1>
        </div>

        {/* Desktop Links */}
        <nav className="navbarLinks">
          <Link to="/#how-it-works">How it works</Link>
          <Link to="/#pricing">Pricing</Link>
         
        </nav>

        <div className="navbarActions">
          <Link className="btnSecondary" to="/auth/login">Login</Link>
          <Link className="btnPrimary" to="/auth/register">Sign Up</Link>
        </div>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </div>

        {/* Mobile Menu */}
        <div className={`mobileMenu ${menuOpen ? "open" : ""}`}>
          <Link to="/#how-it-works" onClick={() => setMenuOpen(false)}>How it works</Link>
          <Link to="/#pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link to="/auth/login" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/auth/register" onClick={() => setMenuOpen(false)}>Sign Up</Link>
        </div>
      </header>
    )
  }

  return (
    <header className="navbar">
      <div className="navbarBrand">
        <span className="logoDot"><PawPrint size={22} /></span>
        <h1 className="brandText">PetWalker</h1>
      </div>

      <div className="navbarRight">
        <span className="userWelcome"> Welcome, {user?.username || "User"} </span>

        <button className="btnLogout" onClick={logoutUser}> Logout </button>
      </div>
    </header>
  )
}

export { Navbar }