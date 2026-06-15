import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Globe, ShoppingBag, ArrowRight, CheckCircle, Zap, Settings, Shield, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageContent } from '../hooks/usePageContent';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

import ecommerceDashboard from '../assets/ecommerce_dashboard.png';
import mobileAppUi from '../assets/mobile_app_ui.png';

const IconMap = {
  Smartphone: <Smartphone size={24} />,
  Globe: <Globe size={24} />,
  ShoppingBag: <ShoppingBag size={24} />,
  Zap: <Zap size={24} />,
  Shield: <Shield size={24} />,
  Terminal: <Terminal size={24} />
};

const Home = () => {
  const contentAbout = usePageContent('home_about', 'Who We Are', 'At B2B Web Solutions...', ['Elite Engineering', 'Scalable Architecture', 'Premium Design'], ecommerceDashboard);
  const contentWhatWeDo = usePageContent('home_what_we_do', 'What we do', 'From idea to launch...', [
    { icon: 'Smartphone', title: 'App Development', description: 'Native apps' },
    { icon: 'Globe', title: 'Website Development', description: 'Fast sites' },
    { icon: 'ShoppingBag', title: 'E-commerce Development', description: 'Scalable stores' }
  ]);
  const contentWhyChoose = usePageContent('home_why_choose', 'Why Partner With Us?', 'We engineer value.', [
    { icon: 'Zap', title: 'High Performance', desc: 'Fast load times.' },
    { icon: 'Shield', title: 'Bank-grade Security', desc: 'Secure data.' },
    { icon: 'Terminal', title: 'Clean Architecture', desc: 'Scalable code.' }
  ]);
  const contentProcess = usePageContent('home_process', 'Our Proven Process', 'Rigorous methodology.', ['Discovery', 'Design', 'Engineering', 'Launch']);
  const contentShowcase = usePageContent('home_showcase', 'Selected Work', 'Premium products.', [
    { imageUrl: ecommerceDashboard, title: 'Modern SaaS Dashboard', desc: 'Analytics Platform' },
    { imageUrl: mobileAppUi, title: 'Fintech Mobile App', desc: 'Financial tracking' }
  ]);
  const contentTestimonial = usePageContent('home_testimonial', 'Client Success', '"Transformative platform."', { initials: 'SJ', name: 'Sarah Jenkins', role: 'CTO' });
  const contentCta = usePageContent('home_cta', 'Have an idea? Let\'s build it.', 'Tell us about your project.');

  const [activeProcessStep, setActiveProcessStep] = useState(0);

  // Safely map data to support both old array-of-strings and new array-of-objects formats
  const processSteps = Array.isArray(contentProcess.data) 
    ? contentProcess.data.map(item => typeof item === 'string' ? { title: item, desc: '', imageUrl: '' } : item)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SEO 
        title="B2B Web Solutions | Software, Mobile Apps & E-commerce" 
        description="Premium digital studio providing custom software development, mobile apps, e-commerce platforms, and scalable web dashboards for B2B enterprises."
      />
      <Hero />

      {/* About Section */}
      <section className="section-padding" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: '4rem', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="h2-title" style={{ marginBottom: '1.5rem' }}>{contentAbout.title}</h2>
              <p style={{ color: 'var(--gray-500)', fontSize: '1.125rem', lineHeight: 1.8 }}>
                {contentAbout.description}
              </p>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {Array.isArray(contentAbout.data) && contentAbout.data.map((feature, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                    <CheckCircle size={20} color="var(--primary)" /> {feature}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <div style={{ background: 'var(--light)', padding: '2rem', borderRadius: '32px', position: 'relative' }}>
                <div className="dot-pattern" style={{ opacity: 0.5 }}></div>
                <img src={contentAbout.imageUrl || ecommerceDashboard} alt="Office" style={{ width: '100%', borderRadius: '24px', position: 'relative', zIndex: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding" style={{ background: 'var(--light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="h2-title" style={{ marginBottom: '1rem' }}>{contentWhatWeDo.title}</h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>{contentWhatWeDo.description}</p>
          </div>

          <div className="grid-3">
            {Array.isArray(contentWhatWeDo.data) && contentWhatWeDo.data.map((item, i) => (
              <ServiceCard 
                key={i}
                icon={IconMap[item.icon] || <Globe size={24} />}
                title={item.title}
                description={item.description}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="h2-title" style={{ marginBottom: '1rem' }}>{contentWhyChoose.title}</h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto' }}>{contentWhyChoose.description}</p>
          </div>
          <div className="grid-3">
            {Array.isArray(contentWhyChoose.data) && contentWhyChoose.data.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ background: 'var(--light)', padding: '2rem', borderRadius: '24px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>{IconMap[item.icon] || <Zap size={24} />}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--gray-500)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - 3D Coverflow */}
      <section className="section-padding" style={{ background: 'var(--dark)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <style>{`
          .process-swiper .swiper-button-next,
          .process-swiper .swiper-button-prev {
            background: white;
            color: var(--dark) !important;
            width: 48px !important;
            height: 48px !important;
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          }
          .process-swiper .swiper-button-next::after,
          .process-swiper .swiper-button-prev::after {
            font-size: 20px !important;
            font-weight: 800;
          }
        `}</style>
        
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 className="h2-title" style={{ color: 'white', marginBottom: '1rem', fontSize: '3rem', fontWeight: 300 }}>{contentProcess.title}</h2>
            {processSteps.length > 0 && (
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gray-300)' }}>
                {processSteps[activeProcessStep]?.title || `Step ${activeProcessStep + 1}`}
              </h3>
            )}
          </div>
          
          <div style={{ padding: '2rem 0' }}>
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              initialSlide={Math.floor(processSteps.length / 2) || 0}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 150,
                modifier: 2.5,
                slideShadows: true,
              }}
              navigation={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[EffectCoverflow, Navigation, Autoplay]}
              onSlideChange={(swiper) => setActiveProcessStep(swiper.activeIndex)}
              className="process-swiper"
              style={{ width: '100%', padding: '3rem 0' }}
            >
              {processSteps.map((step, i) => (
                <SwiperSlide key={i} style={{ 
                  width: '320px', 
                  height: '420px',
                  background: 'var(--white)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  border: '8px solid white'
                }}>
                  {step.imageUrl ? (
                    <img src={step.imageUrl} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#f8fafc' }} />
                  ) : (
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--dark)' }}>{step.title}</div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1rem', maxWidth: '800px', margin: '0 auto' }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.125rem', lineHeight: 1.8 }}>
              {processSteps[activeProcessStep]?.desc || contentProcess.description}
            </p>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="section-padding" style={{ background: 'var(--gray-100)', position: 'relative', overflow: 'hidden' }}>
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="h2-title" style={{ marginBottom: '1rem' }}>{contentShowcase.title}</h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '1.125rem' }}>{contentShowcase.description}</p>
          </div>

          <div className="grid-2">
            {Array.isArray(contentShowcase.data) && contentShowcase.data.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.2 }}
                style={{ background: 'var(--white)', padding: '1rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              >
                <img src={item.imageUrl} alt={item.title} className="img-responsive" style={{ borderRadius: '16px' }} />
                <div style={{ padding: '1.5rem 1rem 0.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--gray-500)' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="section-padding">
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>{contentTestimonial.title}</div>
            <h2 className="h2-title" style={{ marginBottom: '3rem', fontSize: '2rem' }}>{contentTestimonial.description}</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {contentTestimonial.data?.initials || 'SJ'}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700 }}>{contentTestimonial.data?.name || 'Sarah Jenkins'}</div>
                <div style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>{contentTestimonial.data?.role || 'CTO, TechNova'}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Massive CTA Section */}
      <section style={{ padding: '6rem 1.5rem 0', paddingBottom: '6rem' }}>
        <div className="container" style={{ 
          background: 'linear-gradient(135deg, #0b0f19 0%, #1e1b4b 100%)', 
          borderRadius: '32px', 
          padding: '6rem 2rem', 
          textAlign: 'center',
          color: 'var(--white)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }}>
          <div className="dot-pattern"></div>
          <div style={{ position: 'relative', zIndex: 10 }}>
            <h2 className="h1-title" style={{ marginBottom: '1.5rem' }}>{contentCta.title}</h2>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
              {contentCta.description}
            </p>
            <Link to="/contact" className="btn-primary" style={{ background: 'var(--white)', color: 'var(--primary)' }}>
              Get in touch <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;