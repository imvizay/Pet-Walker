import { useEffect, useState } from "react";
import axios from "axios";
import "../../../assets/css/clientkyc.css";
import api from "../../../api/axios";
import { getCurrentUser,getCurrentKyc } from "../../../api/providerApi/getuser";
import { submitKyc } from "../../../api/providerApi/manage_account";

const IMAGE_PREFIX = "http://localhost:8000"
const ClientProfileUpdate = () => {

  


  const [form, setForm] = useState({
    username: "",
    state: "",
    city:  "",
    street: "",
    pincode: "",
    contact: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState('/defaultuserimg.avif');
  const [loading, setLoading] = useState(false);


  // ================ LOAD USER DETAILS ==================== 
  useEffect(()=>{

    async function loadUser(){
      // api call
      const [userRes,kycRes] = await Promise.all([
        getCurrentUser(),
        getCurrentKyc()
      ])

      if(userRes.success){
        setForm((prev)=>({
          ...prev,
          username:userRes.data.username || ""
        }))

        setPreview(userRes.data.profile_pic || "")
      }

      if(kycRes.success){
        setForm((prev)=>({
          ...prev,
          state: kycRes.data.state || "",
          city: kycRes.data.city || "",
          street: kycRes.data.street || "",
          pincode: kycRes.data.pincode || "",
          contact: kycRes.data.contact || ""
        }))
      }

    }

    loadUser()

  },[])

  // ============= INPUT HANDLER ===================
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // =============== FILE HANDLER ===============
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  // ================= HANDLE SUBMIT ======================
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // ---------- CLIENT DATA ----------
  const userData = new FormData();
  userData.append("username", form.username);

  if(profilePic){
    userData.append("profile_pic", profilePic);
  }

  // ---------- KYC DATA ----------
  const kycData = {
    state: form.state,
    city: form.city,
    street: form.street,
    pincode: form.pincode,
    contact: form.contact,
  };

  try {

    await Promise.all([
      api.patch("user/me/", userData),      // update Client
      api.patch("user/me/kyc/", kycData)    // update KYC
    ]);

    alert("Profile Updated");

  } catch(err){
    console.log(err)
    alert("Update failed")
  }

  setLoading(false);
};


  return (
    <div className="kyc-container">

      <form onSubmit={handleSubmit}>

        {/* HEADER */}
        <div className="kyc-header">
          <h2>Profile & Verification</h2>
          <p>Keep your information accurate to receive bookings</p>
        </div>

        {/* PROFILE CARD */}
        <div className="kyc-card profile-card">

          <div className="avatar-area">
            <img
              src={`${IMAGE_PREFIX}${preview}` || '/defaultuserimg.avif'}
              alt="avatar"
            />
            <input type="file" accept="image/*" onChange={handleFile}/>
          </div>

          <div className="field">
            <label>Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Your display name"
            />
          </div>

        </div>

        {/* ADDRESS CARD */}
        <div className="kyc-card">

          <h3>Address Details</h3>

          <div className="grid">

            <div className="field">
              <label>State *</label>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>City *</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
              />
            </div>

            <div className="field full">
              <label>Street *</label>
              <input
                name="street"
                value={form.street}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Pincode</label>
              <input
                name="pincode"
                type="number"
                value={form.pincode}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Contact *</label>
              <input
                type="number"
                name="contact"
                value={form.contact}
                onChange={handleChange}
              />
            </div>

          </div>
        </div>

        {/* ACTION */}
        <div className="kycActionButtons">
          <button className="save-btn" disabled={loading}>
          {loading ? "Saving..." : "Save Profile"}
        </button>
         <div className="extraActions">
          <button className="discardBtn">Discard Changes</button>
          <button className="cancelBtn">Cancel Kyc</button>
         </div>
        </div>

      </form>
    </div>
  );
};

export default ClientProfileUpdate;
