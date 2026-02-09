import Sidebar from '../../components/providerDashboard/Sidebar';
import ProfileCard from '../../components/providerDashboard/ProfileCard';
import ServiceList from '../../components/providerDashboard/ServiceList';
import ServiceItem from '../../components/providerDashboard/ServiceItem';
import SubscriptionProviderCard from '../../components/providerDashboard/SubscriptionCard';
import ActivityFeed from '../../components/providerDashboard/ActivityFeed';
import StatCard from '../../components/providerDashboard/StatCard';
import TopHeader from '../../components/providerDashboard/TopHeader';

import '../../assets/css/service_provider/providerdashboard.css'
import { useEffect,useState } from 'react';
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


