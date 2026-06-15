import React, { useState, useEffect } from 'react';
import axios from 'axios';

const cardStyle = { background: 'var(--white)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--gray-200)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', marginBottom: '1rem' };

export const StaffManager = () => {
  const [staffList, setStaffList] = useState([]);
  const token = localStorage.getItem('adminToken');

  const fetchStaff = async () => {
    try {
      const res = await axios.get('https://api.b2bwebsolutions.com/api/staff', { headers: { Authorization: `Bearer ${token}` } });
      setStaffList(res.data);
    } catch (err) { console.error("Error fetching staff", err); }
  };

  useEffect(() => { fetchStaff(); }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`https://api.b2bwebsolutions.com/api/staff/${id}/status`, { status: newStatus }, { headers: { Authorization: `Bearer ${token}` } });
      fetchStaff();
    } catch (err) { console.error("Error updating status", err); }
  };

  return (
    <div>
      <h2 className="h2-title" style={{ marginBottom: '2rem' }}>Staff Management</h2>
      {staffList.map(staff => (
        <div key={staff.id} style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{staff.name}</h3>
              <p style={{ color: 'var(--gray-500)', margin: '0.25rem 0' }}>{staff.email} | {staff.phone}</p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                <div style={{ background: 'var(--light)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Assigned</span>
                  <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>{staff.stats?.totalAssigned || 0}</div>
                </div>
                <div style={{ background: 'var(--light)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>In Progress</span>
                  <div style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--primary)' }}>{staff.stats?.inProgress || 0}</div>
                </div>
                <div style={{ background: 'var(--light)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Deal Done</span>
                  <div style={{ fontWeight: 700, fontSize: '1.25rem', color: '#16a34a' }}>{staff.stats?.dealDone || 0}</div>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ 
                display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '999px', fontWeight: 600, marginBottom: '1rem',
                background: staff.status === 'approved' ? '#dcfce7' : staff.status === 'pending' ? '#fef3c7' : '#fee2e2',
                color: staff.status === 'approved' ? '#166534' : staff.status === 'pending' ? '#92400e' : '#991b1b'
              }}>
                {staff.status.toUpperCase()}
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                {staff.status !== 'approved' && (
                  <button onClick={() => updateStatus(staff.id, 'approved')} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Approve</button>
                )}
                {staff.status !== 'deactivated' && (
                  <button onClick={() => updateStatus(staff.id, 'deactivated')} style={{ padding: '0.5rem 1rem', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Deactivate</button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
