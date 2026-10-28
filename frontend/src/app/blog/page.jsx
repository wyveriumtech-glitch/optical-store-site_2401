'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Clock, User, ArrowRight, BookOpen, Tag } from 'lucide-react';
import { api } from '@/lib/api';
import { SlideUp } from '@/components/animations/MotionWrappers';

export default function BlogIndexPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await api.getBlogs();
        if (res.success && res.data) {
          setBlogs(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="bg-obsidian-950 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-gold-400 text-xs uppercase tracking-widest font-semibold mb-3 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Optometric Journal &amp; Style Authority</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            Eye Health &amp; <span className="gold-text-gradient">Frame Proportions</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base mt-4">
            Clinical insights into digital eye strain, freeform lens physics, and the architectural principles
            of eyewear facial styling.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="py-20 text-center text-neutral-400 text-sm">Loading articles...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <SlideUp key={blog._id || idx} delay={idx * 0.1}>
                <Link
                  href={`/blog/${blog.slug || blog._id}`}
                  className="group bg-obsidian-900 rounded-3xl overflow-hidden border border-white/10 hover:border-gold-500/40 shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                      <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-obsidian-950/80 backdrop-blur-md border border-gold-500/30 text-[10px] font-bold uppercase tracking-widest text-gold-400">
                          {blog.category || 'Vision Health'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center space-x-3 text-xs text-neutral-400 mb-3">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-gold-400" />
                          <span>{blog.readTime || '4 min read'}</span>
                        </span>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-white group-hover:text-gold-300 transition-colors leading-snug">
                        {blog.title}
                      </h3>

                      <p className="text-xs text-neutral-400 mt-3 line-clamp-3 leading-relaxed font-light">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Author & Read CTA */}
                  <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2 text-xs text-neutral-300">
                      <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold text-[10px]">
                        Dr
                      </div>
                      <span className="truncate max-w-[130px]">{blog.author?.name?.split(',')[0]}</span>
                    </div>

                    <span className="text-xs text-gold-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </SlideUp>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
