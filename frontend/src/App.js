import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import KodAssist from './components/KodAssist';
import './App.css';

function AppContent() {
  const location = useLocation();
  const username = localStorage.getItem('username');

  const isLoggedIn = !!username;
  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/register';

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/register" replace />} />
      </Routes>

      {/* ✅ KodAssist is USED here → no ESLint error */}
      {isLoggedIn && !isAuthPage && <KodAssist />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
