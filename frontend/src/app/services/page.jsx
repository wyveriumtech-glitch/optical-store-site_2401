'use client';
import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Sun,
  Eye,
  Layers,
  Sparkles,
  CheckCircle2,
  Wrench,
  Ruler,
  Cpu,
  ArrowRight,
  MessageSquare,
  Activity,
  Check,
} from 'lucide-react';
import { SlideUp, FadeIn } from '@/components/animations/MotionWrappers';

const visionCarePillars = [
  {
    number: '01',
    title: 'Comprehensive Eye Examination',
    headline: 'Digital retinal imaging, intraocular pressure screening, corneal topography, binocular vision assessment.',
    description:
      'We assess anterior and posterior segment health alongside objective refraction. Far beyond simple 20/20 clarity, our testing checks ocular fatigue triggers, tear film quality, and retinal health.',
    details: [
      'Digital retinal imaging & fundus photography',
      'Corneal wavefront curvature mapping',
      'Non-contact intraocular pressure screening',
      'Binocular accommodation & convergence check',
    ],
  },
  {
    number: '02',
    title: 'Contact Lens Clinic',
    headline: 'Soft disposables, toric for astigmatism, multifocals, and specialized rigid gas permeable (RGP) / scleral fittings.',
    description:
      'Every eye has an individual corneal profile. We conduct full diagnostic trials to ensure moisture retention, corneal oxygenation, and stability for both daily soft lenses and advanced keratoconus designs.',
    details: [
      'Precision diagnostic trail fittings',
      'Toric customization for high astigmatism',
      'Multifocal presbyopia contact lenses',
      'Specialized rigid gas permeable (RGP) guidance',
    ],
  },
  {
    number: '03',
    title: 'Myopia Management',
    headline: 'Clinically proven interventions for children and young adults, including orthokeratology (Ortho-K) and optical defocus lenses.',
    description:
      'Slowing the progression of childhood short-sightedness protects retinal health long-term. We utilize clinical protocols from international myopia control studies.',
    details: [
      'Axial length tracking & lifestyle counseling',
      'Optical peripheral defocus spectacles',
      'Orthokeratology night-lens consultation',
      'Dedicated pediatric progress evaluations',
    ],
  },
  {
    number: '04',
    title: 'Prescription Spectacles',
    headline: 'Sub-millimeter digital pupillary distance calibration, custom progressive lens surfacing, and bespoke frame fitting.',
    description:
      'An exceptional frame paired with incorrectly surfaced lenses causes eyestrain. We calibrate vertex distance, pantoscopic tilt, and wrap angle to deliver effortless visual harmony.',
    details: [
      '3D digital pupillary distance measurement',
      'Individual frame wrap & tilt alignment',
      'Distortion-free wide progressive corridors',
      'Complimentary lifetime ultrasonic adjustments',
    ],
  },
];

