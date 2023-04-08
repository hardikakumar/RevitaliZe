import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Sidebar = () => {
    return (
        <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{ backgroundColor: "#e9ecef" }}>
            <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <li class="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h5>Name Here</h5></a></li>
                <li class="nav-item mb-2 "><a class="nav-link text-secondary" href="/"><i class="fa fa-home font-weight-bold"></i> <span className="ml-3">Home</span></a></li>
                <li class="nav-item mb-2">
                    <a class="nav-link text-secondary" href="#submenu1" data-toggle="collapse" data-target="#submenu1"><i class="fa fa-file font-weight-bold"></i> <span className="ml-3"> Reports</span></a>
                    <ul class="list-unstyled flex-column pl-3 collapse" id="submenu1" aria-expanded="false">
                        <li class="nav-item mb-2 "><a class="nav-link text-secondary" href=""><i class="fas fa-book-reader"></i> Data Report </a></li>
                        <li class="nav-item mb-2 "><a class="nav-link text-secondary" href=""> <i class="fas fa-book-medical"></i> File Report </a></li>
                    </ul>
                </li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href="/reminder"><i class="fa fa-clock font-weight-bold"></i> <span className="ml-3">Reminders</span></a></li>
            </ul>
        </div>
    )
}

export default Sidebar