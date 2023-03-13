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
            </Form>
        </div>
    );
}

export default SignUpForm;