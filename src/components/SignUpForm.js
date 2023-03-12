import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader, Form, Row, Col } from 'reactstrap';

function SignUpForm({showPage}) {
    const [modal, setModal] = useState(() => false);
    if(showPage==true) setModal(true);
    // const showPage = () => setModal(true);

    return (
        <div>
            <Modal
                size='md'
                isOpen={modal}
                toggle={() => setModal(!modal)}
            >

                <ModalHeader>
                    Sign Up
                </ModalHeader>
                <ModalBody>
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

                    </Form>

                </ModalBody>
            </Modal>
        </div>
    )
}

export default SignUpForm;