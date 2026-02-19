
import '../../assets/css/customer_dashboard/customer_dash.css'
import { useState ,useEffect} from 'react'

import { useOutletContext , Link} from 'react-router-dom'

import { ListFilterIcon, Plus, Search } from 'lucide-react'
import JobListedCard from '../../components/cards/customer_dash/JobListedCard'
import { getJobs } from '../../api/customerApi/jobApi'


function CustomerDashboard() {

  let   {sq,setSq,handleSq } = useOutletContext() // query state , query setter , search query fn
  const [user,setUser] = useState({})
  const [jobs,setJobs] = useState([])
  const [errors,setErrors] = useState(null)


  
  // GET JOBS FROM BACKEND
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(!user){
      setUser({})
    }
    
    setUser(user)

    const fetchJobs = async () => {
          const results = await getJobs()

          if(!results.success){
            setErrors(results.error);
            return;
          }
          setJobs(results.data)
    }
    fetchJobs()

  },[])

  
  
  return (
    <>
    
    <div className='customerIndexPageContainer'>

      <div className='customerIndexHead'>
        <h1>WELCOME BACK - <span className='userSpan'>{user?.username?.toUpperCase()}</span></h1>

        <div className='searchBox'>
          <span className='searchIcon'><Search/></span>
          <input className='searchInput' onChange={(e)=>setSq(e.target.value)} value={sq} type="search" placeholder='Find petwalker , sitter , grommer near your neighbourhood ...'  />
          <span className='searchBtn' onClick={handleSq} > <ListFilterIcon/> FIND CARE </span>
        </div>
      </div>


      <div className='customerIndexLeg'>

        <div className='myJobPost'>
          <JobListedCard jobs={jobs}/>
        </div>

        <div className='platformServices'>

          <div className='createJobPost'>
            <h2>Create Job Post</h2>
            <p>post a new job and find a perfect care provider in minutes.</p>
            <div>
             <span><Plus/></span><Link to="jobpost"> Post a new job</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default CustomerDashboard
