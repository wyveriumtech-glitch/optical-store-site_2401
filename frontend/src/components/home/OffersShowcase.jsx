'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Tag,
  Copy,
  Check,
  ArrowRight,
  Flame,
  Zap,
  ShoppingBag,
  Timer,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { SlideUp, FadeIn } from '@/components/animations/MotionWrappers';

export default function OffersShowcase({ offers = [] }) {
  const [copiedCode, setCopiedCode] = useState(null);
  const { applyCoupon, setIsDrawerOpen } = useCart();

  // Dynamic countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 38, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (code, discountPercent) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code, discountPercent || 25);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  // High-impact AI & Cyber-Luxury optical visual assets
  const aiVisuals = [
    {
      img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80',
      badge: 'AI Curated • 24K Titanium',
      tagline: 'Imperial Floating Aviator Edition',
      originalPrice: '₹17,500',
      offerPrice: '₹14,900',
    },
    {
      img: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=80',
      badge: 'AI Vision Matrix • Buy 1 Get 1',
      tagline: 'Cyber-Editorial Polarized Duo',
      originalPrice: '₹19,800',
      offerPrice: '₹9,900',
    },
    {
      img: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=80',
      badge: 'AI Refraction Tech • 100% Free',
      tagline: 'Digital Wavefront Diagnostic Scan',
      originalPrice: '₹1,500',
      offerPrice: '₹0',
    },
  ];

  const displayOffers = (offers.length > 0 ? offers : []).slice(0, 3);

  return (
    <section className="py-24 bg-obsidian-950 border-b border-white/5 relative overflow-hidden">
      {/* Background ambient lighting flares */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-gold-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with live countdown */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 text-gold-400 text-xs uppercase tracking-widest font-semibold mb-3 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30">
              <Zap className="w-3.5 h-3.5 text-gold-400 fill-gold-400 animate-pulse" />
              <span>Limited Release • AI Visual Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Exclusive Seasonal <span className="gold-text-gradient">Privileges</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-3 max-w-xl font-light">
              Redeem instant vouchers, complimentary German Carl Zeiss blue-cut upgrades,
              and bespoke handcrafted frame bundles.
            </p>
          </div>

          {/* Ticking Countdown Timer Widget */}
          <div className="glass-gold-panel p-4 rounded-2xl border border-gold-500/30 flex items-center space-x-4 self-start lg:self-auto">
            <div className="flex items-center space-x-2 text-gold-400">
              <Timer className="w-5 h-5 animate-pulse" />
              <span className="text-xs uppercase tracking-wider font-bold">Offer Closes In:</span>
            </div>
            <div className="flex items-center space-x-2 font-mono text-sm">
              <div className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-white font-bold">
                {String(timeLeft.hours).padStart(2, '0')}h
              </div>
              <span className="text-gold-400 font-bold">:</span>
              <div className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-white font-bold">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </div>
              <span className="text-gold-400 font-bold">:</span>
              <div className="px-2.5 py-1 rounded-lg bg-black/60 border border-gold-500/40 text-gold-400 font-bold">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </div>
            </div>
          </div>
        </div>

        {/* 3 Ultra-Cool Cards with AI Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {displayOffers.map((offer, idx) => {
            const visual = aiVisuals[idx % aiVisuals.length];
            const isCopied = copiedCode === offer.code;

            return (
              <SlideUp key={offer._id || offer.code} delay={idx * 0.12}>
                <div className="group relative bg-obsidian-900 rounded-3xl overflow-hidden border border-white/10 hover:border-gold-500/50 shadow-2xl transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-gold-md">
                  <div>
                    {/* Visual Stage with Cinematic Overlay */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                      <img
                        src={offer.bannerImage || visual.img}
                        alt={offer.title}
                        className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-0.5 transition-transform duration-700 ease-out"
                      />

                      {/* Cinematic Lighting & Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/40 to-transparent" />
                      <div className="absolute inset-0 bg-gold-radial opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                        <span className="px-3 py-1 rounded-full bg-obsidian-950/85 backdrop-blur-md border border-gold-500/40 text-[10px] font-bold tracking-widest uppercase text-gold-300 flex items-center space-x-1 shadow-md">
                          <Sparkles className="w-3 h-3 text-gold-400" />
                          <span>{visual.badge}</span>
                        </span>
                      </div>

                      <div className="absolute top-4 right-4">
                        <span className="px-3.5 py-1 rounded-full bg-gold-gradient text-obsidian-950 font-serif font-bold text-xs uppercase tracking-wider shadow-gold-sm">
                          {offer.discountPercentage > 0
                            ? `${offer.discountPercentage}% OFF`
                            : `₹${offer.discountAmount} OFF`}
                        </span>
                      </div>

                      {/* Bottom Image Sub-label */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-neutral-300">
                        <span className="font-mono text-gold-400 font-semibold">{visual.tagline}</span>
                        <div className="flex items-center space-x-1.5 text-xs">
                          <span className="text-neutral-500 line-through">{visual.originalPrice}</span>
                          <span className="text-emerald-400 font-bold">{visual.offerPrice}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-2">
                        <span className="text-gold-400 font-semibold uppercase tracking-wider">
                          Privilege Code: {offer.code}
                        </span>
                        <span>Valid: {offer.validTill || 'Limited Period'}</span>
                      </div>

                      <h3 className="text-2xl font-display font-bold text-white group-hover:text-gold-300 transition-colors leading-snug">
                        {offer.title}
                      </h3>

                      <p className="text-xs text-neutral-300 mt-2 line-clamp-2 leading-relaxed font-light">
                        {offer.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="p-6 pt-0 space-y-3">
                    {/* Interactive Coupon Box */}
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-obsidian-850 border border-white/10 group-hover:border-gold-500/30 transition-colors">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-gold-400" />
                        <span className="font-mono font-bold text-sm text-white tracking-wider">
                          {offer.code}
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopyCode(offer.code, offer.discountPercentage)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                          isCopied
                            ? 'bg-emerald-500 text-obsidian-950 font-bold shadow-md'
                            : 'bg-gold-500/15 hover:bg-gold-500 text-gold-300 hover:text-obsidian-950 border border-gold-500/30'
                        }`}
                      >
                        {isCopied ? (
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

                    {/* Quick CTA */}
                    <Link
                      href="/shop"
                      className="w-full py-3.5 rounded-xl bg-gold-gradient text-obsidian-950 font-display font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-gold-sm hover:scale-[1.01] transition-all"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Shop with this Privilege</span>
                    </Link>
                  </div>
                </div>
              </SlideUp>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center">
          <Link
            href="/offers"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-400 hover:text-gold-300 font-semibold group"
          >
            <span>Explore All VIP Seasonal Promotions</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
