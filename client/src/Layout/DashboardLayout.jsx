import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderDashboard from '../components/HeaderDashboard';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-1'>
      <HeaderDashboard />
      <main className=''>
          <Outlet />
      </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
