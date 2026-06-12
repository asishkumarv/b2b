import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Calendar, User } from 'lucide-react';
import removeMd from 'remove-markdown';
import SEO from '../components/SEO';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('https://api.b2bwebsolutions.com/api/blogs');
        setBlogs(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: '100px', minHeight: '80vh' }}
    >
      <SEO 
        title="Our Blog | B2B Web Solutions" 
        description="Read the latest insights, news, and strategies on custom software development, mobile apps, e-commerce, and tech consulting from B2B Web Solutions."
      />
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="h1-title" style={{ marginBottom: '1rem' }}>Our Blog</h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '1.25rem' }}>Insights, news, and strategies for modern businesses.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--gray-500)' }}>Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--gray-500)' }}>No blogs found. Check back later!</div>
        ) : (
          <div className="grid-3">
            {blogs.map(blog => (
              <Link to={`/blog/${blog.id}`} key={blog.id} style={{ display: 'block' }}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, boxShadow: '0 12px 32px rgba(124, 58, 237, 0.1)' }}
                  style={{ 
                    background: 'var(--white)', 
                    borderRadius: '24px', 
                    padding: '2rem',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                    border: '1px solid var(--gray-100)',
                    height: '100%',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--gray-500)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={14} /> {blog.author}</span>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--dark)' }}>{blog.title}</h3>
                  <p style={{ color: 'var(--gray-500)', marginBottom: '2rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {removeMd(blog.content)}
                  </p>
                  <div style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Read Article <ArrowRight size={16} />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Blog;
