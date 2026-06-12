import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { LayoutDashboard, FileText, LogOut, MessageSquare } from 'lucide-react';
import b2bLogo from './assets/b2b-logo.jpeg';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://b2b-yyfo.onrender.com/api/auth/login', { email, password });
      localStorage.setItem('adminToken', res.data.token);
      setAuth(true);
    } catch (err) {
      setError('Invalid credentials');
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

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

const DashboardLayout = ({ children, setAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
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

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--light)' }}>
      {/* Sidebar */}
      <div style={{ 
        width: '280px', 
        background: 'var(--white)', 
        borderRight: '1px solid var(--gray-200)',
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--gray-100)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src={b2bLogo} alt="B2B Logo" style={{ height: '32px', width: 'auto', borderRadius: '6px' }} />
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--dark)' }}>B2B Admin</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem', gap: '0.5rem', flex: 1 }}>
          <div onClick={() => navigate('/')} className="dropdown-item" style={{ ...navItemStyle, ...(location.pathname === '/' ? { color: 'var(--primary)', background: 'rgba(124, 58, 237, 0.05)' } : {}) }}>
            <LayoutDashboard size={20} /> Page Content
          </div>
          <div onClick={() => navigate('/blogs')} className="dropdown-item" style={{ ...navItemStyle, ...(location.pathname === '/blogs' ? { color: 'var(--primary)', background: 'rgba(124, 58, 237, 0.05)' } : {}) }}>
            <FileText size={20} /> Blog Posts
          </div>
          <div onClick={() => navigate('/enquiries')} className="dropdown-item" style={{ ...navItemStyle, ...(location.pathname === '/enquiries' ? { color: 'var(--primary)', background: 'rgba(124, 58, 237, 0.05)' } : {}) }}>
            <MessageSquare size={20} /> New Enquiries
          </div>
        </div>

        <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid var(--gray-100)' }}>
          <div onClick={handleLogout} className="dropdown-item" style={{ ...navItemStyle, color: '#ef4444' }}>
            <LogOut size={20} /> Logout
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '3rem' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

