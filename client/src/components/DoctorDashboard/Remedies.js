import { useEffect, useState } from 'react';
import { TextField, MenuItem } from "@mui/material";
import { Form, FormGroup } from 'reactstrap';
import Navbar from '../Dashboard/NavBar';
import Sidebar from './SideBar';
import axios from 'axios';
import './DoctorDashboard.css'

const Remedies = () => {
    const [rem, setRem] = useState();
    const [desc, setDesc] = useState();
    const [eczema, setEczema] = useState();
    const [hyper, setHyper] = useState();
    const [hypo, setHypo] = useState();
    const [pcod, setPcod] = useState();

    console.log(rem)
    console.log(desc)
    console.log(eczema)
    console.log(hyper)

    const handleSubmit = async (event) => {
        event.preventDefault();
        // try {
        //     if (isValidName(name) && isValidAge(age) && isValidEmail(email) && isValidPassword(password) && isValidPhone(phone)) {
        //         const response = await axios.post('http://localhost:5000/users', { name, age, gender, email,phone, password });
        //         navigate('/questionnaire');
        //     }
        //     else alert('Please enter correct details');
        // }
        // catch (error) {
        //     console.error(error);
        //     console.log(error);
        //     if (error.response.status == 403) {
        //         alert(error.response.data.message);
        //     }
        //     else {
        //         alert('Signup failed');
        //     }
        // }
    };



    return (
        <div>
            <Navbar />
            <div class="container-fluid" id="main">
                <div class="row row-offcanvas row-offcanvas-left">
                    <Sidebar />

                    <div className="col main pt-5 mt-3">
                        <div className="row mb-3">
                            <div className="col-xl-3 col-sm-6 py-2">
                                <Form>
                                    <FormGroup row>
                                        <div>
                                            <TextField
                                                fullWidth
                                                label="Remedy"
                                                sx={{ width: 700 }}
                                                value={rem}
                                                onChange={e => setRem(e.target.value)}
                                            />
                                        </div>
                                    </FormGroup>

                                    <FormGroup row>
                                        <div>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={2}
                                                sx={{ width: 700 }}
                                                label="Description"
                                                value={desc}
                                                onChange={e => setDesc(e.target.value)}
                                            />
                                        </div>
                                    </FormGroup>

                                    <FormGroup row>
                                        <div>
                                            <TextField
                                                id="outlined-select-disease1"
                                                select
                                                fullWidth
                                                label="Eczema"
                                                value={eczema}
                                                onChange={e => setEczema(e.target.value)}
                                            >
                                                <MenuItem key={'T'} value={true}>True</MenuItem>
                                                <MenuItem key={'F'} value={false}>False</MenuItem>
                                            </TextField>
                                        </div>
                                    </FormGroup>

                                    <FormGroup row>
                                        <div>
                                            <TextField
                                                id="outlined-select-disease2"
                                                select
                                                fullWidth
                                                label="Hyperthyroidism"
                                                value={hyper}
                                                onChange={e => setHyper(e.target.value)}
                                            >
                                                <MenuItem key={'T'} value={true}>True</MenuItem>
                                                <MenuItem key={'F'} value={false}>False</MenuItem>
                                            </TextField>
                                        </div>
                                    </FormGroup>

                                    <FormGroup row>
                                        <div>
                                            <TextField
                                                id="outlined-select-disease3"
                                                select
                                                fullWidth
                                                label="Hypothyroidism"
                                                value={hypo}
                                                onChange={e => setHypo(e.target.value)}
                                            >
                                                <MenuItem key={'T'} value={true}>True</MenuItem>
                                                <MenuItem key={'F'} value={false}>False</MenuItem>
                                            </TextField>
                                        </div>
                                    </FormGroup>

                                    <FormGroup row>
                                        <div>
                                            <TextField
                                                id="outlined-select-disease4"
                                                select
                                                fullWidth
                                                label="PCOD"
                                                value={pcod}
                                                onChange={e => setPcod(e.target.value)}
                                            >
                                                <MenuItem key={'T'} value={true}>True</MenuItem>
                                                <MenuItem key={'F'} value={false}>False</MenuItem>
                                            </TextField>
                                        </div>
                                    </FormGroup>
                                </Form>


                                <button className='btn btn-warning' type='submit' onClick={handleSubmit}>
                                    SUBMIT
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Remedies