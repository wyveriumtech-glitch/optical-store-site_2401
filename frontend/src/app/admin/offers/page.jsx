'use client';
import React, { useState, useEffect } from 'react';
import { Tag, Plus, Trash2, Check, X, Sparkles, SwitchCamera } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { api } from '@/lib/api';

export default function AdminOffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const defaultOffer = {
    title: '',
    subtitle: '',
    bannerImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    code: '',
    discountPercentage: 20,
    validTill: 'Nov 30, 2026',
    active: true,
  };

  const [formData, setFormData] = useState(defaultOffer);

  const loadOffers = async () => {
    try {
      setLoading(true);
      const res = await api.getOffers(true); // all offers including inactive
      if (res.success && res.data) {
        setOffers(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  const handleToggleActive = async (offer) => {
    const token = localStorage.getItem('eyelitz_admin_token');
    try {
      await api.updateOffer(offer._id, { active: !offer.active }, token);
      loadOffers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this promotional privilege?')) return;
    const token = localStorage.getItem('eyelitz_admin_token');
    try {
      await api.deleteOffer(id, token);
      loadOffers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('eyelitz_admin_token');
    try {
      await api.createOffer(
        {
          ...formData,
          code: formData.code.toUpperCase(),
          discountPercentage: Number(formData.discountPercentage),
        },
        token
      );
      setModalOpen(false);
      setFormData(defaultOffer);
      loadOffers();
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
              Promotional Offers &amp; Tickers
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Live promotional coupons displayed across the homepage ticker and offers section.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-gold-sm hover:scale-105 transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Privilege</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-obsidian-900 rounded-3xl border border-white/10 overflow-hidden shadow-xl">
          {loading ? (
            <div className="py-20 text-center text-neutral-400 text-sm">Loading offers...</div>
          ) : offers.length === 0 ? (
            <div className="py-20 text-center text-neutral-500 text-sm">No promotional campaigns exist.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-neutral-400 uppercase tracking-wider text-[10px] bg-obsidian-850/50">
                    <th className="py-3.5 px-4">Banner / Title</th>
                    <th className="py-3.5 px-4">Coupon Code</th>
                    <th className="py-3.5 px-4">Discount</th>
                    <th className="py-3.5 px-4">Validity</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {offers.map((off) => (
                    <tr key={off._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-14 h-10 rounded-lg overflow-hidden bg-black/40 flex-shrink-0 border border-white/10">
                            <img src={off.bannerImage} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-serif font-bold text-white text-sm">{off.title}</div>
                            <div className="text-[11px] text-neutral-400 truncate max-w-xs">
                              {off.subtitle}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-gold-400 text-sm">
                        {off.code}
                      </td>
                      <td className="py-4 px-4 font-semibold text-emerald-400">
                        {off.discountPercentage > 0 ? `${off.discountPercentage}% OFF` : `$${off.discountAmount} OFF`}
                      </td>
                      <td className="py-4 px-4 text-neutral-300">{off.validTill}</td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleActive(off)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                            off.active
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-neutral-800 text-neutral-500 border border-white/5'
                          }`}
                        >
                          {off.active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => handleDelete(off._id)}
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

      {/* Add Offer Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />

          <div className="relative w-full max-w-lg bg-obsidian-900 border border-gold-500/40 rounded-3xl p-8 z-10 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-serif font-bold text-white mb-1">Create Promotional Privilege</h3>
            <p className="text-xs text-neutral-400 mb-6">
              This code will be immediately redeemable in client bags and highlighted on the homepage ticker.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Campaign Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Winter Luxury Gala"
                  className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Subtitle / Tagline</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. 25% Off All Designer Sunglasses"
                  className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Coupon Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g. WINTER25"
                    className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Discount (%) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100}
                    value={formData.discountPercentage}
                    onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                    className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Validity Text</label>
                <input
                  type="text"
                  value={formData.validTill}
                  onChange={(e) => setFormData({ ...formData, validTill: e.target.value })}
                  placeholder="e.g. Nov 30, 2026"
                  className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Banner Visual URL</label>
                <input
                  type="text"
                  value={formData.bannerImage}
                  onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                  className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest shadow-gold-sm hover:scale-[1.01] transition-all"
              >
                Launch Promotional Campaign
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
