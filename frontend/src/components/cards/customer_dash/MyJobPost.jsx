import { DogIcon, User2Icon } from 'lucide-react'
import React from 'react'

import '../../../assets/css/customer_dashboard/customer_dash.css'

import jobdog from '../../../assets/images/jobdog.jpg'

const job = {
  title: "Evening Walk for Cooper",
  category: "Dog Walking",
  date: "Today, 6:00 PM",
  description: "Cooper needs a 30-minute brisk walk around the neighborhood block...",
  applications: 5,
  image: jobdog
};

function MyJobPost() {
  return (
    <>
    <div className='jobPostHeading'>
        <h5>My Job Post</h5>

    </div>

    <div className='jobPostWrapper'>
            <JobPostCard job={job}/>
    </div>
    </>
  )
}

export default MyJobPost


function JobPostCard({ job }) {
  return (
    <div key={job.title} className="jobCard">
      
      <div className="jobImage">
        <img src={jobdog} alt={job.title} />
      </div>

      <div className="jobContent">
        
        <div className="jobHeader">
          <h3>{job.title}</h3>
        </div>

        <div className="jobMeta">
          <span>{job.category}</span>
          <span className="dot">•</span>
          <span>{job.date}</span>
        </div>

        <p className="jobDesc">
          {job.description}
        </p>

        <div className="jobFooter">
          <div className="avatars">
            <img src={<User2Icon/>} alt="" />
            <img src={<User2Icon/>} alt="" />
            <span className="more">+3</span>
          </div>

          <span className="applications">
            {job.applications} New Applications
          </span>
        </div>
      </div>

      <div className="jobAction">
        <span className="status active">Active</span>
        <button className="manageBtn">Manage</button>
      </div>

    </div>
  )
}
