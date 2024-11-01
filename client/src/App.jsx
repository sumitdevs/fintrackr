import React,{useContext} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeLayout from './Layout/HomeLayout';
import DashboardLayout from './Layout/DashboardLayout';
import Register from './forms/Register';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Features from './pages/Features';
import Login from './forms/Login'
import Dashboard from './pages/Dashboard/Dashboard';
import Account from './pages/Dashboard/subpages/account';
import ProtectedRoute from './ProtectedRoute';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="features" element={<Features />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route  element={<ProtectedRoute />}>
         <Route path="/dashboard"  element={<DashboardLayout />}>
          <Route index element={<Dashboard/>} />
          <Route path='account' element={<Account/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
