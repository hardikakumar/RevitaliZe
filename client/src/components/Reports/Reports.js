import React, { Component } from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Dashboard/NavBar';
import Sidebar from '../Dashboard/SideBar';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';

import { useNavigate } from "react-router-dom";
import './Reports.css';

function Reports() {
    let id = useLocation();
    const member_id = id.state.id;
    const [record, setRecord] = useState([]);

    useEffect(() => {
        try {
            axios.post('http://localhost:5000/DoshaReports', { member_id }).then((data) => {
                setRecord([...data.data].reverse())
            }).catch(err => {
                console.log(err);
            })
        }
        catch (error) {
            console.error(error);
        }
    }, []);

    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <div class="container-fluid" id="main">
                <div class="row row-offcanvas row-offcanvas-left">
                    <Sidebar member_id={member_id} member_name={id.state.name} />

                    <div className="col main pt-5 mt-3">
                        <div className='row mb-3'>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead class="thead-light">
                                        <tr>
                                            <th>DATE</th>
                                            <th>VATA</th>
                                            <th>PITTA</th>
                                            <th>KAPHA</th>
                                        </tr>
                                    </thead>

                                    
                                    <tbody>
                                        {record.slice(0, 5).map((output) =>
                                            <tr>
                                                <td>{output.date.split(' ')[0]}, {output.date.split(' ').slice(1, 4).join(' ')}</td>
                                                <td>{output.vatta}</td>
                                                <td>{output.pitta}</td>
                                                <td>{output.kapha}</td>
                                                <td></td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>
                        </div>

                        For full report <button className='btn btn-success' onClick={() => {let newWin = window.open('/downloadReport', '_blank'); newWin.record=record}}>Download PDF here</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reports
