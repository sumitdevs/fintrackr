import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderDashboard from '../components/HeaderDashboard';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='w-full p-8'>
      <HeaderDashboard />
      <main>
      <Outlet />
      </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
