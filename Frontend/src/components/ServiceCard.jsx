import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div 
      className="service-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <div className="icon-wrapper">
        {icon}
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--gray-500)', lineHeight: '1.6', marginBottom: '2rem' }}>
        {description}
      </p>
      
      <Link to="/services" style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        color: 'var(--primary)', 
        fontWeight: 600,
        gap: '0.5rem',
        transition: 'gap 0.2s'
      }} className="learn-more-link">
        Learn more <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
};

export default ServiceCard;