import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Sidebar = () => {
    return (
        <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{ backgroundColor: "#e9ecef" }}>
            <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <li class="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h5>Name Here</h5></a></li>
                <li class="nav-item mb-2 "><a class="nav-link text-secondary" href="/doctor-dashboard"><i class="fa fa-home font-weight-bold"></i> <span className="ml-3">Home</span></a></li>
                <li class="nav-item mb-2 "><a class="nav-link text-secondary" href="/doctor-dashboard/remedies"><i class="fa fa-pencil font-weight-bold"></i> <span className="ml-3">Remedies</span></a></li>
            </ul>
        </div>
    )
}

export default Sidebar