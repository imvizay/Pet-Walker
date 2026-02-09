import React from 'react'

function ActivityCard({label,customer,time}) {
  return (
    <div className='activityCard'>
        <div className='activityLabelRow'>
            <span className='activityDot'></span>
            <h3>{label}</h3>
        </div>
        <p className='activityMeta'>From {customer}-{time}ago</p>
        
    </div>
  )
}

export default ActivityCard