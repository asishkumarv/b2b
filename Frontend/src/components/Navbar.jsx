import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Monitor, Smartphone, Globe, Briefcase, Server, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import b2bLogo from '../assets/b2b-logo.jpeg';
import { servicesData } from '../data/servicesData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  // Group services by category for the mega menu
  const categories = ['Website development', 'Ecommerce Development', 'Mobile app development', 'Enterprise Development'];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { 
      name: 'Services', 
      path: '/services',
      hasMegaMenu: true 
    },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  // Helper icon component for mega menu categories
  const CategoryIcon = ({ category }) => {
    switch(category) {
      case 'Website development': return <Monitor size={20} color="var(--primary)" />;
      case 'Ecommerce Development': return <Globe size={20} color="var(--primary)" />;
      case 'Mobile app development': return <Smartphone size={20} color="var(--primary)" />;
      case 'Enterprise Development': return <Briefcase size={20} color="var(--primary)" />;
      default: return <Code size={20} color="var(--primary)" />;
    }
  };

  return (
    <>
    <nav className="glass-nav" style={{ padding: '1rem 0' }}>
      <div className="container" style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <img src={b2bLogo} alt="B2B Logo" style={{ height: '40px', width: 'auto', borderRadius: '8px' }} />
          <div className="navbar-brand-text">
            <span className="brand-bold">B2B</span>
            <span className="brand-light">web solutions</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              style={{ position: link.hasMegaMenu ? 'static' : 'relative' }}
              onMouseEnter={() => setHoveredItem(link.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link 
                to={link.path}
                style={{ 
                  fontWeight: 500, 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: isActive(link.path) ? 'var(--primary)' : 'var(--gray-500)',
                  transition: 'color 0.2s',
                  padding: '10px 0'
                }}
              >
                {link.name}
                {link.hasMegaMenu && <ChevronDown size={16} />}
              </Link>

              {/* Massive Mega Menu Dropdown */}
              {link.hasMegaMenu && (
                <AnimatePresence>
                  {hoveredItem === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        right: '0',
                        marginTop: '1rem',
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(20px)',
                        padding: '2.5rem',
                        borderRadius: '24px',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.15)',
                        border: '1px solid rgba(226, 232, 240, 0.8)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '3rem',
                        width: '100%',
                        zIndex: 100
                      }}
                    >
                      {categories.map(category => (
                        <div key={category} style={{ display: 'flex', flexDirection: 'column' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid var(--gray-100)' }}>
                            <div style={{ background: 'var(--primary-light)', padding: '0.5rem', borderRadius: '8px', color: 'white', display: 'flex', alignItems: 'center' }}>
                              <CategoryIcon category={category} />
                            </div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--dark)' }}>{category}</h3>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {servicesData.filter(s => s.category === category).map(service => (
                              <Link 
                                key={service.slug}
                                to={`/services/${service.slug}`}
                                className="dropdown-item"
                                onClick={() => setHoveredItem(null)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.75rem',
                                  padding: '0.5rem',
                                  borderRadius: '8px',
                                  color: 'var(--gray-500)',
                                  fontWeight: 500,
                                  fontSize: '0.95rem',
                                  transition: 'all 0.2s',
                                  textDecoration: 'none'
                                }}
                              >
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gray-200)', display: 'inline-block' }}></span>
                                {service.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          <Link to="/contact" className="btn-primary">
            Get a Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>
    </nav>

    {/* Mobile Menu Overlay */}
    {isOpen && (
      <div className="mobile-nav-overlay" style={{ position: 'fixed', top: '70px', left: 0, right: 0, bottom: 0, background: 'white', zIndex: 99, padding: '2rem', overflowY: 'auto' }}>
        {navLinks.map((link) => (
          <div key={link.name} style={{ marginBottom: '1rem' }}>
            {link.hasMegaMenu ? (
              <div 
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                style={{ 
                  fontSize: '1.1rem',
                  fontWeight: 600, 
                  color: isActive(link.path) ? 'var(--primary)' : 'var(--dark)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0',
                  cursor: 'pointer'
                }}
              >
                {link.name}
                <ChevronDown size={20} style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
              </div>
            ) : (
              <Link 
                to={link.path}
                onClick={() => setIsOpen(false)}
                style={{ 
                  fontSize: '1.1rem',
                  fontWeight: 600, 
                  color: isActive(link.path) ? 'var(--primary)' : 'var(--dark)',
                  display: 'block',
                  marginBottom: '0',
                  textDecoration: 'none'
                }}
              >
                {link.name}
              </Link>
            )}
            
            {/* Mobile Dropdown Options */}
            <AnimatePresence>
              {link.hasMegaMenu && mobileServicesOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                {categories.map(category => (
                  <div key={category}>
                    <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '0.75rem', fontSize: '1rem' }}>{category}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '0.5rem' }}>
                      {servicesData.filter(s => s.category === category).map(sub => (
                        <Link 
                          key={sub.slug} 
                          to={`/services/${sub.slug}`}
                          onClick={() => setIsOpen(false)}
                          style={{ color: 'var(--gray-500)', fontSize: '0.95rem', textDecoration: 'none' }}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        <Link to="/contact" onClick={() => setIsOpen(false)} className="btn-primary" style={{ marginTop: '1rem', width: '100%', textAlign: 'center', display: 'block', padding: '1rem' }}>
          Get a Quote
        </Link>
      </div>
    )}
    </>
  );
};

export default Navbar;