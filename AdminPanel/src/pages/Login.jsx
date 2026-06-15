import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import b2bLogo from '../assets/b2b-logo.jpeg';

export const Login = ({ setAuth, setRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://api.b2bwebsolutions.com/api/auth/login', { email, password });
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('userRole', res.data.role);
      setRole(res.data.role);
      setAuth(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="hero-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1rem' }}>
      <div className="dot-pattern"></div>
      
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src={b2bLogo} alt="B2B Logo" style={{ height: '64px', width: 'auto', borderRadius: '12px', marginBottom: '1rem' }} />
          <h1 className="h2-title">Admin Portal</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)' }}>Sign in to manage B2B content</p>
        </div>

        <form onSubmit={handleLogin} style={{ 
          background: 'rgba(255,255,255,0.1)', 
          backdropFilter: 'blur(16px)', 
          border: '1px solid rgba(255,255,255,0.2)',
          padding: '2.5rem', 
          borderRadius: '24px', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)' 
        }}>
          {error && <div style={{ color: '#fca5a5', marginBottom: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>{error}</div>}
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} 
              required 
            />
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} 
              required 
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
            Sign In
          </button>
          
          <div style={{ textAlign: 'center', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>
            Staff Member? <button type="button" onClick={() => navigate('/signup')} style={{ background: 'none', border: 'none', color: 'white', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>Register Here</button>
          </div>
        </form>
      </div>
    </div>
  );
};
