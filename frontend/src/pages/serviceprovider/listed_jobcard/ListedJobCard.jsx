import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import '../../../assets/css/service_provider/listed_jobs/listed_jobs.css'

import { sendApplication } from "../../../api/providerApi/jobs/jobsApi";

import { TimerIcon,Calendar1Icon, Calendar1, CalendarCheck } from 'lucide-react'

const ListedJobCard = ({ job }) => {
  const { user } = useUserContext();
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  console.log(job)

  const handleApply = async () => {
    if (!user) return alert("Login first");
    const data = {
      "job_post":Number(job.id) || 0,
      "owner":Number(job.owner) || 0,
      "has_applied":null,
    }
    try {
      setApplying(true);

      await sendApplication(data);
      setApplied(true);
      
    } catch (err) {
      console.error(err);
      alert("Failed to apply");

    } finally {
      setApplying(false);
    }
  }

  useEffect(()=>{
    console.log("job card at provider dashboard",job)
  },[])
  

  return (
    <div className="petJobCard">

      {/* PET IMAGE */}
      <div className="petImageWrapper">
        <img src={job.pet_profile} alt={job.pet_name} />
        <span className="serviceBadge">{job.service_type}</span>
      </div>

      {/* PET INFO */}
      <div className="petInfo">
        <h3>{job.pet_name}</h3>

        <div className="petTags">
          <span>{job.pet_type}</span>
          <span>{job.pet_breed}</span>
          <span>{job.gender.toUpperCase()}</span>
        </div>

        <div className="petStats">
          <span>Age: {job.age} yrs</span>
          <span>Weight: {job.weight} kg</span>
        </div>

        <div className="petExtras">
          {job.is_vaccinated && <span className="goodTag">Vaccinated</span>}
          {job.is_mixed_breed && <span className="neutralTag">Mixed Breed</span>}
        </div>

        <p className="petDesc">{job.description}</p>

        {/* TIME */}
        <div className="jobTime">
          <span><CalendarCheck color="green" size={16}/> {job.job_date}</span>
          <span><TimerIcon color="red" size={16}/> {job.start_time} - {job.end_time}</span>
        </div>

        <button
          onClick={handleApply}
          disabled={applying || applied}
          className="applyBtn"
        >
          {applied ? "Applied ✓" : applying ? "Applying..." : "Send Application"}
        </button>
      </div>
    </div>
  );
};

export default ListedJobCard;
