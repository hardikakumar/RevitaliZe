import React from 'react';
import MainDashboard from './MainDashboard';
import Navbar from './NavBar';
import Sidebar from './SideBar';
import { useNavigate, useLocation } from "react-router-dom";

function Dashboard() {
    // const name = useLocation();
    // console.log(name.state.name+" dashboard")
    return (
        <div>
            <Navbar />
            <div class="container-fluid" id="main">
                <div class="row row-offcanvas row-offcanvas-left">
                    {/* <Sidebar name={name.state.name} /> */}
                    <Sidebar />
                    <MainDashboard />
                </div>
            </div>
        </div>
    );
}

export default Dashboard