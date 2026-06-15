import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

export const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', imageUrl: '' });
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.post('https://api.b2bwebsolutions.com/api/upload', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}` 
        }
      });
      setForm(prev => ({ ...prev, imageUrl: res.data.imageUrl }));
    } catch (err) {
      alert("Failed to upload image. Please try a smaller image or check network.");
    } finally {
      setUploading(false);
    }
  };

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
      const res = await axios.get('https://api.b2bwebsolutions.com/api/blogs');
      setBlogs(res.data);
    } catch (err) {}
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      if (editId) {
        await axios.put(`https://api.b2bwebsolutions.com/api/blogs/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage('Blog updated!');
      } else {
        await axios.post('https://api.b2bwebsolutions.com/api/blogs', form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage('Blog published!');
      }
      setForm({ title: '', content: '', imageUrl: '' });
      setEditId(null);
      fetchBlogs();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error saving blog');
    }
  };

  const handleEdit = (blog) => {
    setForm({ title: blog.title, content: blog.content, imageUrl: blog.imageUrl || '' });
    setEditId(blog.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`https://api.b2bwebsolutions.com/api/blogs/${id}`, {
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
              <button onClick={() => { setEditId(null); setForm({ title: '', content: '', imageUrl: '' }); }} style={{ background: 'var(--light)', padding: '0.25rem 0.75rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600 }}>
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
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--dark)' }}>Thumbnail / Header Image URL</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input type="text" placeholder="https://example.com/image.jpg" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} style={{ ...inputStyle, flex: 1 }} />
                <span style={{ fontWeight: 600, color: 'var(--gray-500)' }}>OR</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ flex: 1 }} />
              </div>
              {uploading && <div style={{ fontSize: '0.875rem', color: 'var(--primary)', marginTop: '0.5rem', fontWeight: 600 }}>Uploading image... Please wait.</div>}
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
              <div key={b.id} className="flex-mobile-col" style={{ 
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
