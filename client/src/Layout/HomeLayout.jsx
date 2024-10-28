import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderHome from '../components/HeaderHome';
import Footer from '../components/Footer';

const HomeLayout = () => {
  return (
    <div>
      <HeaderHome />
      <main>
      <Outlet /> {/* This renders the nested route components */}
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
