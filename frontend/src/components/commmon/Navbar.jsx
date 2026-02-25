import { Link, useNavigate } from "react-router-dom";
import '../../assets/css/layout/base.css'
import { PawPrint } from 'lucide-react'
import { useEffect } from "react";
import { useUserContext } from "../../contexts/UserContext";

function Navbar() {

  const { user, logoutUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;

  //   if (user.role.includes("customer","provider")) {
  //     navigate("/customer-dashboard", { replace: true });
  //   } 
  //   else if (user.role.includes("customer")) {
  //     navigate("/customer-dashboard", { replace: true });
  //   } 
  //   else if (user.role.includes("provider")) {
  //     navigate("/provider-dashboard", { replace: true });
  //   }

  }, [user]);

  // ---------- NOT LOGGED IN ----------
  if (!user?.id) {
    return (
      <header className="navbar">
        <div className="navbarBrand">
          <span className="logoDot"><PawPrint size={22} /></span>
          <h1 className="brandText">PetWalker</h1>
        </div>

        <nav className="navbarLinks">
          <Link to="/">How it works</Link>
          <Link to="/">Pricing</Link>
          <Link to="/">Find Walkers</Link>
        </nav>

        <div className="navbarActions">
          <Link className="btnSecondary" to="/auth/login">Login</Link>
          <Link className="btnPrimary" to="/auth/register">Sign Up</Link>
        </div>
      </header>
    );
  }

  // ---------- LOGGED IN ----------
  return (
    <header className="navbar">
      <div className="navbarBrand">
        <span className="logoDot"><PawPrint size={22} /></span>
        <h1 className="brandText">PetWalker</h1>
      </div>

      <div className="navbarRight">
        <span className="userWelcome">
          Welcome, {user?.username || "User"}
        </span>

        <button className="btnLogout" onClick={logoutUser}>
          Logout
        </button>
      </div>
    </header>
  );
}

export { Navbar };
