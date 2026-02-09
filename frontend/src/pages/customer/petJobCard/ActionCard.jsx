import React from "react";
import {
  X,
  Pencil,
  Eye,
  Trash2
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function ActionCard({ job,removePost }) {

    let navigate = useNavigate(-1)

   async function deletePost(){
       let res = await removePost(job.id)

       if(!res.success){
        return
       }

       navigate(-1)

    }

  return (
    <div className="actionContainer">

      {/* Header */}
      <div className="actionHeader">
        <span className="statusBadge">ACTIVE LISTING</span>
        <button className="closeBtn">
          <X size={18}/>
        </button>
      </div>

      {/* Job Info */}
      <div className="jobInfo">
        <h2>{job?.title || "Golden Retriever Walking"}</h2>

        <div className="jobMeta">
          <span>{job?.category || "Dog Walking"}</span>
          <span className="metaDivider">•</span>
          <span>{job?.date || "Posted recently"}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="managementAction">
        <h5>MANAGEMENT ACTIONS</h5>

        <div className="actionButtons">

          <button className="fareBtn">
            Manage Rate
          </button>

          <button className="editBtn" onClick={()=>navigate(`../editpost/${job.id}/`)}>
            <Pencil size={16}/>
            Edit Listing
          </button>

          <button className="viewBtn">
            <Eye size={16}/>
            View Applications
          </button>

          <button className="deleteBtn" onClick={deletePost}>
            <Trash2 size={16}/>
            Delete Job
          </button>

        </div>
      </div>

    </div>
  );
}

export default ActionCard;
