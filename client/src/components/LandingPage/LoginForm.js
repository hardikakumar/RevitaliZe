import React,{useState} from 'react';
import { Form, Row, Col, Input } from 'reactstrap';
import { useNavigate} from "react-router-dom";
import axios from 'axios';

function LoginForm() 
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    };

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        // const formData = {email, password}

        try
        {
            const response = await axios.post('http://localhost:5000/userLogin', {email, password});
            console.log(response);
            console.log(response.data);
            alert('Login successfull');
            navigate('/questionnaire');
        }
        catch(error){
            console.error(error);
            alert('Login failed');
        }
    };
    return (
        <div>
            <Form>
                <Row>
                    <Col>
                        <div>
                            <label htmlFor='email'>Email-Id</label>
                            <Input
                                type='text' 
                                className='form-control'
                                placeholder='Enter your Email-Id'
                                value = {email}
                                onChange={handleEmailChange}
                            >
                            </Input>
                        </div>
                    </Col>
                </Row>
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
                <button className='btn btn-warning' type='submit' onClick={handleSubmit}>
                    LOGIN
                </button>
            </Form>
        </div>
    );
}

export default LoginForm;