'use client';
import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Sparkles,
  Send,
  CheckCircle2,
  Navigation,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Frame Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: 'Frame Inquiry', message: '' });
    }, 4000);
  };

  return (
    <div className="bg-obsidian-950 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-champagne text-xs uppercase tracking-[0.2em] font-medium mb-3 px-3.5 py-1 rounded-full bg-champagne/10 border border-champagne/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ratnagiri Studio Concierge</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-white tracking-tight">
            Connect With Our <span className="italic font-normal text-champagne">Studio</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base mt-4 font-light leading-relaxed">
            Visit our Ratnagiri Studio or connect directly with Optom. Akash Arjun Sawant for bespoke
            refraction consultations and couture eyewear fittings.
          </p>
        </div>

        {/* 2-Column Info & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Left: Contact Info & Hours (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0e0e12] rounded-3xl p-8 border border-white/[0.08] space-y-6">
              <h3 className="text-xl font-serif font-light text-white">Ratnagiri Studio &amp; Suite</h3>

              <div className="space-y-4 text-xs sm:text-sm font-light">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-full bg-champagne/10 border border-champagne/20 text-champagne flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Studio Address:</strong>
                    <span className="text-neutral-400 leading-relaxed block mt-0.5">
                      Shop no. 13, Navkar Enclave, Ratnagiri - Solapur Hwy, opp. Kotak Mahindra Bank,
                      Maruti Mandir, State Bank Colony, Ratnagiri, Maharashtra 415639
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-full bg-champagne/10 border border-champagne/20 text-champagne flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Operating Hours:</strong>
                    <span className="text-neutral-400 block mt-0.5">Monday – Saturday: 10:00 AM – 8:30 PM</span>
                    <span className="text-neutral-400 block">Sunday: By Appointment</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-full bg-champagne/10 border border-champagne/20 text-champagne flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Studio Telephone:</strong>
                    <span className="text-neutral-400 block mt-0.5">+91 98765 43210</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-full bg-champagne/10 border border-champagne/20 text-champagne flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Direct Concierge Inbox:</strong>
                    <span className="text-neutral-400 block mt-0.5">concierge@optoartist.com</span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Button */}
              <div className="pt-2">
                <a
                  href="https://wa.me/919876543210?text=Hello%20OptoArtist%20Studio,%20I%20would%20like%20to%20consult%20with%20Optom.%20Akash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] text-white font-medium text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-champagne" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Message Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="glass-gold-panel rounded-3xl p-8 sm:p-10 border border-gold-500/30">
              <h3 className="text-2xl font-serif font-bold text-white mb-2">Send an Inquiry</h3>
              <p className="text-xs text-neutral-400 mb-6">
                Have specific prescription requirements or seeking rare vintage frame archive pieces?
                Drop us a note below.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="font-serif font-bold text-white text-base">Inquiry Transmitted</h4>
                  <p className="text-xs text-neutral-300">
                    Our optical concierge will respond within 2 operational hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-300">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Julian Vance"
                        className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-300">Contact Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="julian@example.com"
                      className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-300">Inquiry Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                    >
                      <option value="Frame Inquiry">Frame Inquiry & Sizing</option>
                      <option value="Prescription Lenses">Prescription & Progressive Lenses</option>
                      <option value="Home Appointment">Home Eye Test Consultation</option>
                      <option value="Corporate / Bulk Order">Corporate VIP Orders</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-300">Your Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your optical requirements or request an appointment slot..."
                      className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-gold-sm hover:scale-[1.01] transition-all"
                  >
                    <span>Transmit Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Google Maps Embed Section */}
        <div className="rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl bg-obsidian-900">
          <div className="p-4 bg-obsidian-850 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-gold-400 font-semibold uppercase tracking-wider">
              <Navigation className="w-4 h-4" />
              <span>Store Location Map</span>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Shop%20no.%2013%2C%20Navkar%20Enclave%2C%20Ratnagiri%20-%20Solapur%20Hwy%2C%20opp.%20Kotak%20Mahindra%20Bank%2C%20Maruti%20Mandir%2C%20State%20Bank%20Colony%2C%20Ratnagiri%2C%20Maharashtra%20415639"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-400 hover:text-white underline"
            >
              Open in Native Maps App →
            </a>
          </div>

          <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full">
            <iframe
              src="https://www.google.com/maps?q=Shop%20no.%2013%2C%20Navkar%20Enclave%2C%20Ratnagiri%20-%20Solapur%20Hwy%2C%20opp.%20Kotak%20Mahindra%20Bank%2C%20Maruti%20Mandir%2C%20State%20Bank%20Colony%2C%20Ratnagiri%2C%20Maharashtra%20415639&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
