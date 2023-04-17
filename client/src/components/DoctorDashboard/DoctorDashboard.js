import { useEffect, useState } from 'react';
import { FaFire } from "react-icons/fa";
import axios from 'axios';
import Navbar from '../Dashboard/NavBar';
import Sidebar from './SideBar';
import { useNavigate, useLocation } from 'react-router-dom';
import './DoctorDashboard.css'

const DoctorDashboard = () => {
    let id = useLocation();

    try {
        axios.post('http://localhost:5000/DoctorFeedbacks').then((data) => 
        {
            console.log(data.data)
        })
    }
    catch (error) 
    {
       console.error(error)
    }

    return (
        <div>
            <Navbar />
            <div class="container-fluid bgImage" id="main">
                <div class="row row-offcanvas row-offcanvas-left">
                    <Sidebar member_id = {id.state.id} member_name = {id.state.name}/>

                    <div className="col main pt-5 mt-3">
                        <div className="row mb-3">
                            <div className="col-xl-3 col-sm-6 py-2">
                                <div className="card bg-success text-white h-100">
                                    <div className="card-body bg-success" style={{ backgroundColor: "#57b960" }}>
                                        <div className="rotate">
                                            <p></p>
                                        </div>
                                        <h6 className="text-uppercase">Doctor Dashboard</h6>
                                        <h1 className="display-4">6<span>/10</span></h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard