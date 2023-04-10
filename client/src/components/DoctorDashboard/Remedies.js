import { useEffect, useState } from 'react';
import { TextField, MenuItem } from "@mui/material";
import { Form, FormGroup } from 'reactstrap';
import Navbar from '../Dashboard/NavBar';
import Sidebar from './SideBar';
import axios from 'axios';
import './DoctorDashboard.css'

const Remedies = () => {
    const [RemedyName, setRem] = useState();
    const [Description, setDesc] = useState();
    //const [Type, setType] = useState();
    const [Eczema, setEczema] = useState();
    const [Hyperthyroidism, setHyper] = useState();
    const [Hypothyroidism, setHypo] = useState();
    const [PCOD, setPcod] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            axios.post('http://localhost:5000/Remedies', {RemedyName, Description, Eczema, Hyperthyroidism, Hypothyroidism, PCOD}).then((data) => {
                 alert('Credentials successfully posted');
            })
        }
        catch(error){
            console.error(error)
    
        }
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
                                                value={RemedyName}
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
                                                value={Description}
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
                                                value={Eczema}
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
                                                value={Hyperthyroidism}
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
                                                value={Hypothyroidism}
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
                                                value={PCOD}
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