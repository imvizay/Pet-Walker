
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

import '../../css/auth/login.css'

const LoginAuth = () => {

  return (
    <div className="loginWrapper">
      <div className="loginCard">
        <h1 className="loginTitle">Welcome Back</h1>
        <p className="loginSubtitle">
          Login to continue managing your pet care experience.
        </p>

        <div className="loginForm">
          <div className="inputGroup">
            <Mail size={18} />
            <input type="email" placeholder="Email Address" />
          </div>

          <div className="inputGroup">
            <Lock size={18} />
            <input type="password" placeholder="Password" />
          </div>

          <div className="loginExtras">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button className="loginButton">Login</button>

          <div className="orDivider">OR LOGIN WITH</div>

          <div className="socialLogin">
            <button className="googleBtn">Google</button>
            <button className="facebookBtn">Facebook</button>
          </div>

          <p className="switchAuth">
            Don't have an account? <Link to="/signup">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginAuth;
