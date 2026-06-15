require('dotenv').config();
const { sequelize, PageContent } = require('./models');

const seedData = [
  {
    pageKey: 'home_hero',
    title: 'We build digital experiences that drive growth.',
    description: 'B2B Web Solutions is a premium development studio specializing in high-performance web applications, mobile apps, and scalable e-commerce platforms.',
  },
  {
    pageKey: 'home_about',
    title: 'Who We Are',
    description: 'At B2B Web Solutions, we blend deep engineering expertise with world-class design to craft digital products that scale. Whether you need a massive enterprise platform or a sleek consumer mobile app, our team operates as an extension of your business—delivering highly robust and secure code that solves real-world challenges.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    data: ['Elite Engineering', 'Scalable Architecture', 'Premium Design']
  },
  {
    pageKey: 'home_what_we_do',
    title: 'What we do',
    description: 'From raw idea to massive launch — we provide full-stack product delivery all under one roof.',
    data: [
      { icon: 'Smartphone', title: 'App Development', description: 'Native Android & iOS apps with smooth UX and rock-solid performance.' },
      { icon: 'Globe', title: 'Website Development', description: 'Fast, accessible, beautifully designed sites that convert.' },
      { icon: 'ShoppingBag', title: 'E-commerce Development', description: 'Stores built to scale — payments, catalog, checkout, analytics.' }
    ]
  },
  {
    pageKey: 'home_why_choose',
    title: 'Why Partner With Us?',
    description: 'We don’t just write code; we engineer value. We bring an agile mindset, transparent communication, and elite technical talent to ensure your project ships on time and performs flawlessly.',
    data: [
      { icon: 'Zap', title: 'High Performance', desc: 'Optimized codebases that load fast and handle massive concurrent traffic.' },
      { icon: 'Shield', title: 'Bank-grade Security', desc: 'We implement rigorous security protocols to protect your business data.' },
      { icon: 'Terminal', title: 'Clean Architecture', desc: 'Maintainable, well-documented code designed for future scaling.' }
    ]
  },
  {
    pageKey: 'home_process',
    title: 'Our Proven Process',
    description: 'From initial concept to global launch, we follow a rigorous and transparent 9-step methodology.',
    data: [
      { title: "1. Requirements", desc: "We conduct in-depth analysis and collaborative workshops to fully understand your business goals, target audience, and technical needs.", imageUrl: "/process/step1_requirements.png" },
      { title: "2. Agreement", desc: "We formalize our partnership with clear timelines, deliverables, and a transparent contract ensuring all expectations are aligned.", imageUrl: "/process/step2_agreement.png" },
      { title: "3. UI/UX Design", desc: "Our design team crafts intuitive, engaging, and visually stunning interfaces tailored specifically to your brand identity.", imageUrl: "/process/step3_uiux.png" },
      { title: "4. Development", desc: "Our engineers write clean, scalable, and highly performant code, transforming the approved designs into a fully functional product.", imageUrl: "/process/step4_development.png" },
      { title: "5. Testing", desc: "We rigorously test the application across multiple devices and environments to ensure security, stability, and zero bugs.", imageUrl: "/process/step5_testing.png" },
      { title: "6. Client Approval", desc: "We present the final product for your review. We only move forward when you are 100% satisfied with the result.", imageUrl: "/process/step6_approval.png" },
      { title: "7. Deployment", desc: "We carefully launch your application to live production environments using automated CI/CD pipelines to ensure zero downtime.", imageUrl: "/process/step7_deployment.png" },
      { title: "8. User Experience", desc: "We monitor how real users interact with your platform and gather metrics to ensure a seamless and delightful journey.", imageUrl: "/process/step8_ux.png" },
      { title: "9. Analogue Monitor", desc: "We provide 24/7 continuous system monitoring and analogue health checks to guarantee uptime and lightning-fast performance.", imageUrl: "/process/step9_analogue.png" }
    ]
  },
  {
    pageKey: 'home_showcase',
    title: 'Selected Work',
    description: 'Explore the premium digital products and platforms we have meticulously crafted for our global partners.',
    data: [
      { imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', title: 'Modern SaaS Dashboard', desc: 'Analytics & E-commerce Platform' },
      { imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800', title: 'Fintech Mobile App', desc: 'Cross-platform financial tracking' }
    ]
  },
  {
    pageKey: 'home_testimonial',
    title: 'Client Success',
    description: '"B2B Web Solutions transformed our vision into a scalable, high-performance platform. Their attention to detail and design is truly unmatched in the industry."',
    data: { initials: 'SJ', name: 'Sarah Jenkins', role: 'CTO, TechNova' }
  },
  {
    pageKey: 'home_cta',
    title: 'Have an idea? Let\'s build it.',
    description: 'Tell us about your next big project and our engineering team will get back to you within 24 hours to schedule a deep-dive consultation.',
  },
  {
    pageKey: 'about_us',
    title: 'A studio that ships real product.',
    description: 'B2B Web Solutions is a digital studio helping businesses launch apps, websites, and e-commerce experiences that feel inevitable.',
  },
  {
    pageKey: 'about_values',
    title: 'Our Values',
    description: 'What drives us forward.',
    data: [
      { icon: 'Target', title: 'Outcome-driven', desc: 'We measure success by what your product achieves, not what we ship.' },
      { icon: 'Heart', title: 'Craft first', desc: 'Every pixel, animation, and line of code is treated with care.' },
      { icon: 'Zap', title: 'Move fast', desc: 'Tight feedback loops, weekly releases, no bureaucracy.' },
      { icon: 'Users', title: 'True partners', desc: 'We embed with your team and stay long after launch.' }
    ]
  },
  {
    pageKey: 'about_story',
    title: 'Our story',
    description: 'The journey of B2B Web Solutions.',
    data: [
      'We started B2B Web Solutions to fill the gap between freelance hustle and enterprise agency overhead. Our team partners with founders and product leaders to turn ambitious ideas into shipped software — on time, on budget, and beautifully built.',
      'From a one-screen prototype to a fully featured cross-platform product, we work end-to-end across design, mobile, web, and commerce.'
    ]
  },
  {
    pageKey: 'about_stats',
    title: 'By the numbers',
    description: 'Our impact in numbers.',
    data: [
      { end: 60, suffix: '+', label: 'Products shipped' },
      { end: 12, suffix: '', label: 'Industries served' },
      { end: 98, suffix: '%', label: 'Client retention' }
    ]
  },
  {
    pageKey: 'services_intro',
    title: 'Our Services',
    description: 'Comprehensive digital solutions tailored for modern businesses aiming for growth and scale.',
  },
  {
    pageKey: 'services_list',
    title: 'Core Offerings',
    description: '',
    data: [
      {
        id: 'app',
        icon: 'Smartphone',
        title: 'App Development',
        desc: 'We build native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.',
        features: ['React Native & Flutter', 'Native iOS (Swift) & Android (Kotlin)', 'App Store Optimization', 'Mobile UI/UX Design'],
        blobClass: 'blob-1',
        reverse: false,
        imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'web',
        icon: 'Globe',
        title: 'Website Development',
        desc: 'High-performance, accessible, and responsive web applications built with modern frameworks and best practices.',
        features: ['React, Vue & Next.js', 'Custom CMS Integration', 'SEO Optimization', 'Web Animations & WebGL'],
        blobClass: 'blob-2',
        reverse: true,
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'ecommerce',
        icon: 'ShoppingBag',
        title: 'E-commerce Development',
        desc: 'Scalable online stores designed to convert visitors into customers, with robust backend management and analytics.',
        features: ['Shopify Plus & Custom Stores', 'Payment Gateway Integration', 'Inventory Management', 'Conversion Rate Optimization'],
        blobClass: 'blob-1',
        reverse: false,
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800'
      }
    ]
  }
];

const seedContent = async () => {
  try {
    await sequelize.sync(); // ensure tables exist
    console.log('Database synced. Seeding content...');

    for (const item of seedData) {
      const [content, created] = await PageContent.findOrCreate({
        where: { pageKey: item.pageKey },
        defaults: item
      });
      
      if (created) {
        console.log(`Created content for: ${item.pageKey}`);
      } else {
        // Update existing if already there so it matches
        content.title = item.title;
        content.description = item.description;
        content.imageUrl = item.imageUrl || null;
        content.data = item.data || null;
        await content.save();
        console.log(`Updated content for: ${item.pageKey}`);
      }
    }
    
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedContent();
