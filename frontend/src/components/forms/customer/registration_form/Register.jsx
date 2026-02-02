import { useState } from "react";
// routing
import { useParams, Navigate } from "react-router-dom";
// css
import '../../../../assets/css/auth/register.css'
// icons
import { PawPrint, Briefcase, Share2 } from "lucide-react";
// component
import GoogleLoginButton from "../../../google/GoogleButton";
import { useClienttRole } from "../../../../hooks/ClientRoleManager";

// api calls
import { createUser } from "../../../../api/auth";





const AUTH_CONFIG = {
  login: {
    title: "Welcome Back",
    subtitle: "Login to manage your pet care services.",
    fields: ["email", "password"],
    buttonText: "Login",
    showSocial: true
  },
  register: {
    title: "Join PetWalker",
    subtitle: "Create your account to start finding or providing pet care today.",
    fields: ["name", "email", "password"],
    buttonText: "Create My Account",
    showRole: true,
    showSocial: true,
    footer: true
  },
  reset: {
    title: "Reset Password",
    subtitle: "Enter your email to receive reset instructions.",
    fields: ["email"],
    buttonText: "Send Reset Link",
    showSocial: false
  },
  otp: {
    title: "Verify OTP",
    subtitle: "Enter the 6-digit code sent to your email.",
    fields: ["otp"],
    buttonText: "Verify",
    showSocial: false
  }
}

function AuthForm() {

  let { type } = useParams();
  let config = AUTH_CONFIG[type];
  let { role, setRole } = useClienttRole();

  const [regDetail,setRegDetail] = useState({
    role: "" || role,
    username:"",
    email:"",
    password:""

  })

  // Display login form for invalid routes
  if (!config) return <Navigate to="/auth/login" />;

  
  let handleInputField = (e) => {
    let {name,value} = e.target
    setRegDetail((prev)=>({...prev,[name]:value}))
  }


  
  const actionMap = {
    register:createUser,
  }

  // Submit function
  let handleSubmit = (type) => {
    

    if(type=="register") {
      let errors = accountRegistrationVal(regDetail)

      if(Object.keys(errors).length>0){
        console.log(errors)
        return;
      }

      let action = actionMap(type)

      if(action){
        action(regDetail)
      }
      return alert("user created successfully")
    }

  }




  return (
    <div className="authPage">
      <div className="authCard">
        <h1>{config.title}</h1>
        <p className="authSubtitle">{config.subtitle}</p>

        {config.showRole && (
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
          {config.fields.map((field) => {
            if (field === "name")
              return <input key={field} type="text" placeholder="Full Name" name="username" value={regDetail.username || ""} onChange={handleInputField} />;

            if (field === "email")
              return <input key={field} type="email" placeholder="Email Address" name="email" value={regDetail.email}  onChange={handleInputField} />;

            if (field === "password")
              return <input key={field} type="password" placeholder="Password" name="password" value={regDetail.password}  onChange={handleInputField} />;

            if (field === "otp")
              return <input key={field} type="text" placeholder="Enter OTP" />;

            return null;
          })}
        </div>

        {config.showSocial && (
          <>
            <div className="registerOption">
              <span></span> OR CONTINUE WITH <span></span>
            </div>

            <div className="socialAuth">
              <GoogleLoginButton />
              <button><Share2 color="green" size={12}/> Facebook</button>
            </div>
          </>
        )}

        <button onClick={ () => handleSubmit(type)} className="authPrimaryBtn">
          {config.buttonText}
        </button>

        {config.footer && (
          <p className="authFooterText">
            By clicking "Create My Account", you agree to PetWalker's
            <span> Terms of Service</span> and <span>Privacy Policy</span>.
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
