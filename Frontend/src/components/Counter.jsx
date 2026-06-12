import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const Counter = ({ end, suffix = '', label }) => {
  return (
    <motion.div 
      style={{ textAlign: 'center', padding: '2rem', background: 'var(--white)', borderRadius: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid var(--gray-100)' }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>
        <CountUp end={end} duration={2.5} enableScrollSpy scrollSpyOnce />
        {suffix}
      </div>
      <div style={{ color: 'var(--gray-500)', fontWeight: 500 }}>
        {label}
      </div>
    </motion.div>
  );
};

export default Counter;
