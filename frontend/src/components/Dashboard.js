import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { getBalance, logout } from '../api';
import './Dashboard.css';

import KodAssist from './KodAssist';

function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [error, setError] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!username) {
      navigate('/login');
    }
  }, [navigate, username]);

  const handleCheckBalance = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await getBalance();
      if (response.data.success) {
        setBalance(response.data.balance);
        setShowBalance(true);
        setShowConfetti(true);
        // Stop confetti after 4 seconds
        setTimeout(() => setShowConfetti(false), 4000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch balance');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="dashboard-container">
      {showConfetti && <Confetti />}
      <div className="dashboard-header">
        <h1>Welcome to Kodbank</h1>
        <div className="user-info">
          <span>Logged in as: <strong>{username}</strong></span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
      <div className="dashboard-card">
        <h2>Account Dashboard</h2>
        {error && <div className="error-message">{error}</div>}
        {!showBalance ? (
          <div className="balance-section">
            <p className="description">Click the button below to check your balance</p>
            <button 
              onClick={handleCheckBalance} 
              disabled={loading} 
              className="check-balance-btn"
            >
              {loading ? 'Checking...' : 'Check Balance'}
            </button>
          </div>
        ) : (
          <div className="balance-display">
            <div className="balance-box">
              <p className="balance-label">Your Balance Is:</p>
              <div className="balance-amount">
                <span className="currency">₹</span>
                <span className="amount">{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
            <button 
              onClick={handleCheckBalance} 
              className="check-balance-btn secondary"
            >
              Check Again
            </button>
          </div>
        )}
      </div>
      {/* Render KodAssist chatbot below dashboard */}
      <div style={{ marginTop: '40px' }}>
        <KodAssist />
        <div style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '10px' }}>KodAssist Chatbot</div>
      </div>
    </div>
  );
}

export default Dashboard;
