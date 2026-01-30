import React from 'react'
import '../../assets/css/customer_dashboard/customer_dash.css'
import { FilterIcon, Search } from 'lucide-react'
import DashCards from '../../components/cards/customer_dash/dashCards'
import MyJobPost from '../../components/cards/customer_dash/MyJobPost'

import { Link } from 'react-router-dom'

function CustomerDashboard() {



  return (
    <>
    <div className="search">
      <h1>Welcome back, Sarah!</h1>

      <div className="searchBox">
        <div className="searchInput">
          <Search size={20} />
          <input 
            type="search" 
            placeholder="Search for walkers, sitters, or groomers near you..." 
          />
        </div>

        <button className="searchButton">
          <FilterIcon size={18} />
           <Link to="searchProvider">Find Care</Link>
        </button>
      </div>
    </div>

    <DashCards/>

    {/* My Job Post */}
    <section>
        <MyJobPost/>
    </section>

    </>
  )
}

export default CustomerDashboard
