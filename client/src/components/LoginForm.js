import React from 'react';
import { Form, Row, Col } from 'reactstrap';

function LoginForm() {
    return (
        <div>
            <Form>
                <Row>
                    <Col>
                        <div>
                            <label htmlFor='name'>Username</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Username'
                            >
                            </input>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default LoginForm;