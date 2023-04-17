import { useEffect, useState, useRef } from 'react';
import { FaFire } from "react-icons/fa";
import axios from 'axios';
import Navbar from '../Dashboard/NavBar';
import Sidebar from './SideBar';
import { useNavigate, useLocation } from 'react-router-dom';
import './DoctorDashboard.css'

const DoctorDashboard = () => {
    let id = useLocation();
    // const feedbacks = useRef([]);
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        try {
            axios.post('http://localhost:5000/DoctorFeedbacks').then((data) => {
                // feedbacks.current = [...data.data];
                setFeedbacks([...data.data].reverse())
                // console.log(feedbacks.current)
            })
        }
        catch (error) {
            console.error(error)
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div class="container-fluid bgImage" id="main">
                <div class="row row-offcanvas row-offcanvas-left">
                    <Sidebar member_id={id.state.id} member_name={id.state.name} />

                    <div className="col main pt-5 mt-3">
                        <div className="row mb-3">
                            {/* <div className="col-xl-3 col-sm-6 py-2">
                                <div className="card bg-success text-white h-100">
                                    <div className="card-body bg-success" style={{ backgroundColor: "#57b960" }}>
                                        <div className="rotate">
                                            <p></p>
                                        </div>
                                        <h6 className="text-uppercase">Doctor Dashboard</h6>
                                        <h1 className="display-4">6<span>/10</span></h1>
                                    </div>
                                </div>
                            </div> */}

                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead class="thead-light">
                                        <tr>
                                            <th>USER FEEDBACKS (Anonymous)</th>
                                        </tr>
                                    </thead>


                                    <tbody>
                                        {feedbacks.length > 0 ?
                                            feedbacks.map((fdbck) =>
                                                <tr>
                                                    <td>{fdbck.feedbackMsg}</td>
                                                    <td></td>
                                                </tr>
                                            )
                                            : ""}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard