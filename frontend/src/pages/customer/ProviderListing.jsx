import React, { useState, useEffect } from "react";
import '../../assets/css/customer_dashboard/providerlisting.css'
import { useParams , useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { searchQueryJob } from "../../api/customerApi/jobApi";

import { LockIcon } from 'lucide-react'


function ProviderListing() {

  let { sq } = useParams() 
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState([]);
  const [activeServiceFilter,setActiveServiceFilter] = useState(null)

  let { queryResults,handleSq,setQueryResults } = useOutletContext()
  let { user } = useUserContext()

  // Fake loading simulation
  useEffect( () => {  
      console.log("sq",sq)
     if(!sq || !sq.trim()) return 
     setActiveServiceFilter(sq)
     setLoading(true)

     const fetchProvider = async () => {
         let result = await searchQueryJob(sq)
         if(!result.success){
           return console.log("error:",result.error)
         } 

         setQueryResults(result.data || [])  
         setLoading(false) 
     }

     fetchProvider()

  }, [sq] )

  
  // FILTER RESULTS

  const filterResults = async (e) => {
    const el = e.target.closest("span")
    const type = el.dataset.type 
    if(!type) return 
    setActiveServiceFilter(type)
    // fn  
    let res = await searchQueryJob(type)
    if(!res.success) return alert("query failed")

    setQueryResults(res.data)
      
  }


  useEffect(()=>{
    console.log("find care:",queryResults)
  },[])

  return (
    <div className="providerListingGrid">

      {/* FILTER SIDEBAR */}
      <div className="filterOptWrapper">

          <h3 className="filterTitle">Filters</h3>

          {/* SERVICE FILTER */}
          <div className="serviceSect">
            <label className="filterLabel">Service</label>

            <div onClick={(e) => filterResults(e) } className="serviceList">
              {["Walker","Groomer","Sitter","Care"].map(s => (
                <span data-type={s} key={s} className={`servicePill ${activeServiceFilter === s.toLocaleLowerCase() ? "active": ""}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>
          
          {/* LOCATION */}
          <div className="locationSect">
            <label className="filterLabel">City / Pincode</label>
            <input
              className="locationInput"
              type="text"
              placeholder="Bhopal or 462030"
            />
          </div>
          
          <button className="applyBtn">Apply Filters</button>
          
      </div>
          

      {/* RESULT GRID */}
      <div className="providerCardGrid">

        {loading
          ? [...Array(6)].map((_, i) => (
              <div key={i} className="cardSkeleton"></div>
            ))

          : queryResults.map(p => (
              <div key={p.id} className="providerCard">

                {p.has_subscription && <span className="premiumBadge">Featured</span>}

                <div className="avatar"><img  src={`${p.profile_pic}`} alt="" /></div>

                <h4>{p.username}</h4>
                <p className="city">{p.city || "Bhopal"}</p>

                <div className="serviceTags">
                  {p.services.map((s,i)=>
                    <span key={i}>{s}</span>
                  )}
                </div>

               <div className="commercialButtons">
                <button className="viewBtn"> Hire </button>
                <div className="contactButtonDiv"> 

                  <button className={user.has_subscription ? "" : "locked"}>
                  {user.has_subscription ? "": <LockIcon size={12}/>} Contact 
                  </button>

                </div>
               </div>
                 
              </div>
          ))
        }

      </div>

      {/* PAGINATION */}
      <div className="paginationControls">
        <button>{"<"}</button>
        <span>1 / 5</span>
        <button>{">"}</button>
      </div>

    </div>
  );
}

export default ProviderListing;
