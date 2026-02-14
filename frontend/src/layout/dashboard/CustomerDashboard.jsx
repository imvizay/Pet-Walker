import { useState,useEffect } from 'react'
import CustomerDashboardNavbar from '../../components/commmon/CustomerNavbar'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { searchQueryJob } from '../../api/customerApi/jobApi'


function CustomerDashboardLayout() {
  const navigate = useNavigate()
  const [searchQuery,setSearchQuery] = useState("")
  const [queryResults,setQueryResults] = useState([])

  
  const handleSearchQuery = async () => {
    if(!searchQuery.trim()) return;
    navigate(`search/${searchQuery}`)
  }


  return (
   <>
   <header>
    <CustomerDashboardNavbar/>
   </header>
   <main>
    <Outlet context={
      {
        sq:searchQuery,
        setSq:setSearchQuery,
        handleSq:handleSearchQuery,
        
        // find care page data 
        queryResults:queryResults,
        setQueryResults:setQueryResults
      }
    }/>
   </main>

   <footer>
    {/* empty for now */}
   </footer>

   </>
  )
}

export default CustomerDashboardLayout


