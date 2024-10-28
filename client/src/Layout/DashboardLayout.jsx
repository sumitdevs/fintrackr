import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderDashboard from '../components/HeaderDashboard';
import Footer from '../components/Footer';

const DashboardLayout = () => {
  return (
    <div>
      <HeaderDashboard />
      <main>
      <Outlet /> {/* This renders the nested route components */}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
