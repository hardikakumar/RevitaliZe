import React from 'react';
import { FaLeaf } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate=useNavigate();

    return (
        <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-dark mb-3">
            <div class="flex-row d-flex">
                <button type="button" class="navbar-toggler mr-2 " data-toggle="offcanvas" title="Toggle responsive left sidebar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand" title="Free Bootstrap 4 Admin Template" style={{marginLeft: '20px'}}>RevitaliZe <FaLeaf style={{color: 'green'}}/></a>
            </div>
           
            <button className='btn btn-light btn-md' style={{position: 'relative', left: '1000px'}} onClick={() => navigate('/')}>Logout</button>
        </nav>
    )
}
export default Navbar