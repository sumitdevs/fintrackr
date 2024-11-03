import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const HeaderDashboard = () => {
    const [ cookies, _ , removeCookie] = useCookies([]);
    const navigate = useNavigate();
    const handleLogout = () => {
        removeCookie("token", { path: "/" });
        navigate("/");
      };    
  return (
    <header class="flex items-center justify-between pb-4 border-b border-gray-300 mb-8 px-8 py-4">
      <h1 class="text-3xl font-semibold">Welcome to Your Dashboard</h1>
      <button onClick={handleLogout} class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Log Out
      </button>
    </header>
  );
};

export default HeaderDashboard;
