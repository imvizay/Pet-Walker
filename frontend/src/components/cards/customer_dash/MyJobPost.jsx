import { DogIcon, User2Icon ,ArrowRight } from 'lucide-react'
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


export default function JobPostCard() {
  return (

    <>

    <div className='jobPostTitle'>
      <p>My Job Post</p>
      <span>View All <ArrowRight size={12}/> </span>
    </div>

    <div className="jobCard">

      <div className="jobImage">
        <img src={job.image} alt={job.title} />
      </div>

      <div className="jobContent">

        <div className="jobHeader">
          <h3>{job.title || ""}</h3>
          <span className="status active">Active</span>
        </div>

        <div className="jobMeta">
          <span>{job.category || ""}</span>
          <span className="dot">•</span>
          <span>{job.date || ""}</span>
        </div>

        <p className="jobDesc">{job.description || ""}</p>

        <div className="jobFooter">

          <div className="avatars">
            <div className="avatarIcon"><User2Icon size={14}/></div>
            <div className="avatarIcon"><User2Icon size={14}/></div>
            <span className="more">+3</span>
          </div>

          <span className="applications">
            {job.applications} New Applications
          </span>

          <button className="manageBtn">Manage</button>

        </div>

      </div>
    </div>
    </>
  )
}
