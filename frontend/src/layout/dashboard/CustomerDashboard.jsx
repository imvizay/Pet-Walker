import React from 'react'
import { CustomerDashboardNavbar } from '../../components/commmon/Navbar'
import { Outlet } from 'react-router-dom'

function CustomerDashboardLayout() {
  return (
   <>
   <header>
    <CustomerDashboardNavbar/>
   </header>
   <main>
    <Outlet/>
   </main>

   <footer>
    
   </footer>

   </>
  )
}

export default CustomerDashboardLayout


