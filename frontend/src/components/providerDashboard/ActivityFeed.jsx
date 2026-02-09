import ActivityCard from "./ActivityCard";

const INITIAL_ACTIVITY = [
    {label:'New Booking Request.',customer:"vijay meena",time:2},
    {label:'New Message.',customer:"ayush",time:2}

]

function ActivityFeed(){
  return (
    <div className="activityContainer">
      <h3>Recent Activity</h3>

      <div className="activityWrapper">
        {INITIAL_ACTIVITY.length > 0 ? 
        (INITIAL_ACTIVITY.map((card)=>(
            <>
            <ActivityCard label={card.label} customer={card.customer} time={card.time} />
            </>
        ))):"no recent activity"
        
        }

      </div>

    </div>
  );
}
export default ActivityFeed;
