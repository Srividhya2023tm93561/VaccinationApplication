import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Drives from './pages/Drives';
import Reports from './pages/Reports';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import ProtectedRoute from './components/common/ProtectedRoute';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/drives" element={<Drives />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;