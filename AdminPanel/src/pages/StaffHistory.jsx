import React, { useState, useEffect } from 'react';
import axios from 'axios';

const cardStyle = { background: 'var(--white)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--gray-200)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', marginBottom: '1rem' };

export const StaffHistory = () => {
  const [leads, setLeads] = useState([]);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('https://api.b2bwebsolutions.com/api/enquiries/assigned', { headers: { Authorization: `Bearer ${token}` } });
        setLeads(res.data.filter(l => l.status === 'Deal Done' || l.status === 'Rejected'));
      } catch (err) { console.error(err); }
    };
    fetchHistory();
  }, []);

  return (
    <div>
      <h2 className="h2-title" style={{ marginBottom: '2rem' }}>Leads History</h2>
      {leads.length === 0 ? <p>No history found.</p> : leads.map(lead => (
        <div key={lead.id} style={{...cardStyle, opacity: 0.8}}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>{lead.name}</div>
              <div style={{ color: 'var(--gray-500)' }}>{lead.email}</div>
            </div>
            <div>
              <span style={{ 
                display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '999px', fontWeight: 600,
                background: lead.status === 'Deal Done' ? '#dcfce7' : '#fee2e2',
                color: lead.status === 'Deal Done' ? '#166534' : '#991b1b'
              }}>
                {lead.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
