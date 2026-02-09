
import { ArrowRight } from "lucide-react"

import { capitalizeEachWord,capitalizeFirstChar } from "../../../utilis/capitalize"
import { Link } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function JobPostCard({ jobs }) {

  const navigate = useNavigate()

  if(!jobs || jobs.length === 0){
    return <p>No jobs posted yet</p>
  }


  return (
    <>
      <div className='jobPostTitle'>
        <p>My Job Post</p>
        <span>View All <ArrowRight size={12}/> </span>
      </div>

      {jobs.map(job => (
        <div className="jobCard" key={job.id}>

          <div className="jobImage">
            <img src={job.pet_profile} alt={job.pet_name.toUpperCase()}/>
          </div>

          <div className="jobContent">

            <div className="jobHeader">
              <h3>{job.pet_name.toUpperCase()}</h3>
              <span className="status active">Active</span>
            </div>

            <div className="jobMeta">
              <span>{capitalizeFirstChar(job.service_type)}</span>
              <span className="dot">•</span>
              <span>{job.job_date}</span>
            </div>

            <p className="jobDesc">
              { job.description ? 
                capitalizeEachWord(job.description) 
               : 
               ""
              }
            </p>

            <div className="jobFooter">
              <button className="manageBtn" onClick={()=>navigate(`manage/${job.id}`)}>Manage</button>
            </div>

          </div>
        </div>
      ))}
    </>
  )
}
