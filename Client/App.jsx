import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext'; 
import ForgotPassword from './pages/ForgotPassword'; 
import './assets/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>    
          {/* Step 1: Welcome Page */}
          <Route path="/" element={<Home />} />
          
          {/* Step 2: Login/Register Page */}
          <Route path="/login" element={<Auth />} />

          {/* ADD THIS ROUTE HERE */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Step 3: Secure Dashboard */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;