import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsContentLoading } from '../hooks/usePageContent';

const AnimatedLoader = () => {
  const isLoading = useIsContentLoading();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#0a0a0f',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.2, 
                  delay: i * 0.2,
                  ease: "easeInOut" 
                }}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: i === 1 ? 'var(--secondary)' : 'var(--primary)',
                  boxShadow: `0 0 24px ${i === 1 ? 'var(--secondary)' : 'var(--primary)'}`
                }}
              />
            ))}
          </div>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            style={{ 
              color: 'white', 
              fontSize: '1rem', 
              letterSpacing: '0.4em', 
              fontWeight: 600,
              textTransform: 'uppercase',
              fontFamily: 'sans-serif'
            }}
          >
            Loading the Website...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedLoader;
