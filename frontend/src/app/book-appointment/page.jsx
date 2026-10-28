'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Clock,
  Activity,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Glasses,
  MessageSquare,
} from 'lucide-react';
import { api } from '@/lib/api';

const services = [
  {
    id: 'In-Studio Eye Exam',
    title: 'In-Studio Comprehensive Examination',
    subtitle: 'At Ratnagiri Studio with Optom. Akash Arjun Sawant (20-point digital scan)',
    icon: Building,
    badge: 'Flagship Studio',
    duration: '45 mins',
  },
  {
    id: 'Contact Lens Clinic',
    title: 'Contact Lens Diagnostic & Fit Clinic',
    subtitle: 'Corneal curvature topography, soft/RGP trial lenses, astigmatism',
    icon: Sparkles,
    badge: 'Clinical Fit',
    duration: '45 mins',
  },
  {
    id: 'Myopia Management Consult',
    title: 'Pediatric Myopia Management Consult',
    subtitle: 'Axial length tracking, lifestyle guidance, and defocus lenses',
    icon: Activity,
    badge: 'Pediatric Clinic',
    duration: '45 mins',
  },
  {
    id: 'Prescription Spectacles Fitting',
    title: 'Bespoke Prescription Fitting & PD',
    subtitle: 'Sub-millimeter pupillary distance calibration and wrap alignment',
    icon: Glasses,
    badge: 'Precision Lab',
    duration: '30 mins',
  },
];

const timeSlots = [
  '10:30 AM - 11:15 AM',
  '11:30 AM - 12:15 PM',
  '01:00 PM - 01:45 PM',
  '02:30 PM - 03:15 PM',
  '04:00 PM - 04:45 PM',
  '05:30 PM - 06:15 PM',
  '07:00 PM - 07:45 PM',
];

