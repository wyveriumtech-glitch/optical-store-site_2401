'use client';
import React, { useState, useEffect } from 'react';
import {
  Star,
  ShieldCheck,
  Quote,
  Sparkles,
  Plus,
  CheckCircle2,
  X,
  MessageSquare,
  Camera,
} from 'lucide-react';
import { api } from '@/lib/api';
import { SlideUp, FadeIn } from '@/components/animations/MotionWrappers';

const lookbookItems = [
  {
    client: 'Julian Montgomery, Partner',
    frame: 'Aurelius Imperial Aviator',
    beforeImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    notes: 'Shifted from standard plastic frames to 24K Japanese titanium. Face angles instantly sculpted.',
  },
  {
    client: 'Camilla Rossi, Creative Director',
    frame: 'Celeste Diamond Cat-Eye',
    beforeImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    notes: 'Upswept cat-eye proportions highlighted cheekbones and complemented heart face structure.',
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const [newReview, setNewReview] = useState({
    customerName: '',
    rating: 5,
    comment: '',
    location: 'Verified Store Patron',
    framePurchased: 'Aurelius Imperial Aviator',
  });

  const loadReviews = async () => {
    try {
      setLoading(true);
      const res = await api.getReviews();
      if (res.success && res.data) {
        setReviews(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await api.submitReview(newReview);
      if (res.success) {
        setSuccessMsg(true);
        setTimeout(() => {
          setSuccessMsg(false);
          setModalOpen(false);
          loadReviews();
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-obsidian-950 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 text-gold-400 text-xs uppercase tracking-widest font-semibold mb-3 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Patron Reviews &amp; Lookbook</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
              Client Testimonials &amp; <span className="gold-text-gradient">Style Transformations</span>
            </h1>
            <p className="text-neutral-400 text-sm mt-3 max-w-xl">
              Real stories from our patrons experiencing bespoke digital refractions, weightless titanium frames,
              and enhanced circadian focus.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="mt-6 md:mt-0 px-6 py-3.5 rounded-full bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-gold-sm hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Your Review</span>
          </button>
        </div>

        {/* 1. Before & After Lookbook Showcase */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-serif font-bold text-white">Before &amp; After Styling Lookbook</h2>
            <p className="text-xs text-neutral-400 mt-2">
              Witness how tailored frame silhouettes and bridge alignment rebalance natural facial architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {lookbookItems.map((item, idx) => (
              <div
                key={idx}
                className="glass-gold-panel rounded-3xl p-6 sm:p-8 border border-gold-500/30 space-y-5"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block text-center">
                      Previous Mass-Market Frame
                    </span>
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-black/50 border border-white/10">
                      <img src={item.beforeImg} alt="Before" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block text-center">
                      Eyelitz Bespoke Titanium
                    </span>
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-black/50 border border-gold-500/50">
                      <img src={item.afterImg} alt="After" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <h4 className="text-sm font-serif font-bold text-white">{item.client}</h4>
                  <p className="text-xs text-gold-400 font-medium">Bespoke Frame: {item.frame}</p>
                  <p className="text-xs text-neutral-300 italic mt-1">&ldquo;{item.notes}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Customer Reviews Grid */}
        <div className="mb-24">
          <h3 className="text-2xl font-serif font-bold text-white mb-8">Verified Customer Reviews</h3>

          {loading ? (
            <div className="py-12 text-center text-neutral-400 text-sm">Loading reviews...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((rev, idx) => (
                <SlideUp key={rev._id || idx} delay={idx * 0.08}>
                  <div className="h-full bg-obsidian-900 rounded-3xl p-8 border border-white/10 hover:border-gold-500/40 shadow-xl transition-all duration-300 flex flex-col justify-between relative group">
                    <Quote className="w-10 h-10 text-gold-500/20 absolute top-6 right-6" />

                    <div>
                      <div className="flex text-gold-400 mb-4">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                        ))}
                      </div>

                      <p className="text-sm text-neutral-300 italic leading-relaxed mb-6 font-light">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-gold-500/30 bg-obsidian-850 flex-shrink-0">
                        <img
                          src={rev.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                          alt={rev.customerName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white flex items-center space-x-1.5">
                          <span>{rev.customerName}</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" title="Verified Patron" />
                        </h4>
                        <p className="text-xs text-gold-400/90 font-medium">
                          {rev.framePurchased || 'Designer Frame'}
                        </p>
                        <p className="text-[10px] text-neutral-500">{rev.location}</p>
                      </div>
                    </div>
                  </div>
                </SlideUp>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />

          <div className="relative w-full max-w-lg glass-gold-panel border border-gold-500/40 rounded-3xl p-8 z-10 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-serif font-bold text-white mb-1">Share Your Experience</h3>
            <p className="text-xs text-neutral-400 mb-6">
              Your feedback guides other connoisseurs seeking optimal vision comfort.
            </p>

            {successMsg ? (
              <div className="p-6 rounded-2xl bg-emerald-500/20 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-serif font-bold text-white">Thank You for Your Review</h4>
                <p className="text-xs text-neutral-300">Your review is registered in our database.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={newReview.customerName}
                    onChange={(e) => setNewReview({ ...newReview, customerName: e.target.value })}
                    placeholder="Eleanor Vance"
                    className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-300">Star Rating</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                    >
                      <option value={5}>5 Stars (Exceptional)</option>
                      <option value={4}>4 Stars (Very Good)</option>
                      <option value={3}>3 Stars (Average)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-300">Frame Purchased</label>
                    <input
                      type="text"
                      value={newReview.framePurchased}
                      onChange={(e) => setNewReview({ ...newReview, framePurchased: e.target.value })}
                      placeholder="e.g. Aurelius Aviator"
                      className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">City / Profession</label>
                  <input
                    type="text"
                    value={newReview.location}
                    onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                    placeholder="e.g. Architect, Metro City"
                    className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Your Review *</label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Describe the optical clarity, lightweight comfort, or consultation experience..."
                    className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest shadow-gold-sm hover:scale-[1.01] transition-all disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Post Customer Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
