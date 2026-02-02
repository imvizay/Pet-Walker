import { Routes, Route } from 'react-router-dom'
// base
import Base from './layout/Base'
import HeroSection from './pages/HomePage'

import './App.css'

import AuthForm from './components/forms/customer/registration_form/Register'

// customer
import CustomerDashboardLayout from './layout/dashboard/CustomerDashboard'
import CustomerDashboard from './pages/customer/Dashboard'

import JobPostForm from './components/forms/customer/JobPostForm'
import FindProviders from './pages/customer/searchProvider/FindProvider'


function App() {
  return (
    <Routes>
      {/* BASE */}
      <Route path="/" element={<Base />}>
        <Route index element={<HeroSection/>}/>
        <Route path="auth/:type" element={<AuthForm/>}/>
      </Route>

      {/* CUSTOMER */}
      <Route path='customerDashboard' element={<CustomerDashboardLayout/>}>

        <Route index element={<CustomerDashboard/>}/>
        <Route path='jobpost' element={<JobPostForm/>}/>
        <Route path='searchProvider' element={<FindProviders/>}/>

      </Route>

    </Routes>
  )
}

export default App
