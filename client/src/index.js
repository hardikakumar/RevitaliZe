import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Questionnaire from './components/Questionnaire/Questionnaire.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import DoctorDashboard from './components/DoctorDashboard/DoctorDashboard.js';
import DoctorDashboardRemedies from './components/DoctorDashboard/Remedies.js';
import Reminder from './components/Reminders/Reminders.js';
import Remedies from './components/Remedies/Remedies.js';
import CompleteRemedies from './components/Remedies/CompleteReport.js';
import Reports from './components/Reports/Reports.js';
import DownloadReport from './components/Reports/DownloadReport.js';
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
      <Route path="/reminder" element={<Reminder />} />
      <Route path="/remedies" element={<Remedies />} />
      <Route path="/completeRemedies" element={<CompleteRemedies />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/downloadReport" element={<DownloadReport />} />
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      <Route path="/doctor-dashboard/remedies" element={<DoctorDashboardRemedies />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();