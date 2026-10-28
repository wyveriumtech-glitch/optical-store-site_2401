'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Sparkles, ShieldCheck, Eye } from 'lucide-react';

export default function Hero() {
  const categoryPills = [
    { label: 'Sunglasses', href: '/shop?category=Sunglasses' },
    { label: 'Optical Eyewear', href: '/shop?category=Eyeglasses' },
    { label: 'Contact Lenses', href: '/shop?category=Contact+Lenses' },
    { label: 'Vision Care', href: '/services' },
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-obsidian-950">
      {/* Background Cinematic Video Loop with Quiet Luxury Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter brightness-70 contrast-110"
          poster="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1920&q=80"
        >
          <source
            src="https://res.cloudinary.com/lophebyh/video/upload/v1792909591/bgwebsitevideo.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/[0.07] via-transparent to-black/80 pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center flex flex-col items-center flex-1 justify-center">
        {/* Subtle Tagline Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.28em] text-neutral-400 font-light mb-6"
        >
          <span>Ratnagiri · Est. Optometry Studio</span>
        </motion.div>

        {/* Master Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-serif tracking-tight text-white leading-[1.05] max-w-4xl font-normal"
        >
          Craft Your <span className="italic text-gold-300 font-light">Vision</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 text-sm sm:text-lg text-neutral-300 max-w-2xl font-light leading-relaxed tracking-wide"
        >
          Couture eyewear, fitted by a clinician. Where precision optics meet quiet luxury.
          Every frame curated for craft, comfort, and optical clarity.
        </motion.p>

        {/* Dual Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gold-gradient text-obsidian-950 font-normal text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2 shadow-gold-sm hover:scale-[1.02] transition-all"
          >
            <span>Shop Eyewear</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/book-appointment"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/20 hover:border-gold-400/60 text-neutral-200 hover:text-gold-300 font-light text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2 transition-all hover:bg-white/[0.04]"
          >
            <Calendar className="w-3.5 h-3.5 text-gold-400" />
            <span>Book Eye Exam</span>
          </Link>
        </motion.div>
      </div>

      {/* OptoArtist Style Category Pill Quick Bar */}
      <div className="relative z-10 border-t border-white/[0.06] bg-obsidian-900/60 backdrop-blur-md py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 hidden md:inline">
            Direct Access:
          </span>
          {categoryPills.map((pill) => (
            <Link
              key={pill.label}
              href={pill.href}
              className="px-4 py-1.5 rounded-full border border-white/[0.08] hover:border-gold-400/40 text-xs text-neutral-300 hover:text-white transition-all text-center tracking-wider font-light hover:bg-white/[0.03]"
            >
              {pill.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
