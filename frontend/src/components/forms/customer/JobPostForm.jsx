import { useState } from "react";
import '../../../assets/css/customer_dashboard/forms/jobpostform.css'

function JobPostForm() {
  const [service, setService] = useState("");

  return (
    <div className="jobFormCard">
      
      <h3 className="formTitle">
        <span className="plusIcon">+</span> Post a New Job
      </h3>

      <div className="formGroup">
        <label>Pet Name</label>
        <input type="text" placeholder="e.g. Buddy" />
      </div>

      <div className="formGroup">
        <label>Pet Type</label>
        <select>
          <option>Select pet type</option>
          <option>Dog</option>
          <option>Cat</option>
          <option>Bird</option>
        </select>
      </div>

      <div className="formGroup timeAvailability">
        <div>
          <label>When do you need help?</label>
          <input type="date" />
        </div>

        <div>
            <label>Time </label>
            <input type="time" />
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
        <textarea placeholder="Enter Description.(80 words)" rows={4} maxLength={80}></textarea>
      </div>

      <button className="submitBtn">
        Post This Job
      </button>

    </div>
  );
}

export default JobPostForm;
