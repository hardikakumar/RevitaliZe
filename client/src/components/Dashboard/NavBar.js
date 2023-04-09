import React from 'react';
import logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Navbar = () => {
    return (
        <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-dark mb-3">
            <div class="flex-row d-flex">
                <button type="button" class="navbar-toggler mr-2 " data-toggle="offcanvas" title="Toggle responsive left sidebar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand" href="/" title="Free Bootstrap 4 Admin Template">RevitaliZe</a>
                {/* <img style={{ height: 60, left: 20 }} src={logo} alt="Logo" /> */}
            </div>
           
            <div class="navbar-collapse collapse" id="collapsingNavbar">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/">Link</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar