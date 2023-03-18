import React from 'react';
import { Form, Row, Col } from 'reactstrap';

function SignUpForm() {
    return (
        <div>
            <Form>
                <Row>
                    <Col>
                        <div>
                            <label htmlFor='name'>Name</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Name'
                            >
                            </input>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div>
                            <label htmlFor='age'>Age</label>
                            <input
                                type='text' //CHECKKKKKKKKKKKK
                                className='form-control'
                                placeholder='Enter Age'
                            >
                            </input>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <label htmlFor='age'>Gender</label>
                            <input
                                type='text' //CHECKKKKKKKKKKKK
                                className='form-control'
                                placeholder='Enter Gender'
                            >
                            </input>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <label htmlFor='email'>Email-Id</label>
                            <input
                                type='text' //CHECKKKKKKKKKKKK
                                className='form-control'
                                placeholder='Enter Email-Id'
                            >
                            </input>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='text' //CHECKKKKKKKKKKKK
                                className='form-control'
                                placeholder='Enter Password'
                            >
                            </input>
                        </div>
                    </Col>
                </Row>
                <div><p></p></div>
                <button className='btn btn-warning'>
                    SUBMIT
                </button>
                
            </Form>
        </div>
    );
}

export default SignUpForm;