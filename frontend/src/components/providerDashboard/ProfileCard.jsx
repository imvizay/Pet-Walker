import StatCard from "./StatCard";
import { useNavigate } from "react-router-dom";

const PROFILE_URL = "http://localhost:8000"

function ProfileCard({user}){

  let navigate = useNavigate()
 
 

  return (
    <div className="profileCard">

      <div className="profileHeader">
        <img className="profileAvatar" src={`${PROFILE_URL}${user?.profile_pic}` || "no-profile"}/>
        <div className="profileMeta">
          <h2>{user?.username || ""}</h2>
          <p>{ user?.role?.join(" • ") || "Service Provider"}</p>
        </div>
        <div>
            <button 
            onClick={()=>navigate(`client-kyc/${user?.id}`)}
            className="editProfileButton">Edit Profile</button>
        </div>
      </div>

    </div>
  )
}
export default ProfileCard;
