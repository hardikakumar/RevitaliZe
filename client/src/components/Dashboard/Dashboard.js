import React from 'react';
import MainDashboard from './MainDashboard';
import Remedies from '../Remedies/Remedies';
import Navbar from './NavBar';
import Sidebar from './SideBar';
import { useNavigate, useLocation } from 'react-router-dom';

function Dashboard() {
    const id = useLocation();
    console.log(id.state.member_id);
    return (
        <div>
            <Navbar />
            <div class="container-fluid" id="main">
                <div class="row row-offcanvas row-offcanvas-left">
                    {/* <Sidebar name={name.state.name} /> */}
                    <Sidebar member_id = {id.state.member_id}/>
                    <MainDashboard mem_id = {id.state.member_id}/>
                
                </div>
            </div>
        </div>
    );
}

export default Dashboard