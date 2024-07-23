import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Newpatient from './pages/Newpatient';
import Addtest from './pages/Addtest';
import Ratelist from './pages/Ratelist';
import Accounts from './pages/Accounts';
import ReportForm from './pages/ReportForm';

function App() {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/newpatient" element={<Newpatient />} />
          <Route path="/Addtest" element={<Addtest />} />
          <Route path="/reportForm" element={<ReportForm />} />
          <Route path="/ratelist" element={<Ratelist />} />
          <Route path="/accounts" element={<Accounts />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