const PageContentManager = () => {
  const [content, setContent] = useState({ pageKey: 'home_hero', title: '', description: '', imageUrl: '', data: null });
  const [allContent, setAllContent] = useState({});
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get('https://b2b-yyfo.onrender.com/api/content');
        const contentDict = res.data.reduce((acc, item) => {
          acc[item.pageKey] = item;
          return acc;
        }, {});
        setAllContent(contentDict);
        
        if (contentDict['home_hero']) {
          setContent({
            pageKey: 'home_hero',
            title: contentDict['home_hero'].title || '',
            description: contentDict['home_hero'].description || '',
            imageUrl: contentDict['home_hero'].imageUrl || '',
            data: contentDict['home_hero'].data || null
          });
        }
      } catch (err) {
        console.error('Failed to fetch content:', err);
      }
    };
    fetchContent();
  }, []);

  const handleKeyChange = (e) => {
    const newKey = e.target.value;
    const existing = allContent[newKey] || { title: '', description: '', imageUrl: '', data: null };
    
    // Auto-initialize data array for known array sections if null
    let initData = existing.data;
    if (!initData) {
      if (['home_what_we_do', 'home_why_choose', 'about_values'].includes(newKey)) initData = [];
      if (['home_about', 'home_process', 'about_story'].includes(newKey)) initData = [];
      if (newKey === 'home_showcase') initData = [];
      if (newKey === 'home_testimonial') initData = { initials: '', name: '', role: '' };
      if (newKey === 'about_stats') initData = [];
      if (newKey === 'services_list') initData = [];
    }

    setContent({
      pageKey: newKey,
      title: existing.title || '',
      description: existing.description || '',
      imageUrl: existing.imageUrl || '',
      data: initData
    });
  };

  const handleImageUpload = async (e, field, index = null) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    
    setUploading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.post('https://b2b-yyfo.onrender.com/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      });
      
      if (field === 'main') {
        setContent(prev => ({ ...prev, imageUrl: res.data.imageUrl }));
      } else if (field === 'arrayItem' && index !== null) {
        const newData = [...content.data];
        newData[index].imageUrl = res.data.imageUrl;
        setContent(prev => ({ ...prev, data: newData }));
      }
      setMessage('Image uploaded to Cloudinary!');
    } catch (err) {
      setMessage('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('https://b2b-yyfo.onrender.com/api/content', content, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAllContent(prev => ({ ...prev, [content.pageKey]: content }));
      setMessage('Saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error saving');
    }
  };

  const inputStyle = { width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--gray-200)', borderRadius: '8px', outline: 'none' };

  // Helper to render dynamic fields
  const renderDynamicDataFields = () => {
    const key = content.pageKey;
    const data = content.data;

    // Simple string array
    if (['home_about', 'home_process', 'about_story'].includes(key)) {
      return (
        <div style={{ background: 'var(--gray-100)', padding: '1rem', borderRadius: '12px' }}>
          <h4 style={{ marginBottom: '1rem' }}>List Items / Paragraphs</h4>
          {(data || []).map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <textarea rows={2} value={item} onChange={e => {
                const newData = [...data]; newData[i] = e.target.value; setContent({...content, data: newData});
              }} style={{...inputStyle, resize: 'vertical'}} />
              <button type="button" onClick={() => {
                const newData = [...data]; newData.splice(i, 1); setContent({...content, data: newData});
              }} style={{ padding: '0.5rem', color: 'red' }}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => setContent({...content, data: [...(data||[]), 'New Item']})} style={{ padding: '0.5rem 1rem', background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: '6px' }}>+ Add Item</button>
        </div>
      );
    }

    // Object array with icon, title, desc
    if (['home_what_we_do', 'home_why_choose', 'about_values'].includes(key)) {
      return (
        <div style={{ background: 'var(--gray-100)', padding: '1rem', borderRadius: '12px' }}>
          <h4 style={{ marginBottom: '1rem' }}>Features / Services</h4>
          {(data || []).map((item, i) => (
            <div key={i} style={{ background: 'var(--white)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                <div style={{ flex: 1 }}><label style={{fontSize:'0.8rem'}}>Icon (e.g. Zap, Shield)</label><input type="text" value={item.icon || ''} onChange={e => {
                  const newData = [...data]; newData[i].icon = e.target.value; setContent({...content, data: newData});
                }} style={inputStyle} /></div>
                <div style={{ flex: 2 }}><label style={{fontSize:'0.8rem'}}>Title</label><input type="text" value={item.title || ''} onChange={e => {
                  const newData = [...data]; newData[i].title = e.target.value; setContent({...content, data: newData});
                }} style={inputStyle} /></div>
              </div>
              <label style={{fontSize:'0.8rem'}}>Description</label>
              <textarea rows={2} value={item.description || item.desc || ''} onChange={e => {
                const newData = [...data]; newData[i][key === 'home_what_we_do' ? 'description' : 'desc'] = e.target.value; setContent({...content, data: newData});
              }} style={inputStyle} />
              <button type="button" onClick={() => {
                const newData = [...data]; newData.splice(i, 1); setContent({...content, data: newData});
              }} style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.5rem' }}>Remove Feature</button>
            </div>
          ))}
          <button type="button" onClick={() => setContent({...content, data: [...(data||[]), { icon: 'Star', title: 'New', desc: '' }]})} style={{ padding: '0.5rem 1rem', background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: '6px' }}>+ Add Feature</button>
        </div>
      );
    }

    // Object array with image
    if (key === 'home_showcase') {
      return (
        <div style={{ background: 'var(--gray-100)', padding: '1rem', borderRadius: '12px' }}>
          <h4 style={{ marginBottom: '1rem' }}>Showcase Items</h4>
          {(data || []).map((item, i) => (
            <div key={i} style={{ background: 'var(--white)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              {item.imageUrl && <img src={item.imageUrl} alt="preview" style={{ height: '60px', borderRadius: '8px', marginBottom: '0.5rem' }} />}
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{fontSize:'0.8rem', display:'block', marginBottom:'0.25rem'}}>Upload Showcase Image</label>
                <input type="file" onChange={(e) => handleImageUpload(e, 'arrayItem', i)} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                <div style={{ flex: 1 }}><label style={{fontSize:'0.8rem'}}>Title</label><input type="text" value={item.title || ''} onChange={e => {
                  const newData = [...data]; newData[i].title = e.target.value; setContent({...content, data: newData});
                }} style={inputStyle} /></div>
                <div style={{ flex: 1 }}><label style={{fontSize:'0.8rem'}}>Description</label><input type="text" value={item.desc || ''} onChange={e => {
                  const newData = [...data]; newData[i].desc = e.target.value; setContent({...content, data: newData});
                }} style={inputStyle} /></div>
              </div>
              <button type="button" onClick={() => {
                const newData = [...data]; newData.splice(i, 1); setContent({...content, data: newData});
              }} style={{ color: 'red', fontSize: '0.875rem' }}>Remove Item</button>
            </div>
          ))}
          <button type="button" onClick={() => setContent({...content, data: [...(data||[]), { imageUrl: '', title: 'New', desc: '' }]})} style={{ padding: '0.5rem 1rem', background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: '6px' }}>+ Add Showcase Item</button>
        </div>
      );
    }

    if (key === 'home_testimonial') {
      return (
        <div style={{ background: 'var(--gray-100)', padding: '1rem', borderRadius: '12px' }}>
          <h4 style={{ marginBottom: '1rem' }}>Reviewer Info</h4>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}><label style={{fontSize:'0.8rem'}}>Initials</label><input type="text" value={data?.initials || ''} onChange={e => setContent({...content, data: {...data, initials: e.target.value}})} style={inputStyle} /></div>
            <div style={{ flex: 2 }}><label style={{fontSize:'0.8rem'}}>Name</label><input type="text" value={data?.name || ''} onChange={e => setContent({...content, data: {...data, name: e.target.value}})} style={inputStyle} /></div>
            <div style={{ flex: 2 }}><label style={{fontSize:'0.8rem'}}>Role</label><input type="text" value={data?.role || ''} onChange={e => setContent({...content, data: {...data, role: e.target.value}})} style={inputStyle} /></div>
          </div>
        </div>
      );
    }

    if (key === 'about_stats') {
      return (
        <div style={{ background: 'var(--gray-100)', padding: '1rem', borderRadius: '12px' }}>
          <h4 style={{ marginBottom: '1rem' }}>Statistics</h4>
          {(data || []).map((item, i) => (
            <div key={i} style={{ background: 'var(--white)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                <div style={{ flex: 1 }}><label style={{fontSize:'0.8rem'}}>Number</label><input type="number" value={item.end || 0} onChange={e => {
                  const newData = [...data]; newData[i].end = parseInt(e.target.value) || 0; setContent({...content, data: newData});
                }} style={inputStyle} /></div>
                <div style={{ flex: 1 }}><label style={{fontSize:'0.8rem'}}>Suffix (e.g. +, %)</label><input type="text" value={item.suffix || ''} onChange={e => {
                  const newData = [...data]; newData[i].suffix = e.target.value; setContent({...content, data: newData});
                }} style={inputStyle} /></div>
                <div style={{ flex: 2 }}><label style={{fontSize:'0.8rem'}}>Label</label><input type="text" value={item.label || ''} onChange={e => {
                  const newData = [...data]; newData[i].label = e.target.value; setContent({...content, data: newData});
                }} style={inputStyle} /></div>
              </div>
              <button type="button" onClick={() => {
                const newData = [...data]; newData.splice(i, 1); setContent({...content, data: newData});
              }} style={{ color: 'red', fontSize: '0.875rem' }}>Remove Stat</button>
            </div>
          ))}
          <button type="button" onClick={() => setContent({...content, data: [...(data||[]), { end: 0, suffix: '', label: 'New' }]})} style={{ padding: '0.5rem 1rem', background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: '6px' }}>+ Add Stat</button>
        </div>
      );
    }

    if (key === 'services_list') {
      return (
        <div style={{ background: 'var(--gray-100)', padding: '1rem', borderRadius: '12px' }}>
          <h4 style={{ marginBottom: '1rem' }}>Services List</h4>
          {(data || []).map((item, i) => (
            <div key={i} style={{ background: 'var(--white)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              {item.imageUrl && <img src={item.imageUrl} alt="preview" style={{ height: '60px', borderRadius: '8px', marginBottom: '0.5rem' }} />}
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{fontSize:'0.8rem', display:'block', marginBottom:'0.25rem'}}>Upload Service Image</label>
                <input type="file" onChange={(e) => handleImageUpload(e, 'arrayItem', i)} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                <div style={{ flex: 1 }}><label style={{fontSize:'0.8rem'}}>Icon</label><input type="text" value={item.icon || ''} onChange={e => {
                  const newData = [...data]; newData[i].icon = e.target.value; setContent({...content, data: newData});
                }} style={inputStyle} /></div>
                <div style={{ flex: 2 }}><label style={{fontSize:'0.8rem'}}>Title</label><input type="text" value={item.title || ''} onChange={e => {
                  const newData = [...data]; newData[i].title = e.target.value; setContent({...content, data: newData});
                }} style={inputStyle} /></div>
              </div>
              <label style={{fontSize:'0.8rem'}}>Description</label>
              <textarea rows={2} value={item.desc || ''} onChange={e => {
                const newData = [...data]; newData[i].desc = e.target.value; setContent({...content, data: newData});
              }} style={inputStyle} />
              
              <div style={{ marginTop: '1rem', background: 'var(--light)', padding: '1rem', borderRadius: '8px' }}>
                <label style={{fontSize:'0.8rem', fontWeight: 600}}>Features (Comma separated)</label>
                <input type="text" value={(item.features || []).join(', ')} onChange={e => {
                  const newData = [...data]; newData[i].features = e.target.value.split(',').map(s => s.trim()).filter(s => s); setContent({...content, data: newData});
                }} style={inputStyle} placeholder="Feature 1, Feature 2" />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <div><label style={{fontSize:'0.8rem'}}>Reverse Layout</label><input type="checkbox" checked={item.reverse || false} onChange={e => {
                  const newData = [...data]; newData[i].reverse = e.target.checked; setContent({...content, data: newData});
                }} style={{marginLeft: '0.5rem'}} /></div>
              </div>
              
              <button type="button" onClick={() => {
                const newData = [...data]; newData.splice(i, 1); setContent({...content, data: newData});
              }} style={{ color: 'red', fontSize: '0.875rem', marginTop: '1rem' }}>Remove Service</button>
            </div>
          ))}
          <button type="button" onClick={() => setContent({...content, data: [...(data||[]), { id: Date.now().toString(), icon: 'Star', title: 'New', desc: '', features: [], blobClass: 'blob-1', reverse: false, imageUrl: '' }]})} style={{ padding: '0.5rem 1rem', background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: '6px' }}>+ Add Service</button>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <h2 className="h2-title" style={{ marginBottom: '2rem' }}>Manage Page Content</h2>
      <div className="service-card" style={{ maxWidth: '700px' }}>
        {message && <div style={{ background: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: 500 }}>{message}</div>}
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--dark)' }}>Section Key</label>
            <select value={content.pageKey} onChange={handleKeyChange} style={inputStyle}>
              <option value="home_hero">Home - Hero</option>
              <option value="home_about">Home - About</option>
              <option value="home_what_we_do">Home - What We Do</option>
              <option value="home_why_choose">Home - Why Choose Us</option>
              <option value="home_process">Home - Process</option>
              <option value="home_showcase">Home - Showcase</option>
              <option value="home_testimonial">Home - Testimonial</option>
              <option value="home_cta">Home - CTA</option>
              <option value="about_us">About Us - Main</option>
              <option value="about_values">About Us - Values</option>
              <option value="about_story">About Us - Story</option>
              <option value="about_stats">About Us - Stats</option>
              <option value="services_intro">Services - Intro</option>
              <option value="services_list">Services - List</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--dark)' }}>Title</label>
            <input type="text" value={content.title} onChange={e => setContent({...content, title: e.target.value})} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--dark)' }}>Description</label>
            <textarea rows={4} value={content.description} onChange={e => setContent({...content, description: e.target.value})} style={inputStyle} />
          </div>

          {/* Dynamic Image Upload */}
          {['home_about', 'services_intro'].includes(content.pageKey) && (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--dark)' }}>Main Section Image</label>
              {content.imageUrl && <img src={content.imageUrl} alt="preview" style={{ height: '80px', borderRadius: '8px', marginBottom: '0.5rem' }} />}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input type="file" onChange={(e) => handleImageUpload(e, 'main')} />
                {uploading && <span style={{ color: 'var(--primary)' }}>Uploading...</span>}
              </div>
            </div>
          )}

          {/* Dynamic Data Form Builder */}
          {renderDynamicDataFields()}

          <button type="submit" className="btn-primary" style={{ width: 'max-content', padding: '0.75rem 2rem' }}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

