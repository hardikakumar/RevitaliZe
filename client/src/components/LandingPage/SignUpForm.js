import { TextField, FormControl, IconButton, InputAdornment, OutlinedInput, InputLabel, MenuItem } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';
import { Form, Col, FormFeedback, FormGroup } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import 'react-phone-number-input/style.css';

function SignUpForm() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

// -----------NAME-----------
    const handleNameChange = (event) => {
        setName(event.target.value)
    };

    const isValidName = (name) => {
        return /^[a-zA-Z ]{2,30}$/.test(name);
    }

// -----------AGE-----------
    const handleAgeChange = (event) => {
        setAge(event.target.value)
    };

    const isValidAge = (age) => {
        return age >= 10 && age <= 99;
    }

// -----------GENDER-----------
    const handleGenderChange = (event) => {
        setGender(event.target.value)
    };

// -----------EMAIL-----------    
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    };

    const isValidEmail = (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

// -----------PHONE-----------    
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
        console.log(phone)
        console.log(phone.length)
    };

    const isValidPhone = (phone) => {
        return phone.length==14;
    }

    const formatPhoneNumber = (value) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            6,
        )}-${phoneNumber.slice(6, )}`;
    }

// -----------PASSWORD-----------    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    };

    const isValidPassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password);
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

// -----------SUBMIT-----------    
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (isValidName(name) && isValidAge(age) && isValidEmail(email) && isValidPassword(password) && isValidPhone(phone)) {
                const response = await axios.post('http://localhost:5000/users', { name, age, gender, email,phone, password });
                navigate('/questionnaire');
            }
            else alert('Please enter correct details');
        }
        catch (error) {
            console.error(error);
            console.log(error);
            if (error.response.status == 403) {
                alert(error.response.data.message);
            }
            else {
                alert('Signup failed');
            }
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

                <FormGroup row>
                    <Col>
                        <div>
                            <TextField
                                id="outlined-error-helper-text"
                                required
                                fullWidth
                                label="Phone"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                                  }}
                                placeholder="Enter phone number"
                                value={formatPhoneNumber(phone)}
                                onChange={handlePhoneChange}
                                error={phone !== '' ? !isValidPhone(phone) : false}
                                helperText={(phone === "" | isValidPhone(phone)) ? "" : "Phone number should contain 10 digits"}
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
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
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