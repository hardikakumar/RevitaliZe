import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import SignUpForm from './SignUpForm.js'
import { Modal, ModalBody, ModalHeader, Form, Row, Col } from 'reactstrap';

function LandingPage() {
  const [modal, showSignUp] = useState(false);

  return (

    <div>
      {/* Header */}
      <header>
        <div>
          <img src={logo} alt="Logo" />
        </div>
      </header>

      {/* SignUp Form */}
      <div>
        <Modal
          size='md'
          isOpen={modal}
          toggle={() => showSignUp(!modal)}
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


      <div><SignUpForm showPage={false}/></div>
      {/* Navigation menu */}
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <ul>
          {/* <button className='btn btn-warning' onClick={() => <div><SignUpForm showPage={true}/></div>}>Sign Up</button> */}
          <li><button className='btn btn-warning' onClick={() => showSignUp(true)}>Sign Up</button></li>
          <li><button className='btn btn-warning' onClick={() => showSignUp(true)}>Login</button></li>
          {/* <button className='buttonStyle' onClick={<div><SignUpForm showPage={true}/></div>}>Sign Up</button> */}
        </ul>
      </nav>

      {/* Hero section */}
      <section className="hero">
        <h2>Eat healthy, stay healthy</h2>
        <p>Get personalized diet plans and achieve your fitness goals</p>
      </section>

      {/* Features section */}
      <section className="features">
        <h3>Our Features</h3>
        <ul>
          <li>
            <img src="path/to/feature1.png" alt="Feature 1" />
            <h4>Personalized Diet Plans</h4>
            <p>We provide personalized diet plans based on your fitness goals and dietary requirements.</p>
          </li>
          <li>
            <img src="path/to/feature2.png" alt="Feature 2" />
            <h4>Meal Tracking</h4>
            <p>Track your daily meals and get insights into your diet and nutrition.</p>
          </li>
          <li>
            <img src="path/to/feature3.png" alt="Feature 3" />
            <h4>Expert Support</h4>
            <p>Get expert support and guidance from our certified nutritionists and fitness trainers.</p>
          </li>
        </ul>
      </section>

      {/* CTA section */}
      <section className="cta">
        <h3>Get Started Today</h3>
        <p>Join our community of fitness enthusiasts and achieve your fitness goals.</p>
        <button onClick={() => showSignUp(true)}>Sign Up</button>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2023 RevitaliZe</p>
        <p><a href="#">Privacy Policy</a> | <a href="#">Terms and Conditions</a></p>
      </footer>
    </div >
  );
}

export default LandingPage;