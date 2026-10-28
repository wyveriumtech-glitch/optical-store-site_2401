'use client';
import React from 'react';
import Link from 'next/link';
import { Star, ShieldCheck, Quote, Sparkles, ArrowRight } from 'lucide-react';
import { SlideUp } from '@/components/animations/MotionWrappers';

export default function TestimonialsSection({ reviews = [] }) {
  const storePhotos = [
    {
      url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
      title: 'VIP Consultation Suite',
      caption: 'Bespoke frame fitting with natural ambient lighting',
    },
    {
      url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80',
      title: 'Digital Refraction Lab',
      caption: 'Hospital-grade keratometry & wavefront diagnostics',
    },
    {
      url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80',
      title: 'Haute Titanium Gallery',
      caption: 'Hand-numbered limited edition artisan frames',
    },
  ];

  return (
    <section className="py-24 bg-obsidian-900 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center space-x-2 text-gold-400 text-xs uppercase tracking-widest font-semibold mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Client Testimonials & Sanctuary</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Words From Our <span className="gold-text-gradient">Distinguished Patrons</span>
            </h2>
          </div>
          <Link
            href="/reviews"
            className="mt-4 md:mt-0 text-sm text-neutral-400 hover:text-gold-400 font-medium flex items-center space-x-1 group transition-colors"
          >
            <span>Read All Verified Reviews</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {(reviews.length > 0 ? reviews.slice(0, 3) : []).map((rev, idx) => (
            <SlideUp key={rev._id || idx} delay={idx * 0.1}>
              <div className="h-full bg-obsidian-850 rounded-3xl p-8 border border-white/10 hover:border-gold-500/30 transition-all duration-300 flex flex-col justify-between relative group">
                <Quote className="w-10 h-10 text-gold-500/20 absolute top-6 right-6" />

                <div>
                  <div className="flex text-gold-400 mb-4">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>

                  <p className="text-sm text-neutral-300 italic leading-relaxed mb-6">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-gold-500/30 bg-obsidian-800 flex-shrink-0">
                    <img
                      src={rev.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                      alt={rev.customerName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white flex items-center space-x-1.5">
                      <span>{rev.customerName}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" title="Verified Customer" />
                    </h4>
                    <p className="text-xs text-gold-400/90 font-medium">
                      Purchased: {rev.framePurchased || 'Gold Aviator'}
                    </p>
                    <p className="text-[10px] text-neutral-500">{rev.location}</p>
                  </div>
                </div>
              </div>
            </SlideUp>
          ))}
        </div>

        {/* Physical Flagship Boutique Photo Gallery */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-serif font-bold text-white">The Flagship Experience</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Immerse yourself in our private architectural showroom and digital ophthalmic testing lounge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {storePhotos.map((photo, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden aspect-[16/10] border border-white/10 shadow-lg"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5">
                  <h4 className="text-white font-serif font-bold text-base group-hover:text-gold-300 transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-neutral-300 mt-0.5 font-light">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
