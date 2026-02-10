import React from 'react'
import TopHeader from '../../providerDashboard/TopHeader'
import ProfileCard from '../ProfileCard'
import ServiceList from '../ServiceList'
import SubscriptionProviderCard from '../SubscriptionCard'


import { useState,useEffect } from 'react'

function Home() {

   const [user,setUser] = useState({})
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(!user) return
        setUser(user)
    },[])

  return (
    <>
    <TopHeader />

        <div className="dashboardGrid">

          <div className="leftColumn">
            <ProfileCard user={user} />
            <ServiceList />
          </div>

          <div className="rightColumn">
            <SubscriptionProviderCard />
          </div>

        </div>
    </>
  )
}

export default Home