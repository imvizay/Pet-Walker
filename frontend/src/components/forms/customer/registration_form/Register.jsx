import { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import '../../../../assets/css/auth/register.css'

import { PawPrint, Briefcase, Share2 } from "lucide-react";
import GoogleLoginButton from "../../../google/GoogleButton";

import { createUser, loginUser } from "../../../../api/auth";

import { accountRegistrationVal } from "../../../../utilis/validate_registration";
import fetchCurrentUser from "../../../../api/currentuser";


const AUTH_CONFIG = {
  login: {
    title: "Welcome Back",
    subtitle: "Login to manage your pet care services.",
    role:["customer","provider"],
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
  }
};

function AuthForm() {

  const navigate = useNavigate()
  const { type } = useParams()
  const config = AUTH_CONFIG[type]

  const emptyLogin = { email:"", password:"" }
  const emptyRegister = { username:"", email:"", password:"" }

  const [errors,setErrors] = useState({});
  const [role,setRole] = useState("customer");
  const [loginData,setLoginData] = useState(emptyLogin);
  const [regDetail,setRegDetail] = useState(emptyRegister);

  if (!config) return <Navigate to="/auth/login" />;

  // ---------------- INPUT HANDLER ----------------
  const handleInputField = (e)=>{
    const {name,value} = e.target;

    if(type==="login"){
      setLoginData(prev=>({...prev,[name]:value}))
    }else{
      setRegDetail(prev=>({...prev,[name]:value}))
    }

    setErrors(prev=>{
      const copy={...prev}
      delete copy[name]
      return copy
    })
  }

  // ---------------- SUBMIT ----------------
  const handleSubmit = async ()=>{

    // LOGIN
    if(type==="login"){
      const result = await loginUser(loginData)

      if(!result.success){
        setErrors(result.error || {})
        return
      }

      localStorage.setItem("accessToken",result.data.access)
      localStorage.setItem("refresh",result.data.refresh)

      await fetchCurrentUser()
      return alert("Logged In.",navigate('/'))
      
    }

    // REGISTER
    if(type==="register"){

      const validation = accountRegistrationVal(regDetail)

      if(Object.keys(validation).length){
        setErrors(validation)
        return
      }

      const result = await createUser({
        ...regDetail,
        role
      })

      if(!result.success){
        setErrors(result.error || {})
        return
      }

      alert("User created successfully")
    }
  }

  // ---------------- RESET WHEN MODE CHANGES ----------------
  useEffect(()=>{
    setErrors({})
    setLoginData(emptyLogin)
    setRegDetail(emptyRegister)
  },[type])

  // ---------------- RENDER ----------------
  return (
    <div className="authPage">
      <div className="authCard">

        <h1>{config.title}</h1>
        <p className="authSubtitle">{config.subtitle}</p>

        {config.showRole && (
          <div className="roleSelector">

            <button
              className={`roleBtn ${role==="customer"?"activeRole":""}`}
              onClick={()=>setRole("customer")}
            >
              <PawPrint size={18}/> Pet Owner
            </button>

            <button
              className={`roleBtn ${role==="provider"?"activeRole":""}`}
              onClick={()=>setRole("provider")}
            >
              <Briefcase size={18}/> Service Provider
            </button>

          </div>
        )}

    
        <div className="authFields">
         
          {config.fields.map(field=>{

            if(field==="name")
              return (
                <div key={field} className="fieldBlock">
                  <input
                    type="text"
                    name="username"
                    placeholder="Full Name"
                    value={regDetail.username}
                    onChange={handleInputField}
                  />
                  {errors.username && <p className="fieldError">{errors.username}</p>}
                </div>
              )

            if(field==="email")
              return (
                <div key={field} className="fieldBlock">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={type==="login" ? loginData.email : regDetail.email}
                    onChange={handleInputField}
                  />
                  {errors.email && <p className="fieldError">{errors.email}</p>}
                </div>
              )

            if(field==="password")
              return (
                <div key={field} className="fieldBlock">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={type==="login" ? loginData.password : regDetail.password}
                    onChange={handleInputField}
                  />
                  {errors.password && <p className="fieldError">{errors.password}</p>}
                </div>
              )

            return null
          })}

        </div>

        {config.showSocial && (
          <>
            <div className="registerOption">
              <span/> OR CONTINUE WITH <span/>
            </div>

            <div className="socialAuth">
              <GoogleLoginButton/>
              <button>
                <Share2 size={12}/> Facebook
              </button>
            </div>
          </>
        )}

        {errors.role && <p className="fieldError">{errors.role}</p>}

        <button onClick={handleSubmit} className="authPrimaryBtn">
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
  )
}

export default AuthForm;
