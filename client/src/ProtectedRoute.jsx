import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from "react-cookie";

function ProtectedRoute() {
  const [cookies,_ ,__] = useCookies([]);
  return true ? <Outlet />:<Navigate to="/login" />;
}

export default ProtectedRoute;
