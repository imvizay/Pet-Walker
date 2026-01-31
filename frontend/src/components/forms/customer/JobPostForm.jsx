import { useEffect, useState } from "react";
import '../../../assets/css/customer_dashboard/forms/jobpostform.css'

import { getPetTypes,getPetBreeds } from "../../../api/customerApi/petApi";

function JobPostForm() {
  const [service, setService] = useState("");

  const [petTypeList,setPetTypeList] = useState([])
  const [petBreedList,setBreedList] = useState([])
  const [selectedPetId,setSelectedPetId] = useState(null)
  const [selectedBreed,setSelectedBreed] = useState("")


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

  return (
    <div className="jobFormCard">
      
      <h3 className="formTitle">
        <span className="plusIcon">+</span> Post a New Job
      </h3>

      <div className="formGroup">
        <label>Pet Name</label>
        <input type="text" placeholder="e.g. Buddy"
          onChange={handleInput}
          name="pet_name"
        />
      </div>

      <div className="formGroup">
        <label>Pet Type</label>
        <select onChange={(e)=>setSelectedPetId(e.target.value)} name="pet_category">
          <option value="">Select pet type</option>
         {petTypeList.map((el)=>(
          <option key={el.id} value={el.id}>{el.pet_type}</option>
         ))}
        </select>
      </div>

      <div className="formGroup">
        <label>Breed</label>
        <select disabled={!selectedPetId} name="pet_breed">
          <option value=""  >Select breed</option>
          {petBreedList.map((el)=>(
            <option value={el.id}>{el.breed_name}</option>
          ))}
        </select>

      </div>

      <div className="formGroup timeAvailability">
        <div>
          <label>When do you need help?</label>
          <input onChange={handleInput} name="date_of_availability" type="date" />
        </div>

        <div>
            <label>Time </label>
            <input onChange={handleInput} name="time_availability" type="time" />
        </div>
      </div>

      <div className="formGroup">
        <label>Select a service</label>

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
        <label>Pet Difficulty Level</label>
        <select name="pet_difficulty">
          <option value="normal">Normal</option>
          <option value="average">Average</option>
          <option value="severe">Severe</option>

        </select>

      </div>

      <div className="formGroup">
        <textarea onChange={handleInput} name="description" placeholder="Enter Description.(80 words)" rows={4} maxLength={80}></textarea>
      </div>

      <button className="submitBtn">
        Post This Job
      </button>

    </div>
  );
}

export default JobPostForm;
