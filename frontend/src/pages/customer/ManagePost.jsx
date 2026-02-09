import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { getJobById , removeJobById} from "../../api/customerApi/jobApi";
import JobCard from "./petJobCard/JobCard";
import ActionCard from "./petJobCard/ActionCard";



import '../../assets/css/customer_dashboard/managepost.css'

export default function ManagePost() {
  const [job, setJob] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchJobs = async () => {
      const results = await getJobById(id);
      if (!results.success) return;
      setJob(results.data);
    };

    fetchJobs();
  }, [id]);

  if (!job) return <div className="loading">Loading...</div>


  

  return (
    <section className="managePostContainer">

      <div className="manageHeading">
        <h1>Job Management</h1>
        <p>Control your listing, applicants, and pricing</p>
      </div>

      <div className="manageBody">

        <div className="postDetails">
          <JobCard job={job}/>
        </div>

        <div className="postActions">
          <ActionCard job={job} removePost={removeJobById}/>
        </div>

      </div>
    </section>
  );
}
