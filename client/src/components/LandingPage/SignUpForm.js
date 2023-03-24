import { TextField, FormControl, IconButton, InputAdornment, OutlinedInput, InputLabel, MenuItem } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';
import { Form, Col, FormFeedback, FormGroup } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function SignUpForm() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleNameChange = (event) => {
        setName(event.target.value)
    };

    const isValidName = (name) => {
        return /^[a-zA-Z ]{2,30}$/.test(name);
    }

    const handleAgeChange = (event) => {
        setAge(event.target.value)
    };

    const isValidAge = (age) => {
        return age >= 10 && age <= 99;
    }

    const handleGenderChange = (event) => {
        setGender(event.target.value)
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    };

    const isValidEmail = (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    };

    const isValidPassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password);
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (isValidName(name) && isValidAge(age) && isValidEmail(email) && isValidPassword(password)) {
                const response = await axios.post('http://localhost:5000/users', { name, age, gender, email, password });
                navigate('/questionnaire');
            }
            else alert('Please enter correct details');
        }
        catch (error) {
            console.error(error);
            alert('Signup failed');
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
                                label="Name"
                                variant="outlined"
                                placeholder="Enter your name here"
                                value={name}
                                onChange={handleNameChange}
                                error={name != '' ? !isValidName(name) : false}
                                helperText={(name === "" | isValidName(name)) ? "" : "Enter correct Name"}
                            />
                            <FormFeedback invalid>done</FormFeedback>
                        </div>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Col>
                        <div>
                            <TextField
                                id="outlined-error-helper-text"
                                required
                                fullWidth
                                label="Age"
                                variant="outlined"
                                type='number'
                                placeholder="Enter your age here"
                                value={age}
                                onChange={handleAgeChange}
                                error={age != '' ? !isValidAge(age) : false}
                                helperText={(age === "" | isValidAge(age)) ? "" : "Enter age between 10-99"}
                            />
                        </div>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Col>
                        <div>
                            <TextField
                                id="outlined-select-gender"
                                select
                                required
                                fullWidth
                                label="Gender"
                                value={gender}
                                onChange={handleGenderChange}
                            >
                                <MenuItem key={'M'} value={'M'}>Male</MenuItem>
                                <MenuItem key={'F'} value={'F'}>Female</MenuItem>
                            </TextField>
                        </div>
                    </Col>
                </FormGroup>

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
                <FormControl
                    required
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={handlePasswordChange}
                    error={password !== '' ? !isValidPassword(password) : false}
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
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                    <p style={{ fontSize: 12, fontStyle: 'italic' }}>
                        1. Length of Password should be GREATER THAN OR EQUAL to 8. <br />
                        2. Password should contain AT LEAST ONE Capital Letter. <br />
                        3. Password should contain AT LEAST ONE Small Letter. <br />
                        4. Password should contain AT LEAST ONE Special Character. <br />
                        5. Password should contain AT LEAST ONE Number.
                    </p>
                </FormControl>

                <button className='btn btn-warning' type='submit' onClick={handleSubmit}>
                    SUBMIT
                </button>
            </Form>
        </div>
    );
}

export default SignUpForm;