import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Globe, ShoppingBag, CheckCircle, Zap, Shield, Terminal, Target, Heart, Users, Star, Settings, Clock, MessageSquare, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import appDevIllustration from '../assets/app_dev_illustration.png';
import webDevIllustration from '../assets/web_dev_illustration.png';
import ecommerceDevIllustration from '../assets/ecommerce_dev_illustration.png';
import { usePageContent } from '../hooks/usePageContent';

const IconMap = {
  Smartphone: <Smartphone size={32} />,
  Globe: <Globe size={32} />,
  ShoppingBag: <ShoppingBag size={32} />,
  Zap: <Zap size={32} />,
  Shield: <Shield size={32} />,
  Terminal: <Terminal size={32} />,
  Target: <Target size={32} />,
  Heart: <Heart size={32} />,
  Users: <Users size={32} />,
  Star: <Star size={32} />,
  CheckCircle: <CheckCircle size={32} />,
  Settings: <Settings size={32} />,
  Clock: <Clock size={32} />,
  MessageSquare: <MessageSquare size={32} />,
  LifeBuoy: <LifeBuoy size={32} />
};

const Services = () => {
  const content = usePageContent('services_intro', '', '');
  const contentList = usePageContent('services_list', '', '', []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: '100px', overflow: 'hidden' }}
    >
      <SEO 
        title="Our Services | B2B Web Solutions" 
        description="Comprehensive digital solutions including native mobile app development, custom web applications, e-commerce stores, and software architecture."
      />
      <section className="section-padding" style={{ textAlign: 'center', position: 'relative' }}>
        <div className="blob blob-1" style={{ top: '-20%', left: '10%' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h1-title" style={{ marginBottom: '1.5rem' }}>
            {content.title.split(' ')[0]} <span className="text-gradient">{content.title.split(' ').slice(1).join(' ')}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ color: 'var(--gray-500)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
            {content.description}
          </motion.p>
        </div>
      </section>

      <section style={{ paddingBottom: '6rem' }}>
        <div className="container">
          {Array.isArray(contentList.data) && contentList.data.map((service, idx) => (
            <motion.div 
              key={service.id || idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              style={{ 
                display: 'flex', 
                flexDirection: service.reverse ? 'row-reverse' : 'row',
                alignItems: 'center',
                gap: '4rem',
                marginBottom: '6rem',
                position: 'relative'
              }}
              className="service-row"
            >
              <div className={`blob ${service.blobClass || 'blob-1'}`} style={{ opacity: 0.2 }}></div>
              
              <div style={{ flex: 1, position: 'relative', zIndex: 10 }}>
                <div className="icon-wrapper" style={{ width: '64px', height: '64px' }}>
                  {IconMap[service.icon] || <Globe size={32} />}
                </div>
                <h2 className="h2-title" style={{ marginBottom: '1rem' }}>{service.title}</h2>
                <p style={{ color: 'var(--gray-500)', fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                  {service.desc}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem' }}>
                  {(service.features || []).map((feature, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: 500, color: 'var(--dark)' }}>
                      <CheckCircle size={20} color="var(--primary)" /> {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn-primary" style={{ display: 'inline-flex' }}>
                  Start a Project
                </Link>
              </div>

              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{ background: 'var(--light)', borderRadius: '32px', padding: '2rem', position: 'relative' }}>
                  <img src={service.imageUrl || appDevIllustration} alt={service.title} className="img-responsive floating" style={{ borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Media query for responsive rows added inline */}
      <style>{`
        @media (max-width: 900px) {
          .service-row {
            flex-direction: column !important;
            gap: 2rem !important;
            text-align: center;
          }
          .service-row ul {
            display: inline-block;
            text-align: left;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Services;