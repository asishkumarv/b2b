import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TawkBotFloat = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (window.Tawk_API && window.Tawk_API.maximize) {
      window.Tawk_API.showWidget();
      window.Tawk_API.maximize();
    } else {
      // Create global Tawk API object if it doesn't exist
      window.Tawk_API = window.Tawk_API || {};
      
      // Tell Tawk to maximize as soon as it finishes loading
      window.Tawk_API.onLoad = function() {
        window.Tawk_API.maximize();
      };

      // When the user minimizes/closes the chat, hide the Tawk widget completely
      window.Tawk_API.onChatMinimized = function() {
        window.Tawk_API.hideWidget();
      };

      // Dynamically inject the script so nothing loads until clicked
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/6a2f9f8c17984b1d3de8c98e/1jr50efaa';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      if (s0 && s0.parentNode) {
        s0.parentNode.insertBefore(s1, s0);
      } else {
        document.head.appendChild(s1);
      }
    }
  };

  const text = "Any help?";
  const letters = text.split("");

  return (
    <div style={{ position: 'fixed', bottom: '120px', right: '2rem', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '1rem' }}>
      
      {/* Animated Text Bubble */}
      <AnimatePresence>
        {!isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 2 }} // Wait 2s before showing initially
            style={{
              background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(76, 29, 149, 0.8))',
              backdropFilter: 'blur(8px)',
              padding: '0.5rem 1rem',
              borderRadius: '20px 20px 0px 20px', // Speech bubble shape
              border: '1px solid rgba(167, 139, 250, 0.3)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              gap: '2px',
              position: 'relative'
            }}
          >
            {/* Little triangle for speech bubble pointing to the bot */}
            <div style={{
              position: 'absolute',
              bottom: '-1px',
              right: '-10px',
              width: 0,
              height: 0,
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              borderLeft: '10px solid rgba(76, 29, 149, 0.8)',
            }} />
            
            {/* Wavy Animated Letters */}
            {letters.map((char, index) => (
              <motion.span
                key={index}
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.1, // Stagger effect
                  ease: "easeInOut"
                }}
                style={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'inline-block',
                  whiteSpace: char === " " ? "pre" : "normal"
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* TawkBot Button */}
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
          position: 'relative', // Changed from fixed
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, #1e1b4b, #4c1d95)', // Cyber purple gradient
          border: '2px solid #a78bfa',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(167, 139, 250, 0.5), inset 0 0 10px rgba(167, 139, 250, 0.3)',
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
    </div>
  );
};

export default TawkBotFloat;
