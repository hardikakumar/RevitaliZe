import { useEffect, useState } from 'react';
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
    const [E, EczemaSelected] = useState(false);
    const [P, PCODSelected] = useState(false);
    const [R, HyperSelected] = useState(false);
    const [H, HypoSelected] = useState(false);

    console.log('here')
    console.log('E' + E);
    console.log('P' + P);
    console.log("Hr" + R);
    console.log('Ho' + H);

    try {

        axios.post('http://localhost:5000/remedy', { member_id, E, P, R, H }).then((data) => {

        }).catch(err => {
            console.log(err);
        })
    }
    catch (error) {
        console.error(error);

    }

    const handleModalToggle = () => {
        showRemedy(!remedyModal);
        EczemaSelected(false);
        PCODSelected(false);
        HyperSelected(false);
        HypoSelected(false);
    }


    return (
        <div>

            <div>
                <Modal
                    size='md'
                    isOpen={remedyModal}
                    toggle={() => {handleModalToggle()}}
                >

                    <ModalHeader>
                        Remedies
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            
                        </div>

                        {/* <Feedback member_id={member_id} member_name={member_name} /> */}
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
                                        <h6 className="text-uppercase" style={{fontSize: '72', fontWeight: 'bold' }}>HyperThyroidism</h6>
                                        <a class="stretched-link" onClick={() => { HyperSelected(true); showRemedy(true) }} />
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
                                        <a class="stretched-link" onClick={() => { showRemedy(true); HypoSelected(true) }} />
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
                                        <a class="stretched-link" onClick={() => { showRemedy(true); EczemaSelected(true) }} />
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
                                        {/* <h1 className="display-4">6<span>/10</span></h1> */}
                                        <a class="stretched-link" onClick={() => { showRemedy(true); PCODSelected(true) }} />
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
                                        <a class="stretched-link" onClick={() => showRemedy(true)} />
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