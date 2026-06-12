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
        left: isMobile ? '50%' : '0',
        top: isMobile ? 'auto' : '50%',
        bottom: isMobile ? '1rem' : 'auto',
        transform: isMobile ? 'translateX(-50%)' : 'translateY(-50%)',
        display: 'flex',
        flexDirection: isMobile ? 'row' : 'column',
        gap: '0.75rem',
        padding: isMobile ? '0.75rem 1.5rem' : '1.5rem 0.75rem',
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(12px)',
        borderRadius: isMobile ? '999px' : '0 24px 24px 0',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        zIndex: 9998,
        border: '1px solid rgba(255,255,255,0.4)',
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
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            color: 'var(--primary)',
            background: 'var(--white)',
            transition: 'background-color 0.2s ease, color 0.2s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
        >
          {s.icon}
        </motion.a>
      ))}
    </div>
  );
};

export default SocialSidebar;
