import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import axios from 'axios';
import SEO from '../components/SEO';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', source: 'Contact Form' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      await axios.post('https://api.b2bwebsolutions.com/api/enquiries', form);
      setStatus('Message sent successfully!');
      setForm({ name: '', email: '', phone: '', message: '', source: 'Contact Form' });
      setTimeout(() => setStatus(''), 4000);
    } catch (err) {
      console.error(err);
      setStatus('Failed to send message. Please try again later.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <SEO 
        title="Contact Us | B2B Web Solutions" 
        description="Get in touch with B2B Web Solutions. Start a conversation about your custom software, mobile app, or e-commerce development project today."
      />
      <section className="section-padding" style={{ flex: 1, position: 'relative' }}>
        <div className="blob blob-1" style={{ top: '10%', right: '10%' }}></div>
        <div className="blob blob-2" style={{ bottom: '10%', left: '10%' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h1-title" style={{ marginBottom: '1rem' }}>
              Let's start a <span className="text-gradient">conversation.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ color: 'var(--gray-500)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
              Ready to transform your business? Fill out the form and our team will get back to you within 24 hours.
            </motion.p>
          </div>

          <div className="grid-2" style={{ alignItems: 'flex-start', maxWidth: '1000px', margin: '0 auto' }}>
            
            {/* Contact Details */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ background: 'var(--primary)', color: 'white', padding: '3rem', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}
            >
              <div className="dot-pattern"></div>
              <div style={{ position: 'relative', zIndex: 10 }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem' }}>Contact Information</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <Mail size={24} style={{ color: 'var(--accent)' }} />
                    <div>
                      <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Email Us</div>
                      <div style={{ color: 'rgba(255,255,255,0.8)' }}>b2bwebsolutionstech@gmail.com</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <Phone size={24} style={{ color: 'var(--accent)' }} />
                    <div>
                      <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Call Us</div>
                      <div style={{ color: 'rgba(255,255,255,0.8)' }}>+91 7801090179</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <MapPin size={24} style={{ color: 'var(--accent)' }} />
                    <div>
                      <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>Headquarters</div>
                      <div style={{ color: 'rgba(255,255,255,0.8)' }}>123 Innovation Drive<br/>Tech District, SF 94103</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ background: 'var(--white)', padding: '3rem', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', border: '1px solid var(--gray-100)' }}
            >
              {status && (
                <div style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: '12px', textAlign: 'center', fontWeight: 600, background: status.includes('success') ? '#dcfce7' : '#fee2e2', color: status.includes('success') ? '#166534' : '#991b1b' }}>
                  {status}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontWeight: 500, color: 'var(--dark)' }}>Full Name</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Doe" style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--gray-200)', background: 'var(--light)', outline: 'none', fontFamily: 'inherit' }} required />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontWeight: 500, color: 'var(--dark)' }}>Email Address</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="john@company.com" style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--gray-200)', background: 'var(--light)', outline: 'none', fontFamily: 'inherit' }} required />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontWeight: 500, color: 'var(--dark)' }}>Phone Number</label>
                  <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+1 (555) 000-0000" style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--gray-200)', background: 'var(--light)', outline: 'none', fontFamily: 'inherit' }} />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontWeight: 500, color: 'var(--dark)' }}>Message</label>
                  <textarea rows="4" value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell us about your project goals..." style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--gray-200)', background: 'var(--light)', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }} required></textarea>
                </div>
                
                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem', fontSize: '1rem' }}>
                  Send Message
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;