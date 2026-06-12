import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

const SocialSidebar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const socials = [
    { icon: <Instagram size={20} />, url: 'https://instagram.com', color: '#E1306C' },
    { icon: <Facebook size={20} />, url: 'https://facebook.com', color: '#1877F2' },
    { icon: <Linkedin size={20} />, url: 'https://linkedin.com', color: '#0A66C2' },
    { icon: <Twitter size={20} />, url: 'https://twitter.com', color: '#1DA1F2' }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: '80%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '0.5rem' : '0.75rem',
        padding: isMobile ? '1rem 0.5rem' : '1.5rem 0.75rem',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(4px)',
        borderRadius: '0 24px 24px 0',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        zIndex: 9998,
        border: '1px solid rgba(255,255,255,0.2)',
        borderLeft: 'none'
      }}
    >
      {socials.map((s, i) => (
        <motion.a
          key={i}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15, backgroundColor: s.color, color: '#fff' }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: isMobile ? '36px' : '44px',
            height: isMobile ? '36px' : '44px',
            borderRadius: '50%',
            color: 'var(--primary)',
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(4px)',
            transition: 'background-color 0.2s ease, color 0.2s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
        >
          {React.cloneElement(s.icon, { size: isMobile ? 16 : 20 })}
        </motion.a>
      ))}
    </div>
  );
};

export default SocialSidebar;
