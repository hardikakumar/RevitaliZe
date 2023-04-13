import React, { useState,  } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { NavLink } from "react-router-dom";


const Sidebar = ({ member_id, member_name }) => {
    const navigate = useNavigate();

    return (
        <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{ backgroundColor: "#e9ecef" }}>

            <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <li class="nav-item mb-2 mt-3"><a class="nav-link text-secondary"><h5>{member_name}</h5></a></li>
                <li className="nav-item mb-2">
                    <NavLink className="nav-link text-secondary" to={{ pathname: "/doctor-dashboard" }} state={{ id: member_id, name: member_name }} ><i class="fa fa-home font-weight-bold" />
                        <span className="ml-3"> Home </span>
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink className="nav-link text-secondary" to={{ pathname: "/doctor-dashboard/remedies" }} state={{ id: member_id, name: member_name }}><i class="fa fa-square font-weight-bold" />
                        <span className="ml-3"> Remedies </span>
                    </NavLink>
                </li>
            
            </ul>
        </div>
    )
}

export default Sidebar