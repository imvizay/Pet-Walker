import StatCard from "./StatCard";
import { useNavigate } from "react-router-dom";
function ProfileCard({user,manageAccount}){

  let navigate = useNavigate()
  return (
    <div className="profileCard">

      <div className="profileHeader">
        <img className="profileAvatar" src="/avatar.png"/>
        <div className="profileMeta">
          <h2>{user.username || ""}</h2>
          <p>{user.role || "Service Provider"}</p>
        </div>
        <div>
            <button 
            onClick={()=>navigate(`client-kyc/${user.id}`)}
            className="editProfileButton">Edit Profile</button>
        </div>
      </div>

    </div>
  )
}
export default ProfileCard;
