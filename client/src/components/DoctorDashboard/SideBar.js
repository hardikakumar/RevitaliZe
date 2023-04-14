import React, { useState, } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { SiOverleaf } from "react-icons/si";


const Sidebar = ({ member_id, member_name }) => {
    const navigate = useNavigate();

    return (
        <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{ backgroundColor: "#3f180a", height: '601px' }}>

            <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <li class="nav-item mb-2 mt-3"><a class="nav-link text-secondary"><h5 style={{ color: '#dba636' }}>{member_name}</h5></a></li>
                <li className="nav-item mb-2">
                    <NavLink className="nav-link text-secondary" to={{ pathname: "/doctor-dashboard" }} state={{ id: member_id, name: member_name }} >
                        <FiHome style={{ color: 'white' }} />
                        <span className="ml-3" style={{ color: 'white' }}> Home </span>
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink className="nav-link text-secondary" to={{ pathname: "/doctor-dashboard/remedies" }} state={{ id: member_id, name: member_name }}>
                        <SiOverleaf style={{ color: 'white' }} />
                        <span className="ml-3" style={{ color: 'white' }}> Remedies </span>
                    </NavLink>
                </li>

            </ul>
        </div>
    )
}

export default Sidebar