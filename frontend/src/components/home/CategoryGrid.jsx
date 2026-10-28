'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { SlideUp, FadeIn } from '@/components/animations/MotionWrappers';

const categories = [
  {
    name: 'Prescription Eyeglasses',
    categoryQuery: 'Eyeglasses',
    subtitle: 'Pure titanium & Italian Mazzucchelli acetate silhouettes',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80',
    colSpan: 'md:col-span-2',
    tag: 'Flagship Core',
  },
  {
    name: 'Designer Sunglasses',
    categoryQuery: 'Sunglasses',
    subtitle: 'Polarized CR-39 optical lenses with 24K gold accents',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    colSpan: 'md:col-span-1',
    tag: 'UV400 Polarized',
  },
  {
    name: 'Bespoke Contact Lenses',
    categoryQuery: 'Contact Lenses',
    subtitle: 'AquaHydra breathable silicone hydrogel dailies',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    colSpan: 'md:col-span-1',
    tag: '16-Hr Moisture',
  },
  {
    name: 'Junior Flex Eyewear',
    categoryQuery: 'Kids',
    subtitle: 'Unbreakable TR-90 memory frames for young prodigies',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
    colSpan: 'md:col-span-1',
    tag: 'Shatter-Resistant',
  },
  {
    name: 'Haute Accessories',
    categoryQuery: 'Accessories',
    subtitle: 'Full-grain leather hard cases & high-density silk cloths',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
    colSpan: 'md:col-span-1',
    tag: 'Handcrafted',
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-24 bg-obsidian-900 border-b border-white/5 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gold-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center space-x-2 text-gold-400 text-xs uppercase tracking-widest font-semibold mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Curated Departments</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Optical Collections of <span className="gold-text-gradient">Distinction</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="mt-4 md:mt-0 text-sm text-neutral-400 hover:text-gold-400 font-medium flex items-center space-x-1 group transition-colors"
          >
            <span>Explore Complete Catalog</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Responsive Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <SlideUp key={cat.name} delay={idx * 0.1} className={cat.colSpan}>
              <Link
                href={`/shop?category=${encodeURIComponent(cat.categoryQuery)}`}
                className="group relative block h-80 sm:h-96 rounded-3xl overflow-hidden border border-white/10 hover:border-gold-500/50 shadow-xl transition-all duration-500"
              >
                {/* Background image with zoom */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-black/20 group-hover:via-obsidian-950/30 transition-all duration-500" />
                </div>

                {/* Tag pill */}
                <div className="absolute top-5 left-5">
                  <span className="px-3.5 py-1.5 rounded-full bg-obsidian-900/80 backdrop-blur-md border border-white/10 text-[10px] font-semibold tracking-widest uppercase text-gold-300">
                    {cat.tag}
                  </span>
                </div>

                {/* Arrow icon */}
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-gold-500 group-hover:text-obsidian-950 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-col justify-end">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-gold-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-2 line-clamp-2 font-light">
                    {cat.subtitle}
                  </p>
                </div>
              </Link>
            </SlideUp>
          ))}
        </div>
      </div>
    </section>
  );
}
