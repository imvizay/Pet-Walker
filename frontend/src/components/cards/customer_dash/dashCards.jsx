import React from 'react'
import '../../../assets/css/customer_dashboard/customer_dash.css'

const CARD_TYPE = [
    {id:1,name:"Active job posts",length:2},
    {id:2,name:"New Application",length:12}

]
function DashCards() {
  return (
    <>
    <div className='dashCard'>
    {CARD_TYPE.map((el)=>(
     <div className='card'>
        <span className='title'>{el.name}</span>
        <span className={`number ${el.id==2 ? "application":""}`}>{el.length}</span>
     </div>
    ))}
    </div>
    </>
  )
}

export default DashCards