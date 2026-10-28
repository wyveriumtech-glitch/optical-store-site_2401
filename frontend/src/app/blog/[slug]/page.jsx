'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Clock, User, ArrowLeft, Share2, Sparkles, BookOpen } from 'lucide-react';
import { api } from '@/lib/api';

export default function SingleBlogPage() {
  const params = useParams();
  const slug = params?.slug;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await api.getBlog(slug);
        if (res.success && res.data) {
          setBlog(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-neutral-400">Loading optical publication...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif font-bold text-white mb-2">Article Not Found</h2>
        <Link href="/blog" className="text-gold-400 text-sm font-semibold underline">
          ← Return to All Articles
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-obsidian-950 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-neutral-400 hover:text-gold-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Optical Articles</span>
        </Link>

        {/* Category & Read Time */}
        <div className="flex items-center space-x-3 text-xs text-gold-400 mb-3">
          <span className="px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 font-bold uppercase tracking-widest text-[10px]">
            {blog.category}
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1 text-neutral-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{blog.readTime || '5 min read'}</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-6">
          {blog.title}
        </h1>

        {/* Author Box */}
        <div className="flex items-center space-x-3 pb-8 border-b border-white/10 mb-8">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-gold-500/30 bg-obsidian-850">
            <img
              src={blog.author?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'}
              alt={blog.author?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">{blog.author?.name}</h4>
            <p className="text-xs text-gold-400/90">{blog.author?.role}</p>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-obsidian-900 border border-white/10 mb-10 shadow-2xl">
          <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Markdown/Article Content */}
        <div className="prose prose-invert prose-gold max-w-none text-neutral-300 text-sm sm:text-base leading-relaxed space-y-6">
          <p className="text-lg text-gold-300/90 font-serif leading-relaxed italic border-l-2 border-gold-500 pl-4 my-6">
            {blog.excerpt}
          </p>

          <div className="whitespace-pre-line leading-relaxed text-neutral-300 space-y-4">
            {blog.content}
          </div>
        </div>

        {/* Share & Consultation CTA */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-neutral-400">
            <span>Tags:</span>
            {blog.tags?.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded bg-obsidian-850 border border-white/5 text-neutral-300">
                #{t}
              </span>
            ))}
          </div>

          <Link
            href="/book-appointment"
            className="px-6 py-3 rounded-full bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-gold-sm hover:scale-105 transition-all"
          >
            Consult With Our Optometrist
          </Link>
        </div>
      </div>
    </article>
  );
}
