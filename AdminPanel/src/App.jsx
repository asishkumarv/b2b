import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'easymde/dist/easymde.min.css';

// Components
import { DashboardLayout } from './components/DashboardLayout';

// Pages
import { Login } from './pages/Login';
import { PageContentManager } from './pages/PageContentManager';
import { BlogManager } from './pages/BlogManager';
import { EnquiriesManager } from './pages/EnquiriesManager';
import { StaffSignup } from './pages/StaffSignup';
import { StaffManager } from './pages/StaffManager';
import { StaffDashboard } from './pages/StaffDashboard';
import { StaffHistory } from './pages/StaffHistory';
import { StaffProfile } from './pages/StaffProfile';

const AdminRoute = ({ isAuthenticated, userRole, children }) => {
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (userRole !== 'admin') return <Navigate to="/staff-dashboard" replace />;
  return children;
};

const StaffRoute = ({ isAuthenticated, userRole, children }) => {
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (userRole !== 'staff') return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('adminToken');
    const role = localStorage.getItem('userRole');
    return !!token && (role === 'admin' || role === 'staff');
  });
  
  const [userRole, setUserRole] = useState(() => {
    const role = localStorage.getItem('userRole');
    return (role === 'admin' || role === 'staff') ? role : null;
  });

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to={userRole === 'staff' ? "/staff-dashboard" : "/"} replace /> : <Login setAuth={setIsAuthenticated} setRole={setUserRole} />} />
      <Route path="/signup" element={<StaffSignup />} />
      
      {/* Admin Routes */}
      <Route path="/" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><DashboardLayout setAuth={setIsAuthenticated} role={userRole}><PageContentManager /></DashboardLayout></AdminRoute>} />
      <Route path="/blogs" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><DashboardLayout setAuth={setIsAuthenticated} role={userRole}><BlogManager /></DashboardLayout></AdminRoute>} />
      <Route path="/enquiries" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><DashboardLayout setAuth={setIsAuthenticated} role={userRole}><EnquiriesManager /></DashboardLayout></AdminRoute>} />
      <Route path="/staff" element={<AdminRoute isAuthenticated={isAuthenticated} userRole={userRole}><DashboardLayout setAuth={setIsAuthenticated} role={userRole}><StaffManager /></DashboardLayout></AdminRoute>} />

      {/* Staff Routes */}
      <Route path="/staff-dashboard" element={<StaffRoute isAuthenticated={isAuthenticated} userRole={userRole}><DashboardLayout setAuth={setIsAuthenticated} role={userRole}><StaffDashboard /></DashboardLayout></StaffRoute>} />
      <Route path="/staff-history" element={<StaffRoute isAuthenticated={isAuthenticated} userRole={userRole}><DashboardLayout setAuth={setIsAuthenticated} role={userRole}><StaffHistory /></DashboardLayout></StaffRoute>} />
      <Route path="/staff-profile" element={<StaffRoute isAuthenticated={isAuthenticated} userRole={userRole}><DashboardLayout setAuth={setIsAuthenticated} role={userRole}><StaffProfile /></DashboardLayout></StaffRoute>} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
