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
import Account from './pages/Dashboard/subpages/Account';
import ProtectedRoute from './ProtectedRoute';
import Setting from './pages/Dashboard/subpages/Setting';
import Report from './pages/Dashboard/subpages/report';
import Transaction from './pages/Dashboard/subpages/Transaction';
import Budget from './pages/Dashboard/subpages/Budget';
import CreditCard from './pages/Dashboard/subpages/CreditCard';
import Debt from './pages/Dashboard/subpages/Debt';
import Category from './pages/Dashboard/subpages/Category';
import Calender from './pages/Dashboard/subpages/Calender';
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
          <Route path='settings' element={<Setting/>} />
          <Route path='reports' element={<Report/>} />
          <Route path='transaction' element={<Transaction/>} />
          <Route path='budget' element={<Budget/>} />
          <Route path='credit-cards' element={<CreditCard/>} />
          <Route path='debts' element={<Debt/>} />
          <Route path='category' element={<Category/>} />
          <Route path='calender' element={<Calender/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
