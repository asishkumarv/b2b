import React, { useState, useEffect } from 'react';
import axios from 'axios';

const inputStyle = { width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--gray-200)', borderRadius: '8px', outline: 'none', marginBottom: '1rem' };
const cardStyle = { background: 'var(--white)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--gray-200)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', marginBottom: '1rem' };

export const StaffDashboard = () => {
  const [stats, setStats] = useState({ assigned: 0, progress: 0, successful: 0, pending: 0 });
  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState({ search: '', status: '', startDate: '', endDate: '' });
  const token = localStorage.getItem('adminToken');

  const fetchData = async () => {
    try {
      const statsRes = await axios.get('https://api.b2bwebsolutions.com/api/staff/stats', { headers: { Authorization: `Bearer ${token}` } });
      setStats(statsRes.data);

      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.status) params.append('status', filters.status);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);

      const leadsRes = await axios.get(`https://api.b2bwebsolutions.com/api/enquiries/assigned?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
      setLeads(leadsRes.data.filter(l => l.status !== 'Deal Done' && l.status !== 'Rejected'));
    } catch (err) { console.error("Error fetching staff data", err); }
  };

  useEffect(() => { fetchData(); }, [filters]);

  const updateLeadStatus = async (id, status) => {
    try {
      await axios.put(`https://api.b2bwebsolutions.com/api/enquiries/${id}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (err) { console.error("Error updating status", err); }
  };

  const statCardStyle = { flex: 1, background: 'var(--white)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--gray-200)', textAlign: 'center' };

  return (
    <div>
      <h2 className="h2-title" style={{ marginBottom: '2rem' }}>My Dashboard</h2>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div style={statCardStyle}>
          <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)', fontWeight: 600 }}>Assigned Leads</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--dark)' }}>{stats.assigned}</div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)', fontWeight: 600 }}>In Progress</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>{stats.progress}</div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)', fontWeight: 600 }}>Successful Deals</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#16a34a' }}>{stats.successful}</div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)', fontWeight: 600 }}>Pending</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#d97706' }}>{stats.pending}</div>
        </div>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Active Leads</h3>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input type="text" placeholder="Search name or email" value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})} style={{...inputStyle, marginBottom: 0, flex: 1, minWidth: '200px'}} />
        <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})} style={{...inputStyle, marginBottom: 0, flex: 1, minWidth: '150px'}}>
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Contacted">Contacted</option>
          <option value="Requirements Gathering">Requirements Gathering</option>
          <option value="In Progress">In Progress</option>
        </select>
        <input type="date" value={filters.startDate} onChange={e => setFilters({...filters, startDate: e.target.value})} style={{...inputStyle, marginBottom: 0, width: 'auto'}} />
        <input type="date" value={filters.endDate} onChange={e => setFilters({...filters, endDate: e.target.value})} style={{...inputStyle, marginBottom: 0, width: 'auto'}} />
      </div>

      {leads.length === 0 ? <p>No active leads found.</p> : leads.map(lead => (
        <div key={lead.id} style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>{lead.name}</div>
              <div style={{ color: 'var(--primary)', fontWeight: 500 }}>{lead.email} {lead.phone && `| ${lead.phone}`}</div>
              <p style={{ marginTop: '1rem', color: 'var(--gray-500)' }}>{lead.message}</p>
            </div>
            <div style={{ minWidth: '200px', textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '0.5rem' }}>{new Date(lead.createdAt).toLocaleDateString()}</div>
              <select value={lead.status} onChange={e => updateLeadStatus(lead.id, e.target.value)} style={inputStyle}>
                <option value="Pending">Pending</option>
                <option value="Contacted">Contacted</option>
                <option value="Requirements Gathering">Requirements Gathering</option>
                <option value="In Progress">In Progress</option>
                <option value="Deal Done">Deal Done</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
