import { useEffect, useState } from 'react';
import { TextField, MenuItem } from "@mui/material";
import { Form, FormGroup } from 'reactstrap';
import Navbar from '../Dashboard/NavBar';
import Sidebar from './SideBar';
import axios from 'axios';
import './DoctorDashboard.css'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useLocation } from 'react-router-dom';
import './Remedies.css'

const Remedies = () => {
    let id = useLocation();
    const [RemedyName, setRem] = useState();
    const [Description, setDesc] = useState();
    const [Eczema, setEczema] = useState(false);
    const [Hyperthyroidism, setHyper] = useState(false);
    const [Hypothyroidism, setHypo] = useState(false);
    const [PCOD, setPcod] = useState(false);
    const [Type, setRemType] = useState();
    const [Dosha, setRemDosha] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            axios.post('http://localhost:5000/Remedies', { RemedyName, Description, Eczema, Hyperthyroidism, Hypothyroidism, PCOD, Type, Dosha }).then((data) => {
                alert('Credentials successfully posted');
            })
            setRem("");
            setDesc("");
        }
        catch (error) {
            console.error(error)

        }
    };


    return (
        <div>
            <Navbar />
            <div class="container-fluid my-class" id="main">
                <div class="row row-offcanvas row-offcanvas-left">
                    <Sidebar member_id={id.state.id} member_name={id.state.name} />

                    <div className="col main pt-5 mt-3">
                        <div className="row mb-3">
                            <div className="col-xl-3 col-sm-6 py-2">
                                <Form>
                                    <FormGroup row>
                                        <div>
                                            <TextField
                                                fullWidth
                                                id="rem_name"
                                                label="Remedy Name"
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
                                                rows={3}
                                                sx={{ width: 700 }}
                                                label="Remedy Description"
                                                value={Description}
                                                onChange={e => setDesc(e.target.value)}
                                            />
                                        </div>
                                    </FormGroup>


                                    <FormGroup row>
                                        <div className='checkbox-design1'>
                                            <FormControlLabel control={
                                                <Checkbox
                                                    value={Eczema}
                                                    onChange={e => setEczema(e.target.checked)}
                                                />}
                                                label="Eczema"
                                            />

                                            <FormControlLabel control={
                                                <Checkbox
                                                    value={Hyperthyroidism}
                                                    onChange={e => setHyper(e.target.checked)}
                                                />}
                                                label="Hyperthyroidism"
                                            />
                                        </div>

                                        <div className='checkbox-design2'>
                                            <FormControlLabel control={
                                                <Checkbox
                                                    value={Hypothyroidism}
                                                    onChange={e => setHypo(e.target.checked)}
                                                />}
                                                label="Hypothyroidism"
                                            />

                                            <FormControlLabel control={
                                                <Checkbox
                                                    value={PCOD}
                                                    onChange={e => setPcod(e.target.checked)}
                                                />}
                                                label="PCOD"
                                            />
                                        </div>
                                    </FormGroup>

                                    <FormGroup row>
                                        <div>
                                            <TextField
                                                id="outlined-select-type"
                                                select
                                                fullWidth
                                                label="Remedy Type"
                                                value={Type}
                                                onChange={e => setRemType(e.target.value)}
                                            >
                                                <MenuItem key={'f'} value={'f'}>Fruits</MenuItem>
                                                <MenuItem key={'v'} value={'v'}>Vegetables</MenuItem>
                                                <MenuItem key={'g'} value={'g'}>Grains</MenuItem>
                                                <MenuItem key={'l'} value={'l'}>Legumes</MenuItem>
                                                <MenuItem key={'d'} value={'d'}>Dairy</MenuItem>
                                                <MenuItem key={'n'} value={'n'}>Nuts/Seeds</MenuItem>
                                                <MenuItem key={'o'} value={'o'}>Oils</MenuItem>
                                                <MenuItem key={'t'} value={'t'}>Sweeteners</MenuItem>
                                                <MenuItem key={'s'} value={'s'}>Spices</MenuItem>
                                            </TextField>
                                        </div>
                                    </FormGroup>

                                    <FormGroup row>
                                        <div>
                                            <TextField
                                                id="outlined-select-dosha"
                                                select
                                                fullWidth
                                                label="Remedy Dosha"
                                                value={Dosha}
                                                onChange={e => setRemDosha(e.target.value)}
                                            >
                                                <MenuItem key={'v'} value={'v'}>Vata</MenuItem>
                                                <MenuItem key={'p'} value={'p'}>Pitta</MenuItem>
                                                <MenuItem key={'k'} value={'k'}>Kapha</MenuItem>
                                            </TextField>
                                        </div>
                                    </FormGroup>
                                </Form>


                                <button className='btn btn-warning' type='submit' onClick={handleSubmit}>
                                    ADD REMEDY
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