const EnquiriesManager = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get('https://b2b-yyfo.onrender.com/api/enquiries', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEnquiries(res.data);
      } catch (err) {}
    };
    fetchEnquiries();
  }, []);

  return (
    <div>
      <h2 className="h2-title" style={{ marginBottom: '2rem' }}>New Enquiries</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {enquiries.length === 0 && <p style={{ color: 'var(--gray-500)' }}>No enquiries received yet.</p>}
        
        {enquiries.map(enq => (
          <div key={enq.id} style={{ 
            background: 'var(--white)', 
            padding: '2rem', 
            borderRadius: '16px', 
            border: '1px solid var(--gray-200)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid var(--gray-100)', paddingBottom: '1rem' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--dark)' }}>{enq.name}</div>
                <div style={{ color: 'var(--primary)', fontWeight: 500 }}>{enq.email}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ background: 'var(--light)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--gray-500)', display: 'inline-block', marginBottom: '0.5rem' }}>
                  Source: {enq.source}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>{new Date(enq.createdAt).toLocaleString()}</div>
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

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState(null);

  const handleEditorChange = useCallback((value) => {
    setForm(prev => ({ ...prev, content: value }));
  }, []);

  const mdeOptions = useMemo(() => ({
    spellChecker: false,
    placeholder: "Write your blog post here. Use markdown for formatting...",
    status: false
  }), []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('https://b2b-yyfo.onrender.com/api/blogs');
      setBlogs(res.data);
    } catch (err) {}
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      if (editId) {
        await axios.put(`https://b2b-yyfo.onrender.com/api/blogs/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage('Blog updated!');
      } else {
        await axios.post('https://b2b-yyfo.onrender.com/api/blogs', form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage('Blog published!');
      }
      setForm({ title: '', content: '' });
      setEditId(null);
      fetchBlogs();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error saving blog');
    }
  };

  const handleEdit = (blog) => {
    setForm({ title: blog.title, content: blog.content });
    setEditId(blog.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`https://b2b-yyfo.onrender.com/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBlogs();
    } catch (err) {}
  };

  const inputStyle = {
    width: '100%', 
    padding: '0.75rem 1rem', 
    border: '1px solid var(--gray-200)', 
    borderRadius: '12px',
    background: 'var(--light)',
    fontFamily: 'var(--font-main)',
    outline: 'none'
  };

  return (
    <div>
      <h2 className="h2-title" style={{ marginBottom: '2rem' }}>Manage Blogs</h2>
      
      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Publish Form */}
        <div className="service-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{editId ? 'Edit Post' : 'Publish New Post'}</h3>
            {editId && (
              <button onClick={() => { setEditId(null); setForm({ title: '', content: '' }); }} style={{ background: 'var(--light)', padding: '0.25rem 0.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600 }}>
                Cancel Edit
              </button>
            )}
          </div>
          {message && <div style={{ background: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: 500 }}>{message}</div>}
          
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--dark)' }}>Blog Title</label>
              <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} style={inputStyle} required />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--dark)' }}>Content (Markdown supported)</label>
              <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--gray-200)', overflow: 'hidden' }}>
                <SimpleMDE 
                  value={form.content} 
                  onChange={handleEditorChange} 
                  options={mdeOptions}
                />
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
              {editId ? 'Update Blog' : 'Publish Blog'}
            </button>
          </form>
        </div>

        {/* Existing Blogs List */}
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Existing Posts</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {blogs.length === 0 && <p style={{ color: 'var(--gray-500)' }}>No blogs published yet.</p>}
            
            {blogs.map(b => (
              <div key={b.id} style={{ 
                background: 'var(--white)', 
                padding: '1.5rem', 
                borderRadius: '16px', 
                border: '1px solid var(--gray-200)',
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--dark)', marginBottom: '0.25rem' }}>{b.title}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>{new Date(b.createdAt).toLocaleDateString()}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleEdit(b)} style={{ color: 'var(--primary)', background: 'var(--light)', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 600, transition: 'all 0.2s' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(b.id)} style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 600, transition: 'all 0.2s' }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminToken'));

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setAuth={setIsAuthenticated} />} />
      <Route path="/" element={isAuthenticated ? <DashboardLayout setAuth={setIsAuthenticated}><PageContentManager /></DashboardLayout> : <Navigate to="/login" />} />
      <Route path="/blogs" element={isAuthenticated ? <DashboardLayout setAuth={setIsAuthenticated}><BlogManager /></DashboardLayout> : <Navigate to="/login" />} />
      <Route path="/enquiries" element={isAuthenticated ? <DashboardLayout setAuth={setIsAuthenticated}><EnquiriesManager /></DashboardLayout> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
