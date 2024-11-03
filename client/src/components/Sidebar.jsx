import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div class="w-64 lg:hidden bg-black text-white p-4 lflex flex-col">
      <h2 class="text-2xl font-bold mb-8">Dashboard</h2>
      <nav class="flex flex-col space-y-4">
        <Link to="/dashboard" class="hover:bg-gray-700 focus:bg-gray-700 p-2 rounded">
          Overview
        </Link>
        <Link to="/dashboard/settings" class="hover:bg-gray-700 p-2 rounded">
          Settings
        </Link>
        <Link to="/dashboard/account" class="hover:bg-gray-700 p-2 rounded">
          Account
        </Link>
        <Link to="/dashboard/reports" class="hover:bg-gray-700 p-2 rounded">
          Reports
        </Link>
        <Link to="#" class="hover:bg-gray-700 p-2 rounded">
          Support
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
