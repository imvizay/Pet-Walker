import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../../../assets/css/customer_dashboard/forms/jobpostform.css";

import { getPetTypes, getPetBreeds } from "../../../api/customerApi/petApi";
import { createJob, getJobById, updateJob } from "../../../api/customerApi/jobApi";

import { validateJobForm } from "../../../utilis/validate_jobform";
import { CameraIcon } from "lucide-react";

const INITIAL_PAYLOAD = {
  owner: 1,
  pet_name: "",
  pet_type: "",
  pet_breed: "",
  age: "",
  weight: "",
  gender: "male",
  job_date: "",
  start_time: "",
  end_time: "",
  service_type: "walking",
  difficulty: "normal",
  description: "",
  is_vaccinated: false,
  is_mixed_breed: false
};

function JobPostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const fileInputRef = useRef();

  const [payload, setPayload] = useState(INITIAL_PAYLOAD);
  const [preview, setPreview] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [petTypeList, setPetTypeList] = useState([]);
  const [petBreedList, setBreedList] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);

  const [errors, setErrors] = useState({});

  /* ================= TYPES ================= */
  useEffect(() => {
    getPetTypes().then(res => setPetTypeList(res.data));
  }, []);

  /* ================= BREEDS ================= */
  useEffect(() => {
    if (!selectedPetId) return setBreedList([]);
    getPetBreeds(selectedPetId).then(res => setBreedList(res.data));
  }, [selectedPetId]);

  /* ================= EDIT MODE LOAD ================= */
  useEffect(() => {
    if (!isEdit) return;

    const loadJob = async () => {
      const res = await getJobById(id);
      if (!res.success) return;

      const {pet_profile, ...rest} = res.data

      setPayload(rest);
      setSelectedPetId(res.data.pet_type);

      if (res.data.pet_profile) {
        setPreview(pet_profile);
      }
    };

    loadJob();
  }, [id]);


  /* ================= INPUT ================= */
  function handleInput(e) {
    const { name, value, type, checked } = e.target;

    let val = value;
    if (type === "number") val = value === "" ? "" : parseFloat(value);
    if (type === "checkbox") val = checked;

    setPayload(prev => ({ ...prev, [name]: val }));
  }

  /* ================= FILE ================= */
  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleRemove() {
    setPhoto(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  /* ================ SERVICE ================= */
  function handleServiceClick(e){
    let btn = e.target.closest("button")
    let selected = btn.dataset.service

    setPayload((prev)=>({
      ...prev,
      service_type:selected
    }))
    
  }

  /* ================= SUBMIT ================= */
  async function handleSubmit(e) {
    e.preventDefault();

    const v = validateJobForm(payload);
    if (Object.keys(v).length) {
      setErrors(v);
      console.log(errors)
      return alert("Validation failed");
    }
    
    const formData = new FormData();

    Object.entries(payload).forEach(([k, v]) => {
      if (k !== "pet_profile") formData.append(k, v);
    });

    if (photo) formData.append("pet_profile", photo);

    let result;

    if (isEdit) {
      result = await updateJob(id, formData);
    } else {
      result = await createJob(formData);
    }

    if (!result.success) {
      setErrors(result.error);
      return alert("Operation failed");
    }

    alert(isEdit ? "Updated!" : "Created!");

    navigate("/customer-dashboard");
  }


  return (
    <div className="jobFormCard">
      
      <h3 className="formTitle">
        {isEdit ? "Edit Job Listing" : "Post a New Job"}
      </h3>

      <div className="photoSection">
        <h4>
          Profile Pic
        </h4>
        
        {
          preview ? (<img src={preview} alt="photo"/>):(
           <div>
             <span className="photoDisplay">
              <CameraIcon/>
            </span>
           </div>
          )
        }
      {/* PET PROFILE PIC */}
        <div className="profile-cta">
          <label className="upload-btn">Upload <input ref={fileInputRef} type="file" hidden onChange={handleFile} /></label>
          <button className="remove-btn" onClick={handleRemove}>Remove</button>
        </div>
      </div>
      
      {/* PET NAME */}
      <div className="formGroup">
        <h4>General Info</h4>
        <label>Pet Name <span className="requiredField">*</span></label>
        <input type="text" placeholder="e.g. Buddy"
          onChange={handleInput}
          name="pet_name"
          value={payload.pet_name}
        />
      </div>

        {/* PET TYPE */}
      <div className="formGroup">
        <label>Pet Type <span className="requiredField">*</span> </label>
        <select onChange={(e)=>{
          handleInput(e)
          setSelectedPetId(e.target.value)
        }} 
        name="pet_type" value={payload.pet_type}>
          <option value="">Select pet type</option>
         {petTypeList.map((el)=>(
          <option key={el.id} value={el.id}>{el.pet_type}</option>
         ))}
        </select>
      </div>

      {/* PET BREED */}
      <div className="formGroup">
        <label>Breed <span className="requiredField">*</span> </label>
        <select onChange={handleInput} disabled={!selectedPetId} name="pet_breed" value={payload.pet_breed}>
          <option value=""  >Select breed</option>
          {petBreedList.map((el)=>(
            <option value={el.id}>{el.breed_name}</option>
          ))}
        </select>

      </div>
      {/* PET AGE */}
      <div className="ageGroup">
        <div className="formGroup">
          <label>Age(years) <span className="requiredField">*</span></label>
          <input onChange={handleInput} name="age" value={payload.age} type="number" min={0} max={50} step={0.1} placeholder="02.2 "/>
        </div>

      {/* PET WEIGHT */}
        <div className="formGroup">
          <label htmlFor="">Weight(kg)</label>
          <input onChange={handleInput} name="weight" value={payload.weight} type="number" min={0} max={100} step={0.01} placeholder="15.12" />
        </div>
      
      {/* PET GENDER */}
        <div className="formGroup">
          <label >Gender</label>
          <select onChange={handleInput} name="gender" value={payload.gender}>
            <option value="male">Male</option>
            <option value="female">Female</option>

          </select>
        </div>

      </div>
      
      {/* DATE & TIME */}
      <div className="formGroup">
        <h4>Date & Time <span className="requiredField">*</span></h4>
        <div>
          <label>When do you need help?</label>
          <input  onChange={handleInput} name="job_date" value={payload.job_date} type="date" />
        </div>
      
      {/* START TIME */}
       <div className="timeslot">
           <div>
              <label>Start Time</label>
              <input onChange={handleInput} name="start_time" value={payload.start_time} type="time" />
          </div>

      {/* END TIME */}
          <div>
              <label>End Time</label>
              <input onChange={handleInput} name="end_time" value={payload.end_time} type="time" />
          </div>
       </div>
      </div>
      
      {/* SERVICE */}
      <div className="formGroup">
        <h4>Service Info <span className="requiredField">*</span></h4>
        <label>Select a service </label>

        <div className="serviceGrid" onClick={handleServiceClick}>
          <button
            data-service="walker"
            className={`serviceBtn ${payload.service_type === "walker" ? "active" : ""}`}
          >
            Walker
          </button>

          <button
            data-service="sitter"
            className={`serviceBtn ${payload.service_type === "sitter" ? "active" : ""}`}
          >
            Sitter
          </button>

          <button
            data-service="groomer"
            className={`serviceBtn ${payload.service_type === "groomer" ? "active" : ""}`}
          >
            Groomer
          </button>

          <button
            data-service="care"
            className={`serviceBtn ${payload.service_type === "care" ? "active" : ""}`}
          > 
          Care/Training 
          </button>
        </div>

      </div>
      
      {/* DIFFICULTY */}
      <div className="formGroup">
        <h4>Pet Behaviour <span className="requiredField">*</span> </h4>
        <label>Pet Difficulty Level </label>
        <select onChange={handleInput} name="difficulty" value={payload.difficulty}>
          <option value="normal">Normal</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
      </div>
      
      {/* DESCRIPTION */}
      <div className="formGroup">
        <h4>Note</h4>
        <textarea  className="textarea" value={payload.description} onChange={handleInput} name="description" placeholder="brief note on something about the job or pet...(optional)" rows={4} maxLength={300}></textarea>
      </div>

      <button onClick={handleSubmit} className="submitBtn">
         {isEdit ? "Update Job" : "Create Job"}
      </button>

    </div>
  );
}

export default JobPostForm;
