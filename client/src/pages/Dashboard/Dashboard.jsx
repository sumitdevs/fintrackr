import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [ cookies, _ , removeCookie] = useCookies([]);
  console.log(cookies);
  useEffect(() => {
    const verifyCookie = async () => {
    //   try {
        const { data } = await axios.post(
          "http://localhost:5000",
          {},
          { withCredentials: true }
        )
        console.log(data);
    //     const { status, user } = data;
    //     if (status) {
    //         setUserName(user);
    //       } else {
    //         removeCookie("token");
    //         navigate("/login");
    //       }
    //   } catch (error) {
    //     console.error("Error fetching user data:", error);
    //     removeCookie("token");
    //     navigate("/login");
    //   }
    };
    verifyCookie();
  }, [ cookies, removeCookie]);

 
  return (
    <div>  
  {/* <!-- Dashboard Content --> */}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
    <div class="bg-white p-6 rounded shadow">
      <h2 class="text-xl font-semibold">Overview</h2>
      <p class="mt-2 text-gray-600">Some quick overview stats go here.</p>
    </div>
    
    <div class="bg-white p-6 rounded shadow">
      <h2 class="text-xl font-semibold">Recent Activity</h2>
      <p class="mt-2 text-gray-600">Recent updates and activity log.</p>
    </div>
    
    <div class="bg-white p-6 rounded shadow">
      <h2 class="text-xl font-semibold">Reports</h2>
      <p class="mt-2 text-gray-600">Detailed reports and analytics.</p>
    </div>
    
    <div class="bg-white p-6 rounded shadow">
      <h2 class="text-xl font-semibold">Settings</h2>
      <p class="mt-2 text-gray-600">Manage account and preferences.</p>
    </div>
    
    <div class="bg-white p-6 rounded shadow">
      <h2 class="text-xl font-semibold">Messages</h2>
      <p class="mt-2 text-gray-600">View and manage messages.</p>
    </div>
    
    <div class="bg-white p-6 rounded shadow">
      <h2 class="text-xl font-semibold">Support</h2>
      <p class="mt-2 text-gray-600">Contact support and FAQs.</p>
    </div>
  </div>
</div>
  );
};

export default Dashboard;
