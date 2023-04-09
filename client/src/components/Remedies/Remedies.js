import { useEffect, useState } from 'react';
import './Remedies.css';
import { FaFire } from "react-icons/fa";
import axios from 'axios';
import Navbar from '../Dashboard/NavBar';
import Sidebar from '../Dashboard/SideBar';
import MainDashboard from '../Dashboard/MainDashboard';

const Remedies = () => {

    // try {
    //     axios.post('http://localhost:5000/Remedies').then((data) => {

    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }
    // catch (error) {
    //     console.error(error);
    // }


    return (
        <div>
            <Navbar />
            <div class="container-fluid" id="main">
                <div class="row row-offcanvas row-offcanvas-left">
                    <Sidebar />

                    <div className="col main pt-5 mt-3">
                        <div className="row mb-3">
                            <div className="col-xl-3 col-sm-6 py-2">
                                <div className="card bg-success text-white h-100">
                                    <div className="card-body bg-success" style={{ backgroundColor: "#57b960" }}>
                                        <div className="rotate">
                                            <p></p>
                                        </div>
                                        <h6 className="text-uppercase">HyperThyriodism</h6>
                                        <h1 className="display-4">6<span>/10</span></h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button>PCOD</button>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Remedies