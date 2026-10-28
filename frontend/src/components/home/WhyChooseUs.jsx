'use client';
import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Eye, Cpu, Ruler, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { SlideUp } from '@/components/animations/MotionWrappers';

const clinicalPillars = [
  {
    kicker: 'Clinical Assessment',
    title: 'Comprehensive Eye Examination',
    desc: 'Refraction, binocular vision assessment, intraocular pressure screening, and a transparent medical explanation of every metric.',
    tag: 'Hospital-Grade',
  },
  {
    kicker: 'Specialty Cornea',
    title: 'Contact Lens Clinic',
    desc: 'Soft · RGP · Scleral · Ortho-K. Expert diagnostic fitting for every eye, including keratoconus and irregular corneas.',
    tag: 'Custom Curvature',
  },
  {
    kicker: 'Pediatric Health',
    title: 'Myopia Management',
    desc: 'Evidence-based clinical care, specialty dual-focus optics, and lifestyle guidance to actively slow axial myopia progression in children.',
    tag: 'Pediatric Certified',
  },
  {
    kicker: 'Precision Dispensing',
    title: 'Prescription Spectacles',
    desc: 'Freeform computerized digital lens surfacing down to 0.01 diopter — progressive, blue-cut shields, and Zeiss anti-reflective layers.',
    tag: 'Sub-Millimeter PD',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-obsidian-900 border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Part 1: The Studio Experience Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-20 border-b border-white/[0.06]">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-light block">
              The OptoArtist Experience
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif text-white font-normal leading-[1.08]">
              Clinical precision. <br />
              <span className="italic text-neutral-300 font-light">Curated style.</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-xl pt-2">
              Every frame begins with your eyes. Our optometrists pair a thorough medical examination
              with a personal facial architecture styling session — so what you wear sees as beautifully as it looks.
            </p>
            <div className="pt-4 flex items-center space-x-6">
              <Link
                href="/about"
                className="text-xs uppercase tracking-[0.2em] text-gold-300 hover:text-white font-light flex items-center space-x-2 transition-colors"
              >
                <span>Our Story &amp; Optometry Philosophy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-obsidian-850 border border-white/[0.08]">
              <img
                src="https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80"
                alt="Clinician Frame Dispensing"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Part 2: Vision Care Pillars */}
        <div className="pt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-light block mb-2">
                Vision Care
              </span>
              <h3 className="text-3xl sm:text-5xl font-serif text-white font-normal">
                Expertise behind every lens
              </h3>
            </div>
            <Link
              href="/services"
              className="text-xs uppercase tracking-[0.18em] text-neutral-400 hover:text-gold-300 font-light flex items-center space-x-1.5 transition-colors group"
            >
              <span>Explore Vision Care</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clinicalPillars.map((pillar, idx) => (
              <SlideUp key={pillar.title} delay={idx * 0.1}>
                <div className="h-full bg-obsidian-850 rounded-2xl p-7 border border-white/[0.06] hover:border-gold-400/30 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gold-400 font-light">
                        {pillar.kicker}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.04] text-neutral-400 border border-white/[0.06]">
                        {pillar.tag}
                      </span>
                    </div>

                    <h4 className="text-xl font-serif text-white font-normal mb-3 group-hover:text-gold-300 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.04]">
                    <Link
                      href="/book-appointment"
                      className="text-[11px] text-neutral-400 hover:text-gold-300 font-light flex items-center space-x-1 transition-colors"
                    >
                      <span>Book Consultation →</span>
                    </Link>
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>

          {/* Clean Visit Studio Banner */}
          <div className="mt-16 rounded-2xl border border-white/[0.08] bg-obsidian-850/80 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-light block mb-1">
                Visit the Studio
              </span>
              <h4 className="text-2xl sm:text-3xl font-serif text-white font-normal">
                Your vision, crafted in person.
              </h4>
              <p className="text-xs text-neutral-400 font-light mt-1">
                Ratnagiri Studio Promenade. Walk-ins and private optometrist consultations welcomed.
              </p>
            </div>

            <Link
              href="/book-appointment"
              className="px-7 py-3 rounded-full border border-gold-400/50 hover:border-gold-400 text-gold-300 hover:text-white font-light text-xs uppercase tracking-[0.18em] transition-all flex-shrink-0 hover:bg-gold-500/10"
            >
              Book Eye Exam
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
