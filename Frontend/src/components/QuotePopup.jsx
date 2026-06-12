import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import axios from 'axios';

const QuotePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '', source: 'Popup Form' });
  const [status, setStatus] = useState('');

  const location = useLocation();

  useEffect(() => {
    // Hide popup immediately on navigation
    setIsVisible(false);
    
    // Delay popup by 3 seconds on every page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      await axios.post('https://b2b-yyfo.onrender.com/api/enquiries', form);
      setStatus('Message sent successfully!');
      setTimeout(() => setIsVisible(false), 2000);
    } catch (err) {
      console.error(err);
      setStatus('Failed to send message.');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            style={{
              background: 'var(--white)',
              borderRadius: '24px',
              padding: '2.5rem',
              width: '100%',
              maxWidth: '450px',
              position: 'relative',
              boxShadow: '0 24px 48px rgba(0,0,0,0.2)'
            }}
          >
            <button 
              onClick={() => setIsVisible(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', color: 'var(--gray-500)', padding: '0.5rem', borderRadius: '50%' }}
            >
              <X size={24} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 className="h2-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Get a Quote</h2>
              <p style={{ color: 'var(--gray-500)' }}>Tell us about your project and we'll reply within 24 hours.</p>
            </div>

            {status === 'Message sent successfully!' ? (
              <div style={{ textAlign: 'center', color: '#16a34a', fontWeight: 600, padding: '2rem 0' }}>
                {status}
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--dark)' }}>Full Name</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--gray-200)', outline: 'none' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--dark)' }}>Email Address</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--gray-200)', outline: 'none' }} required />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--dark)' }}>Message</label>
                  <textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--gray-200)', outline: 'none', resize: 'vertical' }} required />
                </div>
                {status && <div style={{ color: '#dc2626', fontSize: '0.875rem', textAlign: 'center' }}>{status}</div>}
                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}>
                  Request Quote
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuotePopup;