export default function BookAppointmentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: 'In-Studio Eye Exam',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    timeSlot: '11:30 AM - 12:15 PM',
    customerName: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationData, setConfirmationData] = useState(null);

  const handleServiceSelect = (serviceId) => {
    setFormData((prev) => ({ ...prev, serviceType: serviceId }));
  };

  const handleNextStep = () => {
    setErrorMessage('');
    if (currentStep === 1) {
      if (!formData.serviceType) {
        setErrorMessage('Please choose a preferred clinical service.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!formData.date || !formData.timeSlot) {
        setErrorMessage('Please select both a date and time slot.');
        return;
      }
      setCurrentStep(3);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.customerName || !formData.phone || !formData.email) {
      setErrorMessage('Please fill in your name, contact phone, and email.');
      return;
    }

    try {
      setLoading(true);
      const res = await api.bookAppointment(formData);
      if (res.success && res.data) {
        setConfirmationData(res.data);
      } else {
        setErrorMessage(res.message || 'Unable to schedule appointment. Please try again.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Network error communicating with booking server.');
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppConfirmationMessage = (data) => {
    const text = `Hello OptoArtist Studio! I have scheduled an eye exam appointment (Ref: *${data.referenceCode}*) for *${data.serviceType}* on *${data.date}* at *${data.timeSlot}*. Looking forward to my session with Optom. Akash Arjun Sawant.`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-obsidian-950 min-h-screen py-16 relative overflow-hidden">
      {/* Glow decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-champagne/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 text-champagne text-xs uppercase tracking-[0.2em] font-medium mb-3 px-3.5 py-1 rounded-full bg-champagne/10 border border-champagne/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complimentary Clinical Exam</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight">
            Schedule Your <span className="italic font-normal text-champagne">Clinical Examination</span>
          </h1>
          <p className="text-neutral-400 text-sm mt-3 max-w-xl mx-auto font-light leading-relaxed">
            Reserve a dedicated one-on-one consultation with Optom. Akash Arjun Sawant at our Ratnagiri Studio.
            Includes 20-point digital scan, retinal assessment, and bespoke frame fitting.
          </p>

          {/* Stepper Wizard Indicator */}
          <div className="flex items-center justify-center space-x-4 sm:space-x-8 mt-8">
            <div
              className={`flex items-center space-x-2 text-xs sm:text-sm font-semibold ${
                currentStep >= 1 ? 'text-gold-400' : 'text-neutral-600'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep >= 1 ? 'bg-gold-500 text-obsidian-950' : 'bg-obsidian-800 text-neutral-500'
                }`}
              >
                1
              </div>
              <span>Service</span>
            </div>
            <div className={`w-8 sm:w-12 h-0.5 ${currentStep >= 2 ? 'bg-gold-500' : 'bg-neutral-800'}`} />
            <div
              className={`flex items-center space-x-2 text-xs sm:text-sm font-semibold ${
                currentStep >= 2 ? 'text-gold-400' : 'text-neutral-600'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep >= 2 ? 'bg-gold-500 text-obsidian-950' : 'bg-obsidian-800 text-neutral-500'
                }`}
              >
                2
              </div>
              <span>Date &amp; Time</span>
            </div>
            <div className={`w-8 sm:w-12 h-0.5 ${currentStep >= 3 ? 'bg-gold-500' : 'bg-neutral-800'}`} />
            <div
              className={`flex items-center space-x-2 text-xs sm:text-sm font-semibold ${
                currentStep >= 3 ? 'text-gold-400' : 'text-neutral-600'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep >= 3 ? 'bg-gold-500 text-obsidian-950' : 'bg-obsidian-800 text-neutral-500'
                }`}
              >
                3
              </div>
              <span>Your Details</span>
            </div>
          </div>
        </div>

        {/* Wizard Form Container */}
        <div className="glass-gold-panel rounded-3xl p-6 sm:p-10 border border-gold-500/30 shadow-2xl">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {errorMessage}
            </div>
          )}

          {/* STEP 1: Select Service */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Select Consultation Experience</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Both in-store and home options include hospital-grade refraction and pressure analysis.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((svc) => {
                  const Icon = svc.icon;
                  const isSelected = formData.serviceType === svc.id;
                  return (
                    <div
                      key={svc.id}
                      onClick={() => handleServiceSelect(svc.id)}
                      className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gold-500/15 border-gold-400 shadow-gold-sm'
                          : 'bg-obsidian-900 border-white/10 hover:border-gold-500/30'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`p-3 rounded-xl ${
                              isSelected ? 'bg-gold-500 text-obsidian-950' : 'bg-obsidian-800 text-gold-400'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/40 text-gold-400 border border-gold-500/20">
                            {svc.badge}
                          </span>
                        </div>

                        <h4 className="text-base font-serif font-bold text-white">{svc.title}</h4>
                        <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{svc.subtitle}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
                        <span>Duration: {svc.duration}</span>
                        <span className="text-emerald-400 font-bold">100% Free</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-3.5 rounded-full bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest flex items-center space-x-2 shadow-gold-sm hover:scale-105 transition-all"
                >
                  <span>Select Date &amp; Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Date & Slot */}
          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Select Appointment Schedule</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Choose a preferred date within the next 14 days and convenient time window.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Picker Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Appointment Date</span>
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500"
                  />
                  <p className="text-[11px] text-neutral-500">
                    Appointments are accommodated 7 days a week from 10:00 AM to 8:00 PM.
                  </p>
                </div>

                {/* Time Slots */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Available Time Slot</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                    {timeSlots.map((slot) => {
                      const isSelected = formData.timeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeSlot: slot })}
                          className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                            isSelected
                              ? 'bg-gold-500 text-obsidian-950 font-bold border-gold-400 shadow-sm'
                              : 'bg-obsidian-850 text-neutral-300 border-white/10 hover:border-gold-500/40'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 rounded-full bg-obsidian-850 border border-white/10 text-neutral-300 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-3.5 rounded-full bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest flex items-center space-x-2 shadow-gold-sm hover:scale-105 transition-all"
                >
                  <span>Customer Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Customer Details */}
          {currentStep === 3 && (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Guest Information</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  We will dispatch instant SMS and WhatsApp appointment confirmations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-gold-400" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="e.g. Lord Julian Vance"
                    className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center space-x-1.5">
                    <Phone className="w-3.5 h-3.5 text-gold-400" />
                    <span>Phone Number (for SMS &amp; WhatsApp) *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-gold-400" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="julian.vance@example.com"
                    className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                {formData.serviceType === 'Home Eye Test' && (
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-400" />
                      <span>Residence / Office Address (for Doorstep Visit) *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Penthouse 4B, 742 Evergreen Terrace, Luxury District"
                      className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>
                )}

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    Optical Notes or Preferred Frames to Sample:
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Current power is -2.50 with mild astigmatism. Please bring titanium aviators."
                    className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 rounded-full bg-obsidian-850 border border-white/10 text-neutral-300 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-full bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest flex items-center space-x-2 shadow-gold-md hover:scale-105 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span>Registering with Optometrist...</span>
                  ) : (
                    <>
                      <span>Confirm Free Appointment</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmationData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass-gold-panel border border-gold-500/40 rounded-3xl p-8 text-center z-10 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block mb-1">
                Booking Reference: {confirmationData.referenceCode}
              </span>
              <h2 className="text-2xl font-serif font-light text-white">Your Examination is Scheduled</h2>
              <p className="text-xs text-neutral-300 mt-2 font-light">
                Thank you, <strong>{confirmationData.customerName}</strong>. Optom. Akash Arjun Sawant has reserved
                your session at our Ratnagiri Studio.
              </p>

              <div className="my-6 p-4 rounded-2xl bg-black/50 border border-white/5 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Service:</span>
                  <span className="font-medium text-white">{confirmationData.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Date:</span>
                  <span className="font-medium text-white">{confirmationData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Time Window:</span>
                  <span className="font-medium text-champagne">{confirmationData.timeSlot}</span>
                </div>
                {confirmationData.address && (
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Address / Notes:</span>
                    <span className="font-medium text-white truncate max-w-[200px]">
                      {confirmationData.address}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2.5">
                <a
                  href={getWhatsAppConfirmationMessage(confirmationData)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-full bg-champagne hover:bg-champagne-light text-obsidian-950 font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Confirmation to WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setConfirmationData(null);
                    setCurrentStep(1);
                  }}
                  className="w-full py-3 px-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 text-xs font-light transition-colors"
                >
                  Close &amp; Return to Studio
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
