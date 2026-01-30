import { useState } from "react";
import '../../css/auth/register.css'
import { PawPrint, Briefcase,Mail,Share2 } from "lucide-react";
import GoogleLoginButton from "../../../components/google/GoogleButton";

import { useClienttRole } from "../../../hooks/ClientRoleManager"; // custom hook

function AuthForm({ type = "register" }) {

   let { role,setRole } = useClienttRole()

  return (
    <div className="authPage">

      <div className="authCard">
        <h1>{type === "register" ? "Join PetWalker" : "Welcome Back"}</h1>
        <p className="authSubtitle">
          {type === "register"
            ? "Create your account to start finding or providing pet care today."
            : "Login to manage your pet care services."}
        </p>

        {type === "register" && (
          <div className="roleSelector">
            <button
              className={`roleBtn ${role === "customer" ? "activeRole" : ""}`}
              onClick={() => setRole("customer")}
            >
              <PawPrint size={18} /> Pet Owner
            </button>
            <button
              className={`roleBtn ${role === "provider" ? "activeRole" : ""}`}
              onClick={() => setRole("provider")}
            >
              <Briefcase size={18} /> Service Provider
            </button>
          </div>
        )}

        <div className="authFields">
          {type === "register" && (
            <input type="text" placeholder="Full Name" />
          )}
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
        </div>
        
        <div className="registerOption"> 
            <span></span> OR REGISTER WITH <span></span>
        </div>

        <div className="socialAuth">
          {/* <button><Mail color="green" size={12}/> Google</button> */}
          <GoogleLoginButton/>
          <button><Share2 color="green" size={12}/> Facebook</button>
        </div>

        <button className="authPrimaryBtn">
          {type === "register" ? "Create My Account" : "Login"}
        </button>

        {type === "register" && (
          <p className="authFooterText">
            By clicking "Create My Account", you agree to PetWalker's
            <span> Terms of Service</span> and <span>Privacy Policy</span>.
          </p>
        )}
      </div>
    </div>
  )
}

export default AuthForm;
