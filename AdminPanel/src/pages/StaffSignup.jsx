import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const inputStyle = { width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--gray-200)', borderRadius: '8px', outline: 'none', marginBottom: '1rem' };
const labelStyle = { display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--dark)' };
const cardStyle = { background: 'var(--white)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--gray-200)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', marginBottom: '1rem' };

export const StaffSignup = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://api.b2bwebsolutions.com/api/auth/signup', form);
      setMessage(res.data.message);
      setError('');
      setForm({ name: '', email: '', phone: '', password: '' });
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error signing up');
      setMessage('');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <div style={cardStyle}>
        <h2 className="h2-title" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Staff Registration</h2>
        {message && <div style={{ background: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{message}</div>}
        {error && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}
        
        <form onSubmit={handleSignup}>
          <label style={labelStyle}>Full Name</label>
          <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} required />

          <label style={labelStyle}>Email Address</label>
          <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} required />

          <label style={labelStyle}>Phone Number</label>
          <input type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={inputStyle} required />

          <label style={labelStyle}>Password</label>
          <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={inputStyle} required />

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Register</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>Back to Login</button>
        </p>
      </div>
    </div>
  );
};
