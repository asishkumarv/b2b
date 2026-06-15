import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const EnquiriesManager = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [filters, setFilters] = useState({ search: '', status: '', assignedTo: '', startDate: '', endDate: '' });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.status) params.append('status', filters.status);
      if (filters.assignedTo) params.append('assignedTo', filters.assignedTo);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);

      const res = await axios.get(`https://api.b2bwebsolutions.com/api/enquiries?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEnquiries(res.data);

      const staffRes = await axios.get('https://api.b2bwebsolutions.com/api/staff', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStaffList(staffRes.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, [filters]);

  const handleAssign = async (id, staffId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`https://api.b2bwebsolutions.com/api/enquiries/${id}/assign`, { staffId: staffId || null }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const inputStyle = { padding: '0.75rem 1rem', border: '1px solid var(--gray-200)', borderRadius: '8px', outline: 'none' };

  return (
    <div>
      <h2 className="h2-title" style={{ marginBottom: '2rem' }}>All Enquiries</h2>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', background: 'var(--white)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--gray-200)' }}>
        <input type="text" placeholder="Search name or email" value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})} style={{...inputStyle, flex: 1, minWidth: '200px'}} />
        
        <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})} style={{...inputStyle, flex: 1, minWidth: '150px'}}>
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Contacted">Contacted</option>
          <option value="Requirements Gathering">Requirements Gathering</option>
          <option value="In Progress">In Progress</option>
          <option value="Deal Done">Deal Done</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select value={filters.assignedTo} onChange={e => setFilters({...filters, assignedTo: e.target.value})} style={{...inputStyle, flex: 1, minWidth: '150px'}}>
          <option value="">All Staff (Assigned & Unassigned)</option>
          <option value="unassigned">Unassigned Only</option>
          {staffList.filter(s => s.status === 'approved').map(s => (
            <option key={s.id} value={s.id}>Assigned to {s.name}</option>
          ))}
        </select>

        <input type="date" value={filters.startDate} onChange={e => setFilters({...filters, startDate: e.target.value})} style={{...inputStyle, width: 'auto'}} />
        <input type="date" value={filters.endDate} onChange={e => setFilters({...filters, endDate: e.target.value})} style={{...inputStyle, width: 'auto'}} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {enquiries.length === 0 && <p style={{ color: 'var(--gray-500)' }}>No enquiries found.</p>}
        
        {enquiries.map(enq => (
          <div key={enq.id} style={{ 
            background: 'var(--white)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--gray-200)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
          }}>
            <div className="flex-mobile-col" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid var(--gray-100)', paddingBottom: '1rem' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--dark)' }}>{enq.name}</div>
                <div style={{ color: 'var(--primary)', fontWeight: 500 }}>{enq.email}</div>
                {enq.phone && <div style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>📞 {enq.phone}</div>}
                
                <div style={{ marginTop: '0.5rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--gray-500)', background: 'var(--light)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                    Status: {enq.status}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                <div style={{ background: 'var(--light)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--gray-500)', display: 'inline-block' }}>
                  Source: {enq.source}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>{new Date(enq.createdAt).toLocaleString()}</div>
                
                <div style={{ marginTop: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--dark)', marginRight: '0.5rem' }}>Assign To:</label>
                  <select value={enq.assignedTo || ''} onChange={e => handleAssign(enq.id, e.target.value)} style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--gray-200)', outline: 'none', background: 'var(--light)' }}>
                    <option value="">Unassigned</option>
                    {staffList.filter(s => s.status === 'approved').map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <div style={{ fontWeight: 600, color: 'var(--dark)', marginBottom: '0.5rem' }}>Message:</div>
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{enq.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
