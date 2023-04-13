import React from 'react';
import MainDashboard from './MainDashboard';
import Remedies from '../Remedies/Remedies';
import Navbar from './NavBar';
import Sidebar from './SideBar';
import { useNavigate, useLocation } from 'react-router-dom';

function Dashboard() {
    let id = useLocation();
    console.log("dashboard"+id.state)

    return (
        <div>
            <Navbar />
            <div class="container-fluid" id="main">
                <div class="row row-offcanvas row-offcanvas-left">
                    {/* <Sidebar name={name.state.name} /> */}
                    <Sidebar member_id = {id.state.id} member_name = {id.state.name}/>
                    <MainDashboard member_id = {id.state.id}/>
                
                </div>
            </div>
        </div>
    );
}

export default Dashboard