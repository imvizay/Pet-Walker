import StatCard from "./StatCard";
import { useNavigate } from "react-router-dom";
import { capitalizeEachWord } from "../../utilis/capitalize";


const PROFILE_URL = "http://localhost:8000"

function ProfileCard({user}){
  console.log("userProfilePic",user.profile_pic)
  console.log("userProfilePic",user)

  let navigate = useNavigate()
  
 

  return (
    <div className="profileCard">

      <div className="profileHeader">
        <img className="profileAvatar" 
            src={user?.profile_pic ? `${PROFILE_URL}${user?.profile_pic}` : "/defaultuserimg.avif"} />
        <div className="profileMeta">
          <h2 style={userNameStyle}>{user?.username?.toUpperCase() || ""}</h2>
          <p style={userRoleBox} >{capitalizeEachWord(user?.role)}</p>
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


const userNameStyle = {
  color:"blue",
  fontSize:"14px",
  fontWeight:600,
  letterSpacing:"1.5px"

}

const userRoleBox = {
  color:"gray",
  fontSize:'12px',
  fontWeight:600,
  letterSpacing:'1.2px'
}