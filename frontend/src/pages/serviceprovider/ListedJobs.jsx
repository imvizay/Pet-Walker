import React, { useEffect, useState } from "react";
import '../../assets/css/service_provider/listed_jobs/listed_jobs.css'

import { getJobsAtProvider  } from "../../api/providerApi/jobs/jobsApi";

import ListedJobCard from "./listed_jobcard/ListedJobCard";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      
      const res = await getJobsAtProvider();
      if(!res.success){
        return alert("failed getting listed jobs")
      }
      setJobs(res.data);
      setLoading(false)
    }

    loadJobs();
  }, []);

  

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div className="jobsGrid">
      {jobs.map(job => (
        <ListedJobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobsList;
