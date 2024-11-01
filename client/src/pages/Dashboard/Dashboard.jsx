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

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    navigate("/");
  };

  return (
    <div>
      <p>Hello from dashboard</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
