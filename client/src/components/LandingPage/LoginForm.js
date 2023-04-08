import React, { useState } from 'react';
import { Form, Col, FormGroup } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { TextField, FormControl, IconButton, InputAdornment, OutlinedInput, InputLabel, MenuItem } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    };

    const isValidEmail = (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        // const formData = {email, password}

        try
        {
            const response = await axios.post('http://localhost:5000/userLogin', {email, password});
            console.log(response);
            const name = response.data.name;
            const id = response.data._id;
            console.log(id);
            alert('Login successfull');
            navigate('/questionnaire',{state : {id:id}});
        }
        catch (error) {
            console.error(error);
            alert('Login failed');

        }
    };
    return (
        <div>
            <Form>
                <FormGroup row>
                    <Col>
                        <div>
                            <TextField
                                id="outlined-error-helper-text"
                                required
                                fullWidth
                                label="Email"
                                variant="outlined"
                                placeholder="Enter your email here"
                                value={email}
                                onChange={handleEmailChange}
                                error={email !== '' ? !isValidEmail(email) : false}
                                helperText={(email === "" | isValidEmail(email)) ? "" : "Enter valid email"}
                            />
                        </div>
                    </Col>
                </FormGroup>

                {/* <FormGroup row>
                    <Col>
                        <div> */}

                <FormControl
                    required
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={handlePasswordChange}
                >
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

                <p></p>
                <button className='btn btn-warning' type='submit' onClick={handleSubmit}>
                    LOGIN
                </button>
            </Form>
        </div>
    );
}

export default LoginForm;