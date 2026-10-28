'use client';
import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, X, Clock, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { api } from '@/lib/api';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const defaultBlog = {
    title: '',
    excerpt: '',
    content: '',
    thumbnail: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80',
    category: 'Style & Aesthetics',
    readTime: '4 min read',
    tags: 'Eyewear, Style, Lenses',
  };

  const [formData, setFormData] = useState(defaultBlog);

  const loadBlogs = async () => {
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

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    const token = localStorage.getItem('eyelitz_admin_token');
    try {
      await api.deleteBlog(id, token);
      loadBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('eyelitz_admin_token');
    try {
      const payload = {
        ...formData,
        tags: typeof formData.tags === 'string' ? formData.tags.split(',').map((t) => t.trim()) : formData.tags,
      };
      await api.createBlog(payload, token);
      setModalOpen(false);
      setFormData(defaultBlog);
      loadBlogs();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-white tracking-wide">
              Clinical &amp; Style Publications
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Publish optometric health guides, face shape style tips, and lens technology breakthroughs.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-gold-sm hover:scale-105 transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Article</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-obsidian-900 rounded-3xl border border-white/10 overflow-hidden shadow-xl">
          {loading ? (
            <div className="py-20 text-center text-neutral-400 text-sm">Loading articles...</div>
          ) : blogs.length === 0 ? (
            <div className="py-20 text-center text-neutral-500 text-sm">No articles published yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-neutral-400 uppercase tracking-wider text-[10px] bg-obsidian-850/50">
                    <th className="py-3.5 px-4">Article Title</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Read Time</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {blogs.map((b) => (
                    <tr key={b._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-10 rounded-lg overflow-hidden bg-black/40 flex-shrink-0 border border-white/10">
                            <img src={b.thumbnail} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-serif font-bold text-white text-sm">{b.title}</div>
                            <div className="text-[11px] text-neutral-400 truncate max-w-sm">
                              {b.excerpt}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gold-400 font-semibold">{b.category}</td>
                      <td className="py-4 px-4 text-neutral-300">{b.readTime}</td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <Link
                          href={`/blog/${b.slug || b._id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-obsidian-850 hover:bg-white/10 text-neutral-400 hover:text-white inline-block"
                          title="View Live"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(b._id)}
                          className="p-1.5 rounded-lg bg-obsidian-850 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Blog Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div onClick={() => setModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />

          <div className="relative w-full max-w-2xl bg-obsidian-900 border border-gold-500/40 rounded-3xl p-8 z-10 shadow-2xl my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-serif font-bold text-white mb-1">Publish Optometric Article</h3>
            <p className="text-xs text-neutral-400 mb-6">
              Educate patrons on corneal health, blue-cut lens science, and facial symmetry.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. 5 Reasons Why Beta-Titanium Redefines Comfort"
                  className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                  >
                    <option value="Style & Aesthetics">Style &amp; Aesthetics</option>
                    <option value="Vision Health">Vision Health</option>
                    <option value="Lens Engineering">Lens Engineering</option>
                    <option value="Boutique News">Boutique News</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Cover Thumbnail URL</label>
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Excerpt / Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Short introductory summary shown on the blog index card..."
                  className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Full Article Content *</label>
                <textarea
                  rows={7}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write the full publication content with headings, paragraphs, and insights..."
                  className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest shadow-gold-sm hover:scale-[1.01] transition-all"
              >
                Publish Article to Journal
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
