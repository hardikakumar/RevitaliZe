import React from 'react';
import MainDashboard from './MainDashboard';
import Navbar from './NavBar';
import Sidebar from './SideBar';

function Dashboard() {
    return (
        <div>
            <Navbar />
            <div class="container-fluid" id="main">
                <div class="row row-offcanvas row-offcanvas-left">
                    <Sidebar />
                    <MainDashboard />
                </div>
            </div>
        </div>
    );
}

export default Dashboard