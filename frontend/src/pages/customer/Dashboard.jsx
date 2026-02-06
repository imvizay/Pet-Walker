import React from 'react'
import '../../assets/css/customer_dashboard/customer_dash.css'
import { ArrowBigDown, FilterIcon, FilterX, Heart, IdCard, ListFilterIcon, Plus, Search } from 'lucide-react'
import DashCards from '../../components/cards/customer_dash/dashCards'
import JobPostCard from '../../components/cards/customer_dash/MyJobPost'


import { Link } from 'react-router-dom'

function CustomerDashboard() {



  return (
    <>
    
    <div className='customerIndexPageContainer'>

      <div className='customerIndexHead'>
        <h1>WELCOME BACK , Vizay !</h1>

        <div className='searchBox'>
          <span className='searchIcon'><Search/></span>
          <input className='searchInput' type="search" placeholder='Find petwalker , sitter , grommer near your neighbourhood ...'  />
          <span className='searchBtn'> <ListFilterIcon/> FIND CARE</span>
        </div>
      </div>

      <div className='threeBoxes'>
      
          <DashCards/>
      
      </div>

      <div className='customerIndexLeg'>

        <div className='myJobPost'>
          <JobPostCard/>
        </div>

        <div className='platformServices'>

          <div className='createJobPost'>
            <h2>Create Job Post</h2>
            <p>post a new job and find a perfect care provider in minutes.</p>
            <div>
             <span><Plus/></span><span> Post a new job</span>
            </div>
          </div>

          <div className='quickLinks'>
            <div className='links'>
              <span><IdCard/></span>
              <span>Subscription Plan</span>
              <span><ArrowBigDown/></span>
            </div>

             <div className='links'>
              <span><Heart/></span>
              <span>Favourite Walker</span>
              <span><ArrowBigDown/></span>
            </div>
          </div>

        </div>

      </div>

    </div>

    

   

    </>
  )
}

export default CustomerDashboard
