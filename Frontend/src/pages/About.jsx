import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Zap, Users } from 'lucide-react';
import Counter from '../components/Counter';
import SEO from '../components/SEO';

import { usePageContent } from '../hooks/usePageContent';

const IconMap = {
  Target: <Target size={24} />,
  Heart: <Heart size={24} />,
  Zap: <Zap size={24} />,
  Users: <Users size={24} />
};

const About = () => {
  const content = usePageContent('about_us', 'A studio that ships real product.', 'B2B Web Solutions is a digital studio helping businesses launch apps, websites, and e-commerce experiences that feel inevitable.');
  const contentValues = usePageContent('about_values', 'Our Values', 'What drives us forward.', [
    { icon: 'Target', title: 'Outcome-driven', desc: 'We measure success by what your product achieves, not what we ship.' },
    { icon: 'Heart', title: 'Craft first', desc: 'Every pixel, animation, and line of code is treated with care.' },
    { icon: 'Zap', title: 'Move fast', desc: 'Tight feedback loops, weekly releases, no bureaucracy.' },
    { icon: 'Users', title: 'True partners', desc: 'We embed with your team and stay long after launch.' }
  ]);
  const contentStory = usePageContent('about_story', 'Our story', 'The journey of B2B Web Solutions.', [
    'We started B2B Web Solutions to fill the gap between freelance hustle and enterprise agency overhead. Our team partners with founders and product leaders to turn ambitious ideas into shipped software — on time, on budget, and beautifully built.',
    'From a one-screen prototype to a fully featured cross-platform product, we work end-to-end across design, mobile, web, and commerce.'
  ]);
  const contentStats = usePageContent('about_stats', 'By the numbers', 'Our impact in numbers.', [
    { end: 60, suffix: '+', label: 'Products shipped' },
    { end: 12, suffix: '', label: 'Industries served' },
    { end: 98, suffix: '%', label: 'Client retention' }
  ]);

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