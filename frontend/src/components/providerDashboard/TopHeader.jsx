import { Bell, UserCircleIcon } from 'lucide-react'
import React from 'react'

function TopHeader() {
  return (
    <div className='headerWrapper'>
        <div className='headerInfo'>
          <h2>Good morning,Alex!</h2>
          <p>Here's your business snapshot for today.</p>
        </div>

        <div className='headerActions'>
            <span className='iconButton notification'><Bell/></span>
            <span className='iconButton'><UserCircleIcon/></span>
        </div>
    </div>
  )
}

export default TopHeader