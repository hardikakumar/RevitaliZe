import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Sidebar = ({member_id}) => {
    return (
        <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{ backgroundColor: "#e9ecef" }}>
            <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <li class="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h5>Name Here</h5></a></li>
                <li class="nav-item mb-2 "><a class="nav-link text-secondary" href="/dashboard"><i class="fa fa-home font-weight-bold"></i> <span className="ml-3">Home</span></a></li>
                <li class="nav-item mb-2 "><a class="nav-link text-secondary" href="/reports"><i class="fa fa-file font-weight-bold"></i> <span className="ml-3">Reports</span></a></li>
                <li class="nav-item mb-2 "><a class="nav-link text-secondary" href="/remedies"><i class="fa fa-pencil font-weight-bold"></i> <span className="ml-3">Remedies</span></a></li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href="/reminder"><i class="fa fa-circle font-weight-bold"></i> <span className="ml-3">Reminders</span></a></li>
            </ul>
        </div>
    )
}

export default Sidebar