import React, { useState } from 'react';
import './LandingPage.css'
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import logo from '../../assets/images/logo.png';
import dietPlanImg from '../../assets/images/dietPlan.jpg';
import nutritionist from '../../assets/images/nutritionist.jpg';
import reminders from '../../assets/images/reminder.png';
import vatta from '../../assets/images/dosha.png';
import SignUpForm from './SignUpForm.js'
import LoginForm from './LoginForm.js'

function LandingPage() {
  const [signUp, showSignUp] = useState(false);
  const [login, showLogin] = useState(false);

  return (
    <div>
      {/* Header */}
      <header>
        <div>
          <img style={{ height: 60, left: 20 }} src={logo} alt="Logo" />
        </div>
      </header>

      {/* SignUp Form */}
      <div>
        <Modal
          size='md'
          isOpen={signUp}
          toggle={() => showSignUp(!signUp)}
        >

          <ModalHeader>
            Sign Up
          </ModalHeader>
          <ModalBody>
            <SignUpForm />
          </ModalBody>
        </Modal>
      </div>

      {/* Login Form */}
      <div>
        <Modal
          size='md'
          isOpen={login}
          toggle={() => showLogin(!login)}
        >

          <ModalHeader>
            Login
          </ModalHeader>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      </div>

      {/* Navigation menu */}
      <nav>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <ul>
          <li><button className='btn btn-warning' onClick={() => showSignUp(true)}>Sign Up</button></li>
          <li><button className='btn btn-warning' onClick={() => showLogin(true)}>Login</button></li>
        </ul>
      </nav>

      {/* Hero section */}
      <section className="hero">
        {/* <h2>Eat healthy, stay healthy</h2>
        <p>Get personalized diet plans and achieve your fitness goals</p> */}
      </section>

      {/* Features section */}
      <section className="features">
        <h3>Our Features</h3>
        <ul>
          <li>
            <img style={{ height: 200 }} src={dietPlanImg} alt="Personalized Diet Plans" />
            <h4>Personalized Diet Plans</h4>
            <p>We provide personalized diet plans based on your fitness goals and dietary requirements.</p>
          </li>
          <li>
            <img style={{ height: 200 }} src={reminders} alt="Meal Tracking & Reminders" />
            <h4>Meal Tracking & Reminders</h4>
            <p>Track your daily meals and set reminders for your diet.</p>
          </li>
          <li>
            <img style={{ height: 200 }} src={nutritionist} classname='photo' alt="Expert Support" />
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