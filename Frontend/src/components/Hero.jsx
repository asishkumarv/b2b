import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePageContent } from '../hooks/usePageContent';

const Hero = () => {
  const content = usePageContent('home_hero', 'Build the future of your business online.', 'We design and engineer mobile apps, websites, and e-commerce platforms that help modern brands grow.');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="hero-section">
      <div className="dot-pattern"></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
        >
          <motion.div variants={itemVariants} style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            background: 'rgba(255,255,255,0.1)', 
            padding: '0.5rem 1rem', 
            borderRadius: '9999px',
            marginBottom: '2rem',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>✨ Digital studio for B2B brands</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="h1-title" style={{ marginBottom: '1.5rem' }}>
            {content.title}
          </motion.h1>

          <motion.p variants={itemVariants} style={{ 
            fontSize: '1.25rem', 
            color: 'rgba(255,255,255,0.8)', 
            marginBottom: '3rem',
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            {content.description}
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services" className="btn-primary" style={{ background: 'white', color: 'var(--primary)' }}>
              Explore Services
            </Link>
            <Link to="/contact" className="btn-outline">
              Start a project <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;