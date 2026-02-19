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

import ManagePost from './pages/customer/ManagePost'

import ProviderDashboard from './layout/dashboard/ServiceProvider'
import ClientProfileUpdate from './components/forms/client_kyc/KycForm'
import Home from './components/providerDashboard/indexcomponent/Home'
import ServicesPanel from './components/providerDashboard/service_profile/ServicePanel'
import ProviderListing from './pages/customer/ProviderListing'
import JobsList from './pages/serviceprovider/ListedJobs'
import ApplicationsNotificationPanel from './pages/customer/Applications'
import ApplicationNotifications from './components/providerDashboard/application/Message'

function App() {
  return (
    <Routes>
      {/* BASE */}
      <Route path="/" element={<Base />}>
        <Route index element={<HeroSection/>}/>
        <Route path="auth/:type" element={<AuthForm/>}/>
      </Route>

      {/* CUSTOMER */}
      <Route path='customer-dashboard' element={<CustomerDashboardLayout/>}>
        <Route index element={<CustomerDashboard/>}/>
        
        <Route path='jobpost' element={<JobPostForm/>}/>
        <Route path='manage/:id' element={<ManagePost/>}/>
        <Route path='editpost/:id' element={<JobPostForm/>}/>

        {/* search provider */}
        <Route path='search/:sq' element={<ProviderListing/>}/>

        <Route path='application/:id' element={<ApplicationsNotificationPanel/>}/>


      </Route>

      {/* SERVICE PROVIDER */}

      <Route path='provider-dashboard' element={<ProviderDashboard/>}>
        <Route index element={<Home/>}/>
        <Route path='client-kyc/:id' element={<ClientProfileUpdate/>}/>
        <Route path='service-panel/:id' element = {<ServicesPanel/>}/>

        <Route path='listed-jobs' element={<JobsList/>}/>
        <Route path="application" element={<ApplicationNotifications/>}/>

      </Route>

    </Routes>
  )
}

export default App
