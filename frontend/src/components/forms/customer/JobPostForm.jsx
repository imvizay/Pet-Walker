import { useEffect, useState } from "react";
import { useRef } from "react";
import '../../../assets/css/customer_dashboard/forms/jobpostform.css'

import { getPetTypes,getPetBreeds } from "../../../api/customerApi/petApi";
import { CameraIcon } from "lucide-react";

function JobPostForm() {

  const [payload,setPayload] = useState({

    owner:1,
    profile_pic:"",
    pet_name:"",
    pet_type:"",
    pet_breed:"",

    age:"",
    weight:"",
    gender:"",

    job_date:"",
    start_time:"",
    end_time:"",
    duration:"",
    service_type:"",
    difficulty:"",
    description:"",
    is_vaccinated:false,
    is_mixed_breed:false

  })

  const [preview,setPreview] = useState(null)
  const [photo,setPhoto] = useState(null)

  const [service, setService] = useState("");

  const [petTypeList,setPetTypeList] = useState([])
  const [petBreedList,setBreedList] = useState([])
  const [selectedPetId,setSelectedPetId] = useState(null)
  const [selectedBreed,setSelectedBreed] = useState("")

  let fileInputRef = useRef()


  // side effect for pet category
  useEffect(() => {
      getPetTypes()
       .then(res => {
          console.log("PET TYPE RES :", res.data)
          setPetTypeList(res.data)
      })
       .catch(err => console.error(err))
  }, [])

  // dependent side effect on pet category to fetch pet breeds
  useEffect(()=>{
    if(!selectedPetId){
      setBreedList([])
      return
    }
    getPetBreeds(selectedPetId)
    .then((res)=>{
      setBreedList(res.data)
      console.log("PET BREED RS :",res.data)
    })
    .catch(error=>console.log(error))
  },[selectedPetId])



  function handleInput(e){

  }
  function handleFile(e){
    let file = e.target.files[0]

    if(file){
      setPreview(URL.createObjectURL(file))
      setPhoto(file)
      return
    }
    return alert("setting pet profile pic goes failed! Try again!...")
  }

  function handleRemove(){
      setPreview(()=>null)
      setPhoto(()=>null)

      if(fileInputRef.current){
        fileInputRef.current.value = ""
      }
  }

  return (
    <div className="jobFormCard">
      
      <h3 className="formTitle">
        <span className="plusIcon">+</span> Post a New Job
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

        <div className="profile-cta">
          <label className="upload-btn">Upload <input ref={fileInputRef} type="file" hidden onChange={handleFile} /></label>
          <button className="remove-btn" onClick={handleRemove}>Remove</button>
        </div>
      </div>

      <div className="formGroup">
        <h4>General Info</h4>
        <label>Pet Name <span className="requiredField">*</span></label>
        <input type="text" placeholder="e.g. Buddy"
          onChange={handleInput}
          name="pet_name"
        />
      </div>

      <div className="formGroup">
        <label>Pet Type <span className="requiredField">*</span> </label>
        <select onChange={(e)=>setSelectedPetId(e.target.value)} name="pet_category">
          <option value="">Select pet type</option>
         {petTypeList.map((el)=>(
          <option key={el.id} value={el.id}>{el.pet_type}</option>
         ))}
        </select>
      </div>

      <div className="formGroup">
        <label>Breed <span className="requiredField">*</span> </label>
        <select disabled={!selectedPetId} name="pet_breed">
          <option value=""  >Select breed</option>
          {petBreedList.map((el)=>(
            <option value={el.id}>{el.breed_name}</option>
          ))}
        </select>

      </div>

      <div className="ageGroup">
        <div className="formGroup">
          <label>Age(years) <span className="requiredField">*</span></label>
          <input type="number" min={0} max={50} step={0.1} placeholder="02.2 "/>
        </div>

        <div className="formGroup">
          <label htmlFor="">Weight(kg)</label>
          <input type="number" min={0} max={100} step={0.01} placeholder="15.12" />
        </div>

        <div className="formGroup">
          <label htmlFor="">Gender</label>
          <select>
            <option value="male">Male</option>
            <option value="female">Female</option>

          </select>
        </div>

      </div>

      <div className="formGroup">
        <h4>Date & Time <span className="requiredField">*</span></h4>
        <div>
          <label>When do you need help?</label>
          <input onChange={handleInput} name="date_of_availability" type="date" />
        </div>

       <div className="timeslot">
           <div>
              <label>Start Time</label>
              <input onChange={handleInput} name="time_availability" type="time" />
          </div>

          <div>
              <label>End Time</label>
              <input onChange={handleInput} name="time_availability" type="time" />
          </div>
       </div>
      </div>

      <div className="formGroup">
        <h4>Service Info <span className="requiredField">*</span></h4>
        <label>Select a service </label>

        <div className="serviceGrid">
          <button 
            className={`serviceBtn ${service === "walking" ? "active" : ""}`}
            onClick={() => setService("walking")}
          >
            Walking
          </button>

          <button 
            className={`serviceBtn ${service === "sitting" ? "active" : ""}`}
            onClick={() => setService("sitting")}
          >
            Sitting
          </button>

          <button 
            className={`serviceBtn ${service === "grooming" ? "active" : ""}`}
            onClick={() => setService("grooming")}
          >
            Grooming
          </button>

          <button 
            className={`serviceBtn ${service === "care" ? "active" : ""}`}
            onClick={() => setService("care")}
          >
            Care
          </button>
        </div>
      </div>

      <div className="formGroup">
        <h4>Pet Behaviour <span className="requiredField">*</span> </h4>
        <label>Pet Difficulty Level </label>
        <select name="pet_difficulty">
          <option value="normal">Normal</option>
          <option value="average">Average</option>
          <option value="severe">Severe</option>

        </select>

      </div>

      <div className="formGroup">
        <h4>Note</h4>
        <textarea className="textarea" onChange={handleInput} name="description" placeholder="brief note on something about the job or pet...(optional)" rows={4} maxLength={80}></textarea>
      </div>

      <button className="submitBtn">
        Post This Job
      </button>

    </div>
  );
}

export default JobPostForm;
