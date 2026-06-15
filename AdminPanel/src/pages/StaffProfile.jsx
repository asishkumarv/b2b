import React, { useState } from 'react';
import axios from 'axios';

const inputStyle = { width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--gray-200)', borderRadius: '8px', outline: 'none', marginBottom: '1rem' };
const labelStyle = { display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--dark)' };
const cardStyle = { background: 'var(--white)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--gray-200)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', marginBottom: '1rem' };

export const StaffProfile = () => {
  const [form, setForm] = useState({ name: '', phone: '', password: '' });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('adminToken');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('https://api.b2bwebsolutions.com/api/staff/profile', form, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
      setForm({...form, password: ''});
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <h2 className="h2-title" style={{ marginBottom: '2rem' }}>My Profile</h2>
      <div style={cardStyle}>
        {message && <div style={{ background: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{message}</div>}
        <form onSubmit={handleUpdate}>
          <label style={labelStyle}>Full Name</label>
          <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} />

          <label style={labelStyle}>Phone Number</label>
          <input type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={inputStyle} />

          <label style={labelStyle}>New Password (leave blank to keep current)</label>
          <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={inputStyle} />

          <button type="submit" className="btn-primary">Update Profile</button>
        </form>
      </div>
    </div>
  );
};
