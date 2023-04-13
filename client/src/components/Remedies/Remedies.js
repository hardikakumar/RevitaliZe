import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Dashboard/NavBar';
import Sidebar from '../Dashboard/SideBar';
import { useLocation } from 'react-router-dom';
import './Remedies.css';

const Remedies = () => {
    let id = useLocation();
    // const [record, setRecord] = useState([]);

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
                    <Sidebar member_id={id.state.id} member_name={id.state.name} />

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



                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead class="thead-light">
                                    <tr>
                                        <th>No</th>
                                        <th>Label</th>
                                        <th>Header</th>
                                        <th>Column</th>
                                        <th>Record Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {record.slice(0, 5).map((output) =>
                                        <tr>
                                            <td>{output.id}</td>
                                            <td>{output.name}</td>
                                            <td>{output.email}</td>
                                            <td>{output.username}</td>
                                            <td>{output.website}</td>
                                            <td></td>
                                        </tr>
                                    )} */}
                                </tbody>
                            </table>
                        </div>


                        <button>PCOD</button>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Remedies