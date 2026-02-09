import React from "react";

function JobCard({ job }) {
  return (
    <div className="petJobCard" >

      <div className="cardImage">
        <img src={job.pet_profile || "/placeholder.jpg"} alt="pet" />
      </div>

      <div className="cardContent">
        <h3>{job.pet_name}</h3>

        <div className="metaRow">
          <span>Posted 2 days ago</span>
          <span className="divider">•</span>
          <span>{job.applicants || 0} Applicants</span>
        </div>
        
        <hr />
        <div className="priceRow">
          <span className="price">₹{job.price || 1200}</span>
          <span className="fareType">Set Fare</span>
        </div>

      </div>

    </div>
  );
}

export default JobCard;