const lensTech = [
  {
    name: 'Zeiss Blue-Cut Digital Shield',
    badge: 'Digital Defense',
    headline: 'HEV 415-455nm High-Energy Filtration Without Yellow Cast',
    description:
      'Engineered for digital executives and programmers. Blue-Cut blocks damaging high-frequency blue rays while preserving natural color spectrum integrity and supporting nocturnal melatonin balance.',
    features: [
      'Zero noticeable yellow cosmetic tint',
      'Anti-static nano-coating repelling dust particles',
      'Dual-surface hydrophobic oleophobic slick layer',
      '100% UVA / UVB 400 protection',
    ],
    idealFor: 'Monitors, smartphones, evening reading, indoor office illumination',
  },
  {
    name: 'Transitions Gen S Photochromic',
    badge: 'Light Intelligent',
    headline: 'Seamless Indoors-to-Sun Transition in Seconds',
    description:
      'Molecular dye matrices react instantaneously to ambient ultraviolet radiation. Transitions effortlessly from 100% crystal clear indoors to deep luxury polarized sunglass tint outdoors.',
    features: [
      'Rapid fade-back technology (clears 2x faster indoors)',
      'Available in Emerald Green, Amber Gold, and Obsidian Grey',
      'Built-in blue light barrier indoors and outdoors',
      'Temperature-resistant photochromic stabilization',
    ],
    idealFor: 'Dynamic lifestyles, outdoor travel, light sensitivity (photophobia)',
  },
  {
    name: 'Crizal Diamond Anti-Reflective',
    badge: 'Pure Clarity',
    headline: 'Eliminates 99.6% of Glare and Ghost Images',
    description:
      'Multilayer vacuum-sputtered metal oxide coating that eliminates halos around oncoming car headlights at night and renders your eyes invisible to reflections on video calls.',
    features: [
      'Razor-sharp night driving contrast',
      'Micro-scratch resistant diamond hardcoat',
      'Easy wipe fingerprint repellency',
      'Anti-fog moisture dispersion matrix',
    ],
    idealFor: 'Night driving, Zoom conferences, photographers, public speakers',
  },
  {
    name: 'Freeform Digital Progressive Matrix',
    badge: 'Seamless Focus',
    headline: 'Uninterrupted Flow from Far Horizon to Smartphone',
    description:
      'Replaces obsolete lined bifocals with computerized 3D wavefront surface carving. Custom-designed for each millimeter of your eye prescription.',
    features: [
      'Widened ergonomic computer monitor corridor',
      'Zero peripheral swimming sensation or vertigo',
      'Customized to your individual frame tilt & vertex distance',
      '100% adaptation guarantee within 30 days',
    ],
    idealFor: 'Presbyopia (ages 40+), multi-monitor workstations, reading & driving',
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-obsidian-950 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 text-champagne text-xs uppercase tracking-[0.2em] font-medium mb-3 px-3.5 py-1 rounded-full bg-champagne/10 border border-champagne/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clinical Optometry · Ratnagiri Studio</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-white tracking-tight">
            Vision Care &amp; <span className="italic font-normal text-champagne">Lens Science</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base mt-4 leading-relaxed font-light">
            Clinical precision led by Optom. Akash Arjun Sawant. Hospital-grade diagnostic optometry meets
            sub-micron lens engineering in Sabae titanium and Carl Zeiss optical surfacing.
          </p>
        </div>

        {/* 4 Clinical Pillars Section */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] tracking-[0.25em] uppercase text-champagne font-medium block mb-2">
              Clinical Optometry
            </span>
            <h2 className="text-3xl font-serif font-light text-white">
              Expertise Behind <span className="italic font-normal text-champagne">Every Examination</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visionCarePillars.map((pillar, idx) => (
              <SlideUp key={pillar.number} delay={idx * 0.1}>
                <div className="h-full bg-[#0e0e12] rounded-3xl p-8 border border-white/[0.08] hover:border-champagne/40 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="font-serif text-3xl font-light text-champagne/60 group-hover:text-champagne transition-colors">
                        {pillar.number}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
                        Clinical Standard
                      </span>
                    </div>

                    <h3 className="text-2xl font-serif font-light text-white mb-2">{pillar.title}</h3>
                    <p className="text-xs text-champagne/90 font-medium mb-4 leading-relaxed">{pillar.headline}</p>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                      {pillar.description}
                    </p>

                    <div className="space-y-2 mb-6 pt-4 border-t border-white/[0.04]">
                      {pillar.details.map((item) => (
                        <div key={item} className="flex items-center space-x-2 text-xs text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-champagne flex-shrink-0" />
                          <span className="font-light">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/book-appointment"
                    className="inline-flex items-center space-x-2 text-xs text-champagne font-medium uppercase tracking-wider hover:text-champagne-light pt-2"
                  >
                    <span>Schedule this consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>

        {/* Lens Technologies Breakdown */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] tracking-[0.25em] uppercase text-champagne font-medium block mb-2">
              Optical Engineering
            </span>
            <h2 className="text-3xl font-serif font-light text-white">
              Advanced Ophthalmic <span className="italic font-normal text-champagne">Lens Coatings</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-2 font-light">
              Surfaced in partnership with Carl Zeiss and Essilor laboratories to eliminate aberrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {lensTech.map((tech, idx) => (
              <SlideUp key={tech.name} delay={idx * 0.1}>
                <div className="h-full bg-[#0e0e12] rounded-3xl p-8 border border-white/[0.08] hover:border-champagne/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-champagne/10 border border-champagne/20 text-champagne text-[10px] uppercase font-medium tracking-[0.2em]">
                        {tech.badge}
                      </span>
                      <span className="text-xs text-neutral-500">Premium Optical Grade</span>
                    </div>

                    <h3 className="text-2xl font-serif font-light text-white mb-2">{tech.name}</h3>
                    <h4 className="text-xs font-medium text-champagne/90 mb-4">{tech.headline}</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-light">
                      {tech.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {tech.features.map((feat) => (
                        <div key={feat} className="flex items-center space-x-2 text-xs text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-champagne flex-shrink-0" />
                          <span className="font-light">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-neutral-400 font-light">
                      <strong className="text-neutral-300 font-medium">Ideal for:</strong> {tech.idealFor}
                    </span>
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-[#0e0e12] rounded-3xl p-10 sm:p-14 border border-white/[0.08] text-center space-y-6 max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-champagne font-medium block">
            Visit the Studio
          </span>
          <h3 className="text-3xl sm:text-4xl font-serif font-light text-white">
            Experience Sub-Millimeter Visual Perfection
          </h3>
          <p className="text-neutral-300 text-sm max-w-xl mx-auto font-light leading-relaxed">
            Schedule your comprehensive eye exam with Optom. Akash Arjun Sawant at our Ratnagiri Studio,
            or consult directly on WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link
              href="/book-appointment"
              className="px-8 py-3.5 rounded-full bg-champagne hover:bg-champagne-light text-obsidian-950 font-semibold text-xs uppercase tracking-[0.2em] transition-colors"
            >
              Schedule Eye Exam
            </Link>

            <a
              href="https://wa.me/919876543210?text=Hello%20OptoArtist%20Studio,%20I%20have%20questions%20regarding%20Zeiss%20Blue-Cut%20and%20Progressive%20lenses"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-champagne" />
              <span>Ask Optometrist on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
