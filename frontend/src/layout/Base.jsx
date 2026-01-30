import React from 'react'
import { Navbar } from '../components/commmon/Navbar'
import Footer from '../components/commmon/Footer'
import { Outlet } from 'react-router-dom'
function Base() {
  return (
    <>

    <Navbar/>
    <main id="main">
     <Outlet/>
    </main>
    <Footer/>

    </>
  )
}

export default Base