'use client';
import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { api } from '@/lib/api';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const res = await api.getReviews(true); // all reviews
      if (res.success && res.data) {
        setReviews(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleToggleVerify = async (id) => {
    const token = localStorage.getItem('eyelitz_admin_token');
    try {
      await api.toggleVerifyReview(id, token);
      loadReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this client review?')) return;
    const token = localStorage.getItem('eyelitz_admin_token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/reviews/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      loadReviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-wide">
            Customer Testimonials Moderation
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Review, verify, and moderate client feedback and transformation stories.
          </p>
        </div>

        <div className="bg-obsidian-900 rounded-3xl border border-white/10 overflow-hidden shadow-xl">
          {loading ? (
            <div className="py-20 text-center text-neutral-400 text-sm">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="py-20 text-center text-neutral-500 text-sm">No reviews submitted yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-neutral-400 uppercase tracking-wider text-[10px] bg-obsidian-850/50">
                    <th className="py-3.5 px-4">Client</th>
                    <th className="py-3.5 px-4">Rating &amp; Frame</th>
                    <th className="py-3.5 px-4">Review Content</th>
                    <th className="py-3.5 px-4">Verified</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {reviews.map((r) => (
                    <tr key={r._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white">{r.customerName}</div>
                        <div className="text-[11px] text-neutral-400">{r.location}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex text-gold-400 mb-1">
                          {[...Array(r.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-gold-400" />
                          ))}
                        </div>
                        <span className="text-[11px] text-neutral-400">{r.framePurchased}</span>
                      </td>
                      <td className="py-4 px-4 text-neutral-300 max-w-sm">
                        <p className="line-clamp-2 italic">&ldquo;{r.comment}&rdquo;</p>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            r.verified
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {r.verified ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => handleDelete(r._id)}
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
    </AdminLayout>
  );
}
