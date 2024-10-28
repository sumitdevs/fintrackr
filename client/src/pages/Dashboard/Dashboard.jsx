import React from 'react';
import { Outlet } from 'react-router-dom';

const Dashboard = ()=>{
    return(
        <div>
            <p>Hello from dashboard</p>
            <Outlet />
        </div>
    )
}

export default Dashboard;