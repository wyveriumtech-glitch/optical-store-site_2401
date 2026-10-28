'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tag, Sparkles, Copy, Check, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { api } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { SlideUp } from '@/components/animations/MotionWrappers';

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);
  const { applyCoupon, setIsDrawerOpen } = useCart();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const res = await api.getOffers();
        if (res.success && res.data) {
          setOffers(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const handleCopy = (code, discountPercent) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code, discountPercent || 20);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="bg-obsidian-950 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-champagne text-xs uppercase tracking-[0.2em] font-medium mb-3 px-3.5 py-1 rounded-full bg-champagne/10 border border-champagne/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seasonal Studio Privileges</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-white tracking-tight">
            Curated Studio <span className="italic font-normal text-champagne">Privileges</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base mt-4 font-light leading-relaxed">
            Exclusive atelier bundle offerings, complimentary Carl Zeiss digital blue-cut lens upgrades,
            and limited-edition seasonal studio privileges.
          </p>
        </div>

        {/* Offers Grid */}
        {loading ? (
          <div className="py-20 text-center text-neutral-400 text-sm font-light">Loading active privileges...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {offers.map((offer, idx) => (
              <SlideUp key={offer._id || idx} delay={idx * 0.1}>
                <div className="h-full bg-[#0e0e12] rounded-3xl overflow-hidden border border-white/[0.08] hover:border-champagne/40 shadow-2xl transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    {/* Banner Image */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-black/50">
                      <img
                        src={offer.bannerImage || 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'}
                        alt={offer.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="px-3.5 py-1 rounded-full bg-champagne text-obsidian-950 font-semibold text-xs tracking-wider uppercase">
                          {offer.discountPercentage > 0
                            ? `${offer.discountPercentage}% OFF`
                            : `₹${(offer.discountAmount || 0).toLocaleString('en-IN')} OFF`}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <span className="text-[10px] uppercase font-medium tracking-[0.2em] text-champagne block mb-1">
                        Valid: {offer.validTill || 'Limited Period'}
                      </span>
                      <h3 className="text-2xl font-serif font-light text-white mb-2">{offer.title}</h3>
                      <p className="text-xs text-neutral-300 leading-relaxed font-light">{offer.subtitle}</p>
                    </div>
                  </div>

                  {/* Promo Code Box & Action */}
                  <div className="p-6 pt-0 space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#141419] border border-white/[0.06]">
                      <div>
                        <span className="text-[9px] text-neutral-500 uppercase tracking-wider block">Promotional Code:</span>
                        <span className="font-mono font-medium text-sm text-champagne">{offer.code}</span>
                      </div>

                      <button
                        onClick={() => handleCopy(offer.code, offer.discountPercentage)}
                        className="px-3 py-1.5 rounded-lg bg-champagne/15 hover:bg-champagne text-champagne hover:text-obsidian-950 text-xs font-medium transition-all flex items-center space-x-1"
                      >
                        {copiedCode === offer.code ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Applied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy &amp; Apply</span>
                          </>
                        )}
                      </button>
                    </div>

                    <Link
                      href="/shop"
                      className="w-full py-3 rounded-full bg-champagne hover:bg-champagne-light text-obsidian-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors block text-center"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Shop Frames with this Privilege</span>
                    </Link>
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        )}

        {/* Eye Test Voucher Banner */}
        <div className="bg-[#0e0e12] rounded-3xl p-8 sm:p-12 border border-white/[0.08] text-center max-w-4xl mx-auto space-y-4">
          <span className="text-[10px] uppercase font-medium tracking-[0.25em] text-champagne block">
            Automatic Online Privilege
          </span>
          <h3 className="text-3xl font-serif font-light text-white">
            100% Complimentary 20-Point Wavefront Examination
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto font-light leading-relaxed">
            Book online and waive the standard ₹1,500 clinical consultation fee for in-studio appointments
            at our Ratnagiri Studio with Optom. Akash Arjun Sawant.
          </p>

          <div className="pt-2">
            <Link
              href="/book-appointment"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-champagne hover:bg-champagne-light text-obsidian-950 font-semibold text-xs uppercase tracking-[0.2em] transition-colors"
            >
              <span>Schedule Eye Exam</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
