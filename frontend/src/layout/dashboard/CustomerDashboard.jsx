import { useState,useEffect } from 'react'
import CustomerDashboardNavbar from '../../components/commmon/CustomerNavbar'
import { Outlet } from 'react-router-dom'

import { searchQueryJob } from '../../api/customerApi/jobApi'
import { useDebounce } from '../../utilis/customer_search/useDebounce'

function CustomerDashboardLayout() {

  const [searchQuery,setSearchQuery] = useState("")
  const [queryResults,setQueryResults] = useState([])
  const debounceQuery = useDebounce(searchQuery,2000)


  useEffect( () => {

    if(!debounceQuery.trim()) return
   

  },[debounceQuery])
  // Handle Search Query
 
  const handleSearchQuery = async () => {

    console.log("dbQuery",debounceQuery)


    let result = await searchQueryJob(debounceQuery)
    if(!result.success){
      return alert("invalid search")
    } 
    console.log(result.data)
    setQueryResults(result.data || [])  
    return 
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
        debounceQuery:debounceQuery,
        
        // find care page data 
        queryResults:queryResults,
        setQueryResults:setQueryResults
      }
    }/>
   </main>

   <footer>
    
   </footer>

   </>
  )
}

export default CustomerDashboardLayout


