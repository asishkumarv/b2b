import React from 'react';
import { Link } from 'react-router-dom';
import b2bLogo from '../assets/b2b-logo.jpeg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Column 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <img src={b2bLogo} alt="B2B Logo" style={{ height: '40px', width: 'auto', borderRadius: '8px' }} />
            </div>
            <p style={{ color: 'var(--gray-500)', lineHeight: '1.6', maxWidth: '300px' }}>
              Crafting digital experiences for modern businesses — apps, websites & e-commerce.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '1.5rem', color: 'var(--dark)' }}>Explore</h4>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/about" className="footer-link">About Us</Link>
              <Link to="/services" className="footer-link">Services</Link>
              <Link to="/contact" className="footer-link">Contact Us</Link>
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '1.5rem', color: 'var(--dark)' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', color: 'var(--gray-500)', gap: '0.75rem' }}>
              <span>b2bwebsolutionstech@gmail.com</span>
              <span>+91 7801090179</span>
            </div>
          </div>

        </div>

        <div style={{ 
          borderTop: '1px solid var(--gray-200)', 
          paddingTop: '2rem', 
          textAlign: 'center',
          color: 'var(--gray-500)',
          fontSize: '0.875rem'
        }}>
          © {new Date().getFullYear()} B2B Web Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;