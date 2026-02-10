import Sidebar from '../../components/providerDashboard/Sidebar';

import '../../assets/css/service_provider/providerdashboard.css'
import { Outlet } from 'react-router-dom';

function ProviderDashboard() {
   



  return (
    <div className="dashboardLayout">

      <Sidebar />

      <div className="dashboardMain">

        <Outlet/>

      </div>

    </div>
  );
}

export default ProviderDashboard;


