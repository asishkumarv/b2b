import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import SEO from '../components/SEO';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://api.b2bwebsolutions.com/api/blogs/${id}`);
        setBlog(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch blog:', err);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return <div style={{ paddingTop: '150px', textAlign: 'center' }}>Loading article...</div>;
  }

  if (!blog) {
    return <div style={{ paddingTop: '150px', textAlign: 'center' }}>Article not found.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ paddingTop: '120px', paddingBottom: '4rem', minHeight: '80vh' }}
    >
      <SEO 
        title={`${blog.title} | B2B Web Solutions Blog`}
        description={blog.content.substring(0, 160) + "..."}
      />
      <div className="container" style={{ maxWidth: '800px' }}>
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '2rem' }}>
          <ArrowLeft size={20} /> Back to Blog
        </Link>
        
        <h1 className="h1-title" style={{ marginBottom: '1.5rem', fontSize: '3rem' }}>{blog.title}</h1>
        
        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--gray-500)', fontSize: '1rem', marginBottom: '3rem', borderBottom: '1px solid var(--gray-200)', paddingBottom: '2rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={18} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={18} /> {blog.author}</span>
        </div>

        <div className="markdown-body" style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--dark)' }}>
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
        
        {/* Basic CSS for markdown elements to ensure lists and headers look good */}
        <style>{`
          .markdown-body h1, .markdown-body h2, .markdown-body h3 {
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-weight: 700;
            color: var(--dark);
          }
          .markdown-body p {
            margin-bottom: 1.5rem;
          }
          .markdown-body ul, .markdown-body ol {
            padding-left: 2rem;
            margin-bottom: 1.5rem;
          }
          .markdown-body li {
            margin-bottom: 0.5rem;
          }
          .markdown-body a {
            color: var(--primary);
            text-decoration: underline;
          }
          .markdown-body blockquote {
            border-left: 4px solid var(--primary);
            padding-left: 1rem;
            font-style: italic;
            color: var(--gray-500);
            background: var(--light);
            padding: 1rem;
            border-radius: 0 8px 8px 0;
          }
        `}</style>
      </div>
    </motion.div>
  );
};

export default BlogPost;
