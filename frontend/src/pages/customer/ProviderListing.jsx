import React, { useState, useEffect } from "react";
import '../../assets/css/customer_dashboard/providerlisting.css'
import { useParams , useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

import { searchQueryJob } from "../../api/customerApi/jobApi";

const BASE = "http://localhost:8000";
function ProviderListing() {

  let { sq } = useParams() 
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState([]);
  let { queryResults,handleSq,setQueryResults } = useOutletContext()

  // Fake loading simulation
  useEffect( () => {

     if(!sq.trim()) return 

     setLoading(true)

     const fetchProvider = async () => {
         let result = await searchQueryJob(sq)
         if(!result.success){
           return navigate("/")
         } 

         setQueryResults(result.data || [])  
         setLoading(false) 
     }

     fetchProvider()

  }, [sq] )


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

            <div className="serviceList">
              {["Walker","Groomer","Sitter","Care"].map(s => (
                <span key={s} className="servicePill">
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
                <p className="city">{p.city || "bhopal"}</p>

                <div className="serviceTags">
                  {p.services.map((s,i)=>
                    <span key={i}>{s}</span>
                  )}
                </div>

                <button className="viewBtn">
                  Hire
                </button>
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
