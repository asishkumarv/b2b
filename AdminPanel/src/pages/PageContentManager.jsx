import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, CheckCircle } from 'lucide-react';

export const PageContentManager = () => {
  const [content, setContent] = useState({ pageKey: 'home_hero', title: '', description: '', imageUrl: '', data: null });
  const [allContent, setAllContent] = useState({});
  const [uploading, setUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get('https://api.b2bwebsolutions.com/api/content');
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
      if (['home_about', 'about_story'].includes(newKey)) initData = [];
      if (['home_showcase', 'home_process'].includes(newKey)) initData = [];
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
      const res = await axios.post('https://api.b2bwebsolutions.com/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      });
      
      if (field === 'main') {
        setContent(prev => ({ ...prev, imageUrl: res.data.imageUrl }));
      } else if (field === 'arrayItem' && index !== null) {
        const newData = [...content.data];
        if (typeof newData[index] === 'string') {
          newData[index] = { title: newData[index], desc: '', imageUrl: '' };
        }
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
    setIsSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('https://api.b2bwebsolutions.com/api/content', content, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAllContent(prev => ({ ...prev, [content.pageKey]: content }));
      setIsSaving(false);
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 2500);
    } catch (err) {
      setIsSaving(false);
      alert('Error saving content. Please try again.');
    }
  };

  const inputStyle = { width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--gray-200)', borderRadius: '8px', outline: 'none' };

  // Helper to render dynamic fields
  const renderDynamicDataFields = () => {
    const key = content.pageKey;
    const data = content.data;

    // Simple string array
    if (['home_about', 'about_story'].includes(key)) {
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
    if (['home_showcase', 'home_process'].includes(key)) {
      return (
        <div style={{ background: 'var(--gray-100)', padding: '1rem', borderRadius: '12px' }}>
          <h4 style={{ marginBottom: '1rem' }}>{key === 'home_process' ? 'Process Steps' : 'Showcase Items'}</h4>
          {(data || []).map((rawItem, i) => {
            const item = typeof rawItem === 'string' ? { title: rawItem, desc: '', imageUrl: '' } : rawItem;
            return (
            <div key={i} style={{ background: 'var(--white)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              {item.imageUrl && <img src={item.imageUrl} alt="preview" style={{ height: '60px', borderRadius: '8px', marginBottom: '0.5rem' }} />}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{fontSize:'0.8rem', display:'block', marginBottom:'0.25rem', fontWeight: 600}}>Image URL or Upload Image</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input type="text" value={item.imageUrl || ''} onChange={e => {
                    const newData = [...data]; 
                    newData[i] = { ...item, imageUrl: e.target.value }; 
                    setContent({...content, data: newData});
                  }} placeholder="https://..." style={{ ...inputStyle, flex: 1, padding: '0.5rem' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>OR</span>
                  <input type="file" onChange={(e) => handleImageUpload(e, 'arrayItem', i)} style={{ flex: 1 }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                <div style={{ flex: 1 }}><label style={{fontSize:'0.8rem'}}>Title (e.g. Step 1: Design)</label><input type="text" value={item.title || ''} onChange={e => {
                  const newData = [...data]; 
                  newData[i] = { ...item, title: e.target.value }; 
                  setContent({...content, data: newData});
                }} style={inputStyle} /></div>
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{fontSize:'0.8rem'}}>Detailed Description</label>
                <textarea rows={3} value={item.desc || item.description || ''} onChange={e => {
                  const newData = [...data]; 
                  newData[i] = { ...item, desc: e.target.value, description: e.target.value }; 
                  setContent({...content, data: newData});
                }} style={{...inputStyle, resize: 'vertical'}} />
              </div>
              <button type="button" onClick={() => {
                const newData = [...data]; newData.splice(i, 1); setContent({...content, data: newData});
              }} style={{ color: 'red', fontSize: '0.875rem', fontWeight: 600 }}>Remove Item</button>
            </div>
          )})}
          <button type="button" onClick={() => setContent({...content, data: [...(data||[]), { imageUrl: '', title: 'New Step', desc: '' }]})} style={{ padding: '0.5rem 1rem', background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: '6px', fontWeight: 600 }}>+ Add {key === 'home_process' ? 'Process Step' : 'Showcase Item'}</button>
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
      
      {/* Loading & Success Overlay */}
      {(isSaving || showSuccessPopup) && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: 'white', padding: '2.5rem 3rem', borderRadius: '16px',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            transform: 'translateY(-20px)'
          }}>
            {isSaving ? (
              <>
                <Loader2 size={48} color="var(--primary)" style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
                <h3 style={{ margin: 0, color: 'var(--dark)' }}>Saving Changes...</h3>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
              </>
            ) : (
              <>
                <CheckCircle size={56} color="#10b981" style={{ marginBottom: '1rem' }} />
                <h3 style={{ margin: 0, color: '#10b981' }}>Saved Successfully!</h3>
                <p style={{ margin: '0.5rem 0 0', color: 'var(--gray-500)', fontSize: '0.9rem' }}>The page has been updated.</p>
              </>
            )}
          </div>
        </div>
      )}

      <div className="service-card" style={{ maxWidth: '700px' }}>
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
