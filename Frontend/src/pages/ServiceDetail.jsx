import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, ChevronRight, Zap, Settings, Shield, Award, PenTool } from 'lucide-react';
import SEO from '../components/SEO';
import { servicesData } from '../data/servicesData';

const ServiceDetail = () => {
  const { slug } = useParams();
  
  // Find the exact service in our data
  const service = servicesData.find(s => s.slug === slug);

  // If service not found, redirect to main services page
  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ overflow: 'hidden' }}
    >
      <SEO 
        title={`${service.title} | B2B Web Solutions`}
        description={service.seoDescription}
      />

      {/* Hero Section */}
      <section style={{ 
        paddingTop: '160px', 
        paddingBottom: '80px',
        position: 'relative',
        background: 'linear-gradient(135deg, var(--light) 0%, #ffffff 100%)',
        overflow: 'hidden'
      }}>
        {/* Background Blobs for Glassmorphism effect */}
        <div className="blob blob-1" style={{ top: '-10%', right: '-5%', opacity: 0.6 }}></div>
        <div className="blob blob-2" style={{ bottom: '-20%', left: '-5%', opacity: 0.4 }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--gray-500)', flexWrap: 'wrap' }}>
            <Link to="/services" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Services</Link>
            <ChevronRight size={14} />
            <span>{service.category}</span>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--dark)' }}>{service.title}</span>
          </div>

          <div className="grid-2" style={{ gap: '4rem', alignItems: 'center' }}>
            {/* Hero Text */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary-light)', color: 'white', padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                <Zap size={16} /> Premium Solution
              </div>
              
              <h1 className="h1-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                {service.title}
              </h1>
              
              <p style={{ fontSize: '1.25rem', color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                {service.intro}
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-primary">Get a Quote</Link>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ perspective: '1000px' }}
            >
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.5)', 
                backdropFilter: 'blur(20px)',
                padding: '1rem', 
                borderRadius: '32px', 
                boxShadow: '0 40px 80px rgba(124, 58, 237, 0.15)',
                border: '1px solid rgba(255,255,255,0.8)',
                transformStyle: 'preserve-3d'
              }}>
                <img 
                  src={service.heroImage} 
                  alt={service.title} 
                  style={{ width: '100%', height: 'auto', borderRadius: '24px', display: 'block' }} 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section: Benefits & Applications */}
      <section className="section-padding" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'flex-start', gap: '4rem' }}>
            
            {/* Key Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="h2-title" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  ✨
                </span>
                Key Benefits
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', background: 'var(--light)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--gray-100)' }}>
                    <CheckCircle size={24} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--dark)' }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Applications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="h2-title" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  🎯
                </span>
                Ideal Applications
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                {service.applications.map((app, idx) => (
                  <div key={idx} style={{ 
                    padding: '1.5rem', 
                    borderRadius: '16px', 
                    background: 'white', 
                    border: '1px solid var(--gray-200)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                    fontWeight: 600,
                    color: 'var(--dark)',
                    fontSize: '1.125rem'
                  }}>
                    {app}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Detailed Explanation Section */}
      <section className="section-padding" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <h2 className="h2-title" style={{ marginBottom: '1rem' }}>Our Approach to {service.title}</h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '1.125rem', lineHeight: 1.6 }}>
              At B2B Web Solutions, we don't just write code; we engineer scalable solutions. Our methodology for {service.title} ensures that your software is robust, secure, and perfectly aligned with your business objectives from day one.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { icon: <PenTool size={28} />, title: 'Strategic Planning', desc: 'We begin by thoroughly analyzing your business requirements, target audience, and competitive landscape to craft a tailored development strategy.' },
              { icon: <Settings size={28} />, title: 'Agile Development', desc: 'Using agile methodologies, we build your application in iterative sprints, ensuring flexibility and continuous delivery of high-quality features.' },
              { icon: <Shield size={28} />, title: 'Security First', desc: 'Every line of code is written with security in mind. We implement industry-standard encryption, authentication, and compliance protocols.' },
              { icon: <Award size={28} />, title: 'Quality Assurance', desc: 'Our rigorous QA process involves automated and manual testing to guarantee a bug-free, highly performant final product.' }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid var(--gray-200)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  {step.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--dark)' }}>{step.title}</h3>
                <p style={{ color: 'var(--gray-500)', lineHeight: 1.6 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding" style={{ background: 'var(--dark)', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className="h2-title" style={{ color: 'white', marginBottom: '1.5rem' }}>Ready to start your {service.title} project?</h2>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '3rem' }}>
            Our expert engineering team is ready to turn your vision into reality. Reach out today for a free technical consultation.
          </p>
          <Link to="/contact" className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}>Contact Our Team</Link>
        </div>
      </section>
      
      {/* Media query for responsive grid added inline */}
      <style>{`
        @media (max-width: 900px) {
          .h1-title {
            font-size: 2.5rem !important;
            line-height: 1.2 !important;
          }
        }
        @media (max-width: 480px) {
          .h1-title {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ServiceDetail;
