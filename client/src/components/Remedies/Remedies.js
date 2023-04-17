import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Navbar from '../Dashboard/NavBar';
import Sidebar from '../Dashboard/SideBar';
import { useLocation } from 'react-router-dom';
import './Remedies.css';

const Remedies = () => {
    let id = useLocation();
    const member_id = id.state.id;
    const [remedyModal, showRemedy] = useState(false);
    const showE = useRef(false);
    const showP = useRef(false);
    const showR = useRef(false);
    const showH = useRef(false);
    const showN = useRef(false);
    const remedies = useRef([]);
    const remedyName = useRef([]);

    const getRemedies = async (event) => {
        try {
            const E = showE.current;
            const P = showP.current;
            const R = showR.current;
            const H = showH.current;
            const N = showN.current;
            axios.post('http://localhost:5000/remedy', { member_id, E, P, R, H, N }).then((data) => {
                remedies.current = data.data;
                remedyName.current = [...Object.keys(data.data)];
                console.log(remedyName.current[0])
                let x = remedyName.current[0];
                console.log(remedies.current[x])
            }).catch(err => {
                console.log(err);
            })
        }
        catch (error) {
            console.error(error);
        }
    };

    const handleModalToggle = () => {
        showRemedy(!remedyModal);
        showE.current = false
        showP.current = false
        showR.current = false
        showH.current = false
        showN.current = false
    }

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    const showModal = async () => {
        await delay(3000);
        showRemedy(true);
    }

    return (
        <div>
            <div style={{ Height: '500px', overflowY: 'auto' }}>

                <Modal
                    size='md'
                    isOpen={remedyModal}
                    toggle={() => { handleModalToggle() }}
                >

                    <ModalHeader>
                        Remedies
                        <button className='btn btn-success pull-right' style={{ marginLeft: '190px' }}
                            onClick={() => {
                                let newWin = window.open('/completeRemedies', '_blank');
                                newWin.member_id = member_id;
                                newWin.remedies = remedies.current;
                                newWin.remedyName = remedyName.current;
                            }}>
                            Get complete Report
                        </button>
                    </ModalHeader>
                    <ModalBody style={{ height: '450px', overflowY: 'auto', textAlign: 'justify' }}>
                        <div style={{ fontStyle: 'italic' }}> It is recommended for you to consume </div>
                        <br />
                        {
                            remedies.current != null ?
                                remedyName.current.map((rem) => (
                                    <div >
                                        <div style={{ fontWeight: 'bold' }}> {rem} </div>
                                        <div> {remedies.current[rem]} </div>
                                        <br />
                                    </div>
                                ))
                                : "no data"
                        }
                    </ModalBody>
                </Modal>

            </div>

            <Navbar />
            <div class="container-fluid" id="main" style={{ alignContent: 'center' }}>
                <br />
                <div class="row row-offcanvas row-offcanvas-left">
                    <Sidebar member_id={id.state.id} member_name={id.state.name} />

                    <div className="col main pt-5 mt-3">
                        <div className="row mb-3 justify-content-center">
                            <div className="col-xl-3 col-sm-6 py-2">
                                <div className="card bg-success text-white h-100">
                                    <div className="card-body bg-success" style={{ height: '200px', width: '200px', backgroundColor: "#57b960", textAlign: 'center', borderRadius: '50px' }}>
                                        <div className="rotate">
                                            <p></p>
                                        </div>
                                        <h6 className="text-uppercase" style={{ verticalAlign: 'middle', fontSize: '72', fontWeight: 'bold' }}>HyperThyroidism</h6>
                                        <a class="stretched-link" onClick={() => {
                                            showR.current = true;
                                            getRemedies();
                                            showModal();
                                        }} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 py-2">
                                <div className="card bg-success text-white h-100">
                                    <div className="card-body bg-success" style={{ height: '200px', width: '200px', backgroundColor: "#57b960", textAlign: 'center', borderRadius: '50px' }}>
                                        <div className="rotate">
                                            <p></p>
                                        </div>
                                        <h6 className="text-uppercase" style={{ fontSize: '72', fontWeight: 'bold' }}>HypoThyroidism </h6>
                                        <a class="stretched-link" onClick={() => {
                                            showH.current = true;
                                            getRemedies();
                                            showModal();
                                        }} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 py-2">
                                <div className="card bg-success text-white h-100">
                                    <div className="card-body bg-success" style={{ height: '200px', width: '200px', backgroundColor: "#57b960", textAlign: 'center', borderRadius: '50px' }}>
                                        <div className="rotate">
                                            <p></p>
                                        </div>
                                        <h6 className="text-uppercase" style={{ fontSize: '72', fontWeight: 'bold' }}>Eczema </h6>
                                        <a class="stretched-link" onClick={() => {
                                            showE.current = true;
                                            getRemedies();
                                            showModal();
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3 justify-content-center">
                            <div className="col-xl-3 col-sm-6 py-2">
                                <div className="card bg-success text-white h-100">
                                    <div className="card-body bg-success" style={{ height: '200px', width: '200px', backgroundColor: "#57b960", textAlign: 'center', borderRadius: '50px' }}>
                                        <div className="rotate">
                                            <p></p>
                                        </div>
                                        <h6 className="text-uppercase" style={{ fontSize: '72', fontWeight: 'bold' }}>PCOD</h6>
                                        <a class="stretched-link" onClick={() => {
                                            showP.current = true;
                                            getRemedies();
                                            showModal();
                                        }} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 py-2">
                                <div className="card bg-success text-white h-100">
                                    <div className="card-body bg-success" style={{ height: '200px', width: '200px', backgroundColor: "#57b960", textAlign: 'center', borderRadius: '50px' }}>
                                        <div className="rotate">
                                            <p></p>
                                        </div>
                                        <h6 className="text-uppercase" style={{ fontSize: '72', fontWeight: 'bold' }}>No medical condition </h6>
                                        <a class="stretched-link" onClick={() => {
                                            showN.current = true;
                                            getRemedies();
                                            showModal();
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Remedies