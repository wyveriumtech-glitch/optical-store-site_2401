'use client';
import React from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, Sparkles, Clock, CheckCircle2, Glasses, HeartHandshake, ArrowRight } from 'lucide-react';
import { SlideUp, FadeIn } from '@/components/animations/MotionWrappers';

const timeline = [
  {
    year: '2016',
    title: 'Clinical Optometry Foundation',
    desc: 'Optom. Akash Arjun Sawant begins clinical practice with a focus on comprehensive pediatric refraction, corneal topography, and binocular vision.',
  },
  {
    year: '2019',
    title: 'Zeiss Optical Accreditation',
    desc: 'Formed a direct technical partnership with Carl Zeiss Vision, introducing computerized digital wave-front diagnostic scans.',
  },
  {
    year: '2022',
    title: 'Couture Eyewear Curation',
    desc: 'Established direct relationships with master artisans in Sabae, Japan and Belluno, Italy for hand-finished beta-titanium and Mazzucchelli acetate.',
  },
  {
    year: '2026',
    title: 'OptoArtist Flagship Studio',
    desc: 'Unveiling the premier Ratnagiri Studio combining bespoke optical styling lounges with hospital-grade refraction suites and digital concierge.',
  },
];

const certifications = [
  'Licensed Clinical Optometrist (Optom. Akash Arjun Sawant)',
  'Carl Zeiss Vision Partner Accreditation (#8942)',
  'Essilor Crizal Optical Surface Science Certified',
  'Advanced Myopia Management & Ortho-K Protocol Fellow',
];

export default function AboutPage() {
  return (
    <div className="bg-obsidian-950 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 text-champagne text-xs uppercase tracking-[0.2em] font-medium mb-3 px-3.5 py-1 rounded-full bg-champagne/10 border border-champagne/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Clinician Behind the Craft</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-white tracking-tight">
            The Story of <span className="italic font-normal text-champagne">OptoArtist</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base mt-4 leading-relaxed font-light">
            Couture eyewear, fitted by a clinician. Where precision optics meet quiet luxury.
            Founded by Optom. Akash Arjun Sawant in Ratnagiri, Maharashtra.
          </p>
        </div>

        {/* Founder Story Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
                alt="Optom. Akash Arjun Sawant In Studio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
            </div>

            {/* Floating quote card */}
            <div className="absolute -bottom-6 -right-6 sm:bottom-4 sm:right-4 bg-[#0e0e12]/95 backdrop-blur-md p-5 rounded-2xl border border-champagne/30 max-w-xs shadow-xl hidden sm:block">
              <p className="text-xs text-neutral-300 italic font-serif">
                &ldquo;Your eyes deserve the same sub-millimeter precision as a fine watch.&rdquo;
              </p>
              <span className="text-[10px] text-champagne font-medium uppercase tracking-[0.2em] block mt-2">
                — Optom. Akash Arjun Sawant
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne font-medium block">
              Philosophy &amp; Standards
            </span>
            <h2 className="text-3xl font-serif font-light text-white leading-tight">
              Clinical Precision Meets <span className="italic font-normal text-champagne">Curated Style</span>
            </h2>
            <p className="text-neutral-300 text-sm leading-relaxed font-light">
              Founded in Ratnagiri, OptoArtist was established with a singular conviction: eyewear should not be a
              compromise between medical vision correction and aesthetic refinement. We bridge the gap between
              the sterile optometry clinic and the couture fashion house.
            </p>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              Every frame in our collection is personally selected by Optom. Akash Arjun Sawant for balance, temple ergonomics,
              and lens adaptability. Whether crafted from Japanese beta-titanium or Mazzucchelli block acetate, every piece
              is fitted with calibrated pupillary distance and optical tilt measurements.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#0e0e12] border border-white/[0.06]">
                <span className="text-2xl font-serif font-light text-champagne">10+</span>
                <p className="text-xs text-neutral-400 font-light mt-0.5">Years of Clinical Optometry</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0e0e12] border border-white/[0.06]">
                <span className="text-2xl font-serif font-light text-champagne">15,000+</span>
                <p className="text-xs text-neutral-400 font-light mt-0.5">Precision Refractions Verified</p>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mb-28">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne font-medium block mb-2">
              Our Heritage
            </span>
            <h3 className="text-3xl font-serif font-light text-white">The Evolutionary Journey</h3>
            <p className="text-xs text-neutral-400 mt-2 font-light">
              A steadfast commitment to ocular health, master craftsmanship, and bespoke client attention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {timeline.map((item, idx) => (
              <SlideUp key={item.year} delay={idx * 0.1}>
                <div className="h-full bg-[#0e0e12] rounded-3xl p-6 border border-white/[0.08] hover:border-champagne/40 transition-colors flex flex-col justify-between">
                  <div>
                    <span className="text-3xl font-serif font-light text-champagne block mb-3">
                      {item.year}
                    </span>
                    <h4 className="text-base font-serif font-light text-white mb-2">{item.title}</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light">{item.desc}</p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-white/[0.04] flex items-center space-x-1.5 text-[9px] text-champagne/70 uppercase tracking-[0.2em] font-medium">
                    <span>Milestone</span>
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>

        {/* Certifications and Standards */}
        <div className="bg-[#0e0e12] rounded-3xl p-8 sm:p-12 border border-white/[0.08] mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.25em] text-champagne font-medium block">
                Clinical Certifications
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-light text-white">
                Certified By Leading Ophthalmic Authorities
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                Our Ratnagiri Studio operates under stringent optometric protocols. Every prescription is digitally
                verified by Optom. Akash Arjun Sawant before custom laboratory surfacing.
              </p>

              <div className="space-y-2 pt-2">
                {certifications.map((c) => (
                  <div key={c} className="flex items-center space-x-2 text-xs text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-champagne flex-shrink-0" />
                    <span className="font-light">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <Link
                href="/book-appointment"
                className="px-8 py-3.5 rounded-full bg-champagne hover:bg-champagne-light text-obsidian-950 font-semibold text-xs uppercase tracking-[0.2em] text-center transition-colors"
              >
                Schedule Examination
              </Link>
              <Link
                href="/shop"
                className="px-8 py-3.5 rounded-full bg-transparent hover:bg-white/[0.04] text-white border border-white/[0.1] font-light text-xs uppercase tracking-wider text-center transition-colors"
              >
                Explore The Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
