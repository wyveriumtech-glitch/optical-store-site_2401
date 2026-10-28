import React from 'react';
import Link from 'next/link';
import {
  Glasses,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#09090b] border-t border-white/[0.06] text-neutral-400 text-sm">
      {/* Brand Trust Badges Banner */}
      <div className="border-b border-white/[0.04] py-8 bg-[#0d0d10]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-full bg-champagne/10 border border-champagne/20 text-champagne">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-white font-serif font-light text-sm tracking-wide">Japanese Titanium</h5>
              <p className="text-[11px] text-neutral-500 font-light">Hypoallergenic &amp; Sabae hand-shaped</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-full bg-champagne/10 border border-champagne/20 text-champagne">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-white font-serif font-light text-sm tracking-wide">Clinical Precision</h5>
              <p className="text-[11px] text-neutral-500 font-light">Optom. Akash Arjun Sawant</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-full bg-champagne/10 border border-champagne/20 text-champagne">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-white font-serif font-light text-sm tracking-wide">Zeiss Lab Partners</h5>
              <p className="text-[11px] text-neutral-500 font-light">Sub-micron wavefront optics</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-full bg-champagne/10 border border-champagne/20 text-champagne">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-white font-serif font-light text-sm tracking-wide">Studio Appointments</h5>
              <p className="text-[11px] text-neutral-500 font-light">Dedicated one-on-one sessions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: Brand & Bio (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-serif font-light tracking-[0.2em] text-white">
              OPTOARTIST<span className="text-champagne">.</span>
            </span>
            <span className="block text-[10px] tracking-[0.25em] uppercase text-champagne/80 font-medium mt-1">
              Ratnagiri Studio · Couture Eyewear × Clinical Vision Care
            </span>
          </Link>

          <p className="text-neutral-400 text-xs leading-relaxed max-w-sm font-light">
            Couture eyewear, fitted by a clinician. Where precision optometry meets quiet luxury. Founded by
            Optom. Akash Arjun Sawant in Ratnagiri, Maharashtra.
          </p>

          <div className="pt-2">
            <a
              href="https://wa.me/919876543210?text=Hello%20OptoArtist%20Studio,%20I%20would%20like%20to%20consult%20with%20Optom.%20Akash"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] text-white text-xs font-medium tracking-wide transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 text-champagne" />
              <span>WhatsApp Studio Concierge</span>
            </a>
          </div>
        </div>

        {/* Col 2: Optical Collections */}
        <div className="space-y-3">
          <h4 className="text-white font-serif text-sm font-light tracking-wider uppercase text-champagne/90">
            Collections
          </h4>
          <ul className="space-y-2 text-xs font-light">
            <li>
              <Link href="/shop?category=Sunglasses" className="hover:text-champagne transition-colors">
                Sunglasses
              </Link>
            </li>
            <li>
              <Link href="/shop?category=Eyeglasses" className="hover:text-champagne transition-colors">
                Optical Eyewear
              </Link>
            </li>
            <li>
              <Link href="/shop?category=Contact+Lenses" className="hover:text-champagne transition-colors">
                Contact Lenses
              </Link>
            </li>
            <li>
              <Link href="/shop?category=Kids" className="hover:text-champagne transition-colors">
                Junior Flex Frames
              </Link>
            </li>
            <li>
              <Link href="/shop?category=Accessories" className="hover:text-champagne transition-colors">
                Atelier Leather Cases
              </Link>
            </li>
            <li>
              <Link href="/offers" className="text-champagne font-medium hover:underline">
                Current Studio Privileges
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Vision Care Pillars */}
        <div className="space-y-3">
          <h4 className="text-white font-serif text-sm font-light tracking-wider uppercase text-champagne/90">
            Vision Care
          </h4>
          <ul className="space-y-2 text-xs font-light">
            <li>
              <Link href="/services" className="hover:text-champagne transition-colors">
                Comprehensive Eye Examination
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-champagne transition-colors">
                Contact Lens Clinic
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-champagne transition-colors">
                Myopia Management
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-champagne transition-colors">
                Prescription Spectacles
              </Link>
            </li>
            <li>
              <Link href="/book-appointment" className="text-champagne font-medium hover:underline">
                Book Clinical Eye Exam
              </Link>
            </li>
            <li>
              <Link href="/admin/login" className="hover:text-champagne transition-colors">
                Staff &amp; Admin Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Studio Location */}
        <div className="space-y-3">
          <h4 className="text-white font-serif text-sm font-light tracking-wider uppercase text-champagne/90">
            Ratnagiri Studio
          </h4>
          <div className="space-y-2.5 text-xs font-light">
            <p className="flex items-start space-x-2">
              <MapPin className="w-3.5 h-3.5 text-champagne flex-shrink-0 mt-0.5" />
              <span>Salvi Stop, Ratnagiri, Maharashtra 415612</span>
            </p>
            <p className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-champagne flex-shrink-0" />
              <span>+91 98765 43210</span>
            </p>
            <p className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-champagne flex-shrink-0" />
              <span>concierge@optoartist.com</span>
            </p>
            <div className="pt-2 text-[11px] text-neutral-500">
              <p className="text-neutral-300 font-medium">Studio Hours:</p>
              <p>Mon – Sat: 10:00 AM – 8:30 PM</p>
              <p>Sunday: By Appointment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.04] py-6 bg-[#070709]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-light">
          <p>© {new Date().getFullYear()} OptoArtist / Eyelitz Haute Optique. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/about" className="hover:text-champagne transition-colors">
              About Optom. Akash
            </Link>
            <Link href="/services" className="hover:text-champagne transition-colors">
              Vision Care
            </Link>
            <Link href="/contact" className="hover:text-champagne transition-colors">
              Visit Studio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
