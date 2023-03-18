import React from 'react';
import { Form, Row, Col , Input} from 'reactstrap';
import {useState} from 'react';
import axios from 'axios';

function SignUpForm() 
{
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value)
    };

    const handleAgeChange = (event) => {
        setAge(event.target.value)
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value)
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const formData = {email, password}

        try{
            const response = await axios.post('http://localhost:5000/users', {name,age,gender,email, password});
            alert('Signup Successfull!');
        }
        catch (error) {
            console.error(error);
            alert('Signup failed');
        }
    };

    return (
        <div>
            <Form>
                <Row>
                    <Col>
                        <div>
                            <label htmlFor='name'>Name</label>
                            <Input
                                type='text' 
                                className='form-control'
                                placeholder='Enter your Name'
                                value = {name}
                                onChange={handleNameChange}
                            >
                            </Input>
                        </div>
                    </Col>
                </Row>

                <div><p></p></div>
                <Row>
                    <Col>
                        <div>
                            <label htmlFor='age'>Age</label>
                            <Input
                                type='text' 
                                className='form-control'
                                placeholder='Enter your Age'
                                value = {age}
                                onChange={handleAgeChange}
                            >
                            </Input>
                        </div>
                    </Col>
                </Row>

                <div><p></p></div>
                <Row>
                    <Col>
                        <div>
                            <label htmlFor='gender'>Gender</label>
                            <Input
                                type='text'
                                className='form-control'
                                placeholder='Enter your Gender'
                                value = {gender}
                                onChange={handleGenderChange}
                            >
                            </Input>
                        </div>
                    </Col>
                </Row>

                <div><p></p></div>
                <Row>
                    <Col>
                        <div>
                            <label htmlFor='email'>Email-Id</label>
                            <Input
                                type='text' 
                                className='form-control'
                                placeholder='Enter your Email'
                                value = {email}
                                onChange={handleEmailChange}
                            >
                            </Input>
                        </div>
                    </Col>
                </Row>

                <div><p></p></div>
                <Row>
                    <Col>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <Input
                                type='text' 
                                className='form-control'
                                placeholder='******'
                                value = {password}
                                onChange={handlePasswordChange}
                            >
                            </Input>
                        </div>
                    </Col>
                </Row>

                <div><p></p></div>
                <button className='btn btn-warning' type='submit' onClick={handleSubmit}>
                    SUBMIT 
                </button>
            </Form>
        </div>
    );
}

export default SignUpForm;