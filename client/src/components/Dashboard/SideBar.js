import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { NavLink } from "react-router-dom";
import Feedback from './Feedback.js';
import { FiHome } from "react-icons/fi";
import { SiOverleaf } from "react-icons/si";
import { TbReportAnalytics } from "react-icons/tb";
import { BsClockHistory } from "react-icons/bs";
import { VscFeedback } from "react-icons/vsc";
import './SideBar.css'

const Sidebar = ({ member_id, member_name }) => {
    const [feedback, showFeedback] = useState(false);
    const navigate = useNavigate();

    return (
        <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{ backgroundColor: "#3f180a" , height: '900px'}}>
            <div>
                <Modal
                    size='md'
                    isOpen={feedback}
                    toggle={() => showFeedback(!feedback)}
                >

                    <ModalHeader>
                        Feedback
                    </ModalHeader>
                    <ModalBody>
                        <Feedback member_id={member_id} member_name={member_name} />
                    </ModalBody>
                </Modal>
            </div>

            <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <li class="nav-item mb-2 mt-3"><a class="nav-link text-secondary"><h5 style={{ color: '#dba636' }}>{member_name}</h5></a></li>
                <li className="nav-item mb-2" >
                    <NavLink className="nav-link text-secondary" to={{ pathname: "/dashboard" }} state={{ id: member_id, name: member_name }} >
                        <FiHome style={{ color: "white" }} />
                        <span className="ml-3" style={{ color: "white" }}> Home </span>
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink className="nav-link text-secondary" to={{ pathname: "/reports" }} state={{ id: member_id, name: member_name }}>
                        <TbReportAnalytics style={{ color: "white" }} />
                        <span className="ml-3" style={{ color: "white" }}> Reports </span>
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink className="nav-link text-secondary" to={{ pathname: "/remedies" }} state={{ id: member_id, name: member_name }}>
                        <SiOverleaf style={{ color: "white" }} />
                        <span className="ml-3" style={{ color: "white" }}> Remedies </span>
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink className="nav-link text-secondary" to={{ pathname: "/reminder" }} state={{ id: member_id, name: member_name }}>
                        <BsClockHistory style={{ color: "white" }} />
                        <span className="ml-3" style={{ color: "white" }}> Reminders </span>
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <a className="nav-link text-secondary" onClick={() => showFeedback(true)}>
                        <VscFeedback style={{ color: "white" }} />
                        <span className="ml-3" style={{ color: "white" }}> Feedback </span>
                    </a>
                </li>
                <li>
                    <div>
                        <br />
                        <button className='btn btn-success btn-md' type='submit' onClick={e => { navigate('/questionnaire', { state: { id: member_id, name: member_name } }) }}>
                            Take Test Again
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar