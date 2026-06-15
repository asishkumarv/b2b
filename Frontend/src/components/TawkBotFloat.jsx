import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TawkBotFloat = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (window.Tawk_API) {
      // Show the widget first
      window.Tawk_API.showWidget();
      
      // Add a small delay to allow Tawk.to to re-calculate its DOM dimensions 
      // before maximizing. This prevents the "full screen" fallback bug.
      setTimeout(() => {
        window.Tawk_API.maximize();
      }, 150);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'fixed',
        bottom: '120px',
        right: '2rem',
        width: '64px',
        height: '64px',
        background: 'linear-gradient(135deg, #1e1b4b, #4c1d95)', // Cyber purple gradient
        border: '2px solid #a78bfa',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 15px rgba(167, 139, 250, 0.5), inset 0 0 10px rgba(167, 139, 250, 0.3)',
        zIndex: 9999,
        cursor: 'pointer',
        outline: 'none',
        overflow: 'visible'
      }}
      aria-label="Chat with our AI Bot"
    >
      {/* Outer rotating cyber ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          top: -6,
          left: -6,
          right: -6,
          bottom: -6,
          border: '2px dashed rgba(167, 139, 250, 0.6)',
          borderRadius: '50%',
          zIndex: -1
        }}
      />
      
      {/* Bot Icon with floating animation */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'relative' }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="40" 
          height="40" 
          viewBox="0 0 100 100" 
          fill="none" 
        >
          {/* Antenna Base */}
          <line x1="50" y1="20" x2="50" y2="6" stroke="#a78bfa" strokeWidth="4" strokeLinecap="round" />
          
          {/* Antenna Glowing Ball */}
          <motion.circle 
            cx="50" cy="6" r="5" fill="#38bdf8" 
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: 'drop-shadow(0px 0px 4px #38bdf8)' }}
          />
          
          {/* Cyber Ears */}
          <rect x="12" y="44" width="8" height="22" rx="4" fill="#7c3aed" />
          <rect x="80" y="44" width="8" height="22" rx="4" fill="#7c3aed" />

          {/* Main Head Casing */}
          <rect x="20" y="24" width="60" height="62" rx="14" fill="#2e1065" stroke="#a78bfa" strokeWidth="4" />

          {/* Dark Glass Visor */}
          <rect x="28" y="36" width="44" height="24" rx="6" fill="#0f172a" stroke="#4c1d95" strokeWidth="2" />

          {/* Left Glowing Eye (Blinking) */}
          <motion.rect 
            x="34" y="43" width="10" height="10" rx="3" fill="#38bdf8"
            style={{ filter: 'drop-shadow(0px 0px 5px #38bdf8)', originY: 0.5, originX: 0.5 }}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: [1, 0.2, 1, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.5, 1] }}
          />
          
          {/* Right Glowing Eye (Blinking) */}
          <motion.rect 
            x="56" y="43" width="10" height="10" rx="3" fill="#38bdf8"
            style={{ filter: 'drop-shadow(0px 0px 5px #38bdf8)', originY: 0.5, originX: 0.5 }}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: [1, 0.2, 1, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.5, 1] }}
          />

          {/* Voice Visualizer / Mouth Grid */}
          <motion.g
            initial={{ opacity: 0.3 }}
            animate={{ opacity: isHovered ? [0.4, 1, 0.4] : 0.3 }}
            transition={isHovered ? { duration: 0.3, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
          >
            <rect x="36" y="72" width="6" height="4" rx="2" fill="#a78bfa" />
            <rect x="44" y="72" width="12" height="4" rx="2" fill="#a78bfa" />
            <rect x="58" y="72" width="6" height="4" rx="2" fill="#a78bfa" />
          </motion.g>
        </svg>
      </motion.div>
    </motion.button>
  );
};

export default TawkBotFloat;
