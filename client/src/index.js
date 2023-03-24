import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Questionnaire from './components/Questionnaire/Questionnaire.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/questionnaire" element={<Questionnaire />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();