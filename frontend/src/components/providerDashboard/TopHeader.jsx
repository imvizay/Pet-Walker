import { Bell, UserCircleIcon } from 'lucide-react'
import React from 'react'
import { useUserContext } from '../../contexts/UserContext'
function TopHeader() {
  const {logoutUser} = useUserContext()
  return (
    <div className='headerWrapper'>
        <div className='headerInfo'>
          <h2>Hi,Welcome</h2>
          <p>Here's your business snapshot for today.</p>
        </div>

        <div className='headerActions'>
            <span className='iconButton notification'><Bell/></span>
             <span onClick={ () => logoutUser() } className="logoutButton">Logout</span>
        </div>
    </div>
  )
}

export default TopHeader