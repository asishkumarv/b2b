import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, LogOut, MessageSquare, Menu, X } from 'lucide-react';
import b2bLogo from '../assets/b2b-logo.jpeg';

export const DashboardLayout = ({ children, setAuth, role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    setAuth(false);
    navigate('/login');
  };

  const navItemStyle = {
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    borderRadius: '12px',
    color: 'var(--gray-500)',
    fontWeight: 500,
    transition: 'all 0.2s'
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="admin-layout">
      {/* Mobile Header */}
      <div className="mobile-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src={b2bLogo} alt="B2B Logo" style={{ height: '28px', width: 'auto', borderRadius: '4px' }} />
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark)' }}>B2B Admin</span>
        </div>
        <button onClick={toggleSidebar} style={{ background: 'transparent', color: 'var(--dark)' }}>
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Overlay */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'show' : ''}`} onClick={closeSidebar}></div>

      {/* Sidebar */}
      <div className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src={b2bLogo} alt="B2B Logo" style={{ height: '32px', width: 'auto', borderRadius: '6px' }} />
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--dark)' }}>B2B Admin</span>
          </div>
          <button className="mobile-menu-btn" onClick={closeSidebar} style={{ color: 'var(--dark)' }}>
            <X size={24} />
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem', gap: '0.5rem', flex: 1 }}>
          {role === 'admin' ? (
            <>
              <div onClick={() => { navigate('/'); closeSidebar(); }} className="dropdown-item" style={{ ...navItemStyle, ...(location.pathname === '/' ? { color: 'var(--primary)', background: 'rgba(124, 58, 237, 0.05)' } : {}) }}>
                <LayoutDashboard size={20} /> Page Content
              </div>
              <div onClick={() => { navigate('/blogs'); closeSidebar(); }} className="dropdown-item" style={{ ...navItemStyle, ...(location.pathname === '/blogs' ? { color: 'var(--primary)', background: 'rgba(124, 58, 237, 0.05)' } : {}) }}>
                <FileText size={20} /> Blog Posts
              </div>
              <div onClick={() => { navigate('/enquiries'); closeSidebar(); }} className="dropdown-item" style={{ ...navItemStyle, ...(location.pathname === '/enquiries' ? { color: 'var(--primary)', background: 'rgba(124, 58, 237, 0.05)' } : {}) }}>
                <MessageSquare size={20} /> New Enquiries
              </div>
              <div onClick={() => { navigate('/staff'); closeSidebar(); }} className="dropdown-item" style={{ ...navItemStyle, ...(location.pathname === '/staff' ? { color: 'var(--primary)', background: 'rgba(124, 58, 237, 0.05)' } : {}) }}>
                <LayoutDashboard size={20} /> Staff Management
              </div>
            </>
          ) : (
            <>
              <div onClick={() => { navigate('/staff-dashboard'); closeSidebar(); }} className="dropdown-item" style={{ ...navItemStyle, ...(location.pathname === '/staff-dashboard' ? { color: 'var(--primary)', background: 'rgba(124, 58, 237, 0.05)' } : {}) }}>
                <LayoutDashboard size={20} /> My Dashboard
              </div>
              <div onClick={() => { navigate('/staff-history'); closeSidebar(); }} className="dropdown-item" style={{ ...navItemStyle, ...(location.pathname === '/staff-history' ? { color: 'var(--primary)', background: 'rgba(124, 58, 237, 0.05)' } : {}) }}>
                <FileText size={20} /> Leads History
              </div>
              <div onClick={() => { navigate('/staff-profile'); closeSidebar(); }} className="dropdown-item" style={{ ...navItemStyle, ...(location.pathname === '/staff-profile' ? { color: 'var(--primary)', background: 'rgba(124, 58, 237, 0.05)' } : {}) }}>
                <MessageSquare size={20} /> My Profile
              </div>
            </>
          )}
        </div>

        <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid var(--gray-100)' }}>
          <div onClick={handleLogout} className="dropdown-item" style={{ ...navItemStyle, color: '#ef4444' }}>
            <LogOut size={20} /> Logout
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="admin-main">
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
