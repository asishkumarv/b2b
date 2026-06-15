import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Zap, Users, Smartphone, Globe, ShoppingBag, Shield, Terminal, Star, CheckCircle } from 'lucide-react';
import Counter from '../components/Counter';
import SEO from '../components/SEO';

import { usePageContent } from '../hooks/usePageContent';

const IconMap = {
  Smartphone: <Smartphone size={24} />,
  Globe: <Globe size={24} />,
  ShoppingBag: <ShoppingBag size={24} />,
  Zap: <Zap size={24} />,
  Shield: <Shield size={24} />,
  Terminal: <Terminal size={24} />,
  Target: <Target size={24} />,
  Heart: <Heart size={24} />,
  Users: <Users size={24} />,
  Star: <Star size={24} />,
  CheckCircle: <CheckCircle size={24} />
};

const About = () => {
  const content = usePageContent('about_us', '', '');
  const contentValues = usePageContent('about_values', '', '', []);
  const contentStory = usePageContent('about_story', '', '', []);
  const contentStats = usePageContent('about_stats', '', '', []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: '100px' }}
    >
      <SEO 
        title="About Us | B2B Web Solutions" 
        description="Learn about our digital studio, our story, and our mission to help businesses launch apps, websites, and e-commerce experiences."
      />
      <section className="section-padding" style={{ textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>About Us</div>
            <h1 className="h1-title" style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
              {content.title}
            </h1>
            <p style={{ color: 'var(--gray-500)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
              {content.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {Array.isArray(contentValues.data) && contentValues.data.map((val, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ padding: '2rem', border: '1px solid var(--gray-100)', borderRadius: '24px', background: 'var(--light)' }}
              >
                <div className="icon-wrapper-light">{IconMap[val.icon] || <Target size={24} />}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>{val.title}</h3>
                <p style={{ color: 'var(--gray-500)', lineHeight: 1.6 }}>{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ background: '#f4f0ff', padding: '4rem', borderRadius: '32px', maxWidth: '900px', margin: '0 auto' }}
          >
            <h2 className="h2-title" style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>{contentStory.title}</h2>
            {Array.isArray(contentStory.data) && contentStory.data.map((para, idx) => (
              <p key={idx} style={{ fontSize: '1.125rem', color: 'var(--gray-500)', lineHeight: 1.8, marginBottom: idx !== contentStory.data.length - 1 ? '1.5rem' : '0' }}>
                {para}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-3">
            {Array.isArray(contentStats.data) && contentStats.data.map((stat, idx) => (
              <Counter key={idx} end={stat.end} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;