'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Glasses,
  Tag,
  Star,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { api } from '@/lib/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    const token = localStorage.getItem('eyelitz_admin_token');
    try {
      setLoading(true);
      const res = await api.getStats(token);
      if (res.success && res.data) {
        setStats(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleUpdateStatus = async (appointmentId, newStatus) => {
    const token = localStorage.getItem('eyelitz_admin_token');
    try {
      const res = await api.updateAppointmentStatus(appointmentId, newStatus, token);
      if (res.success) {
        loadStats();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-white tracking-wide">
              Boutique Operations Overview
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Real-time monitoring of eye exam bookings, catalog inventory, and promotional campaigns.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/admin/products"
              className="px-4 py-2.5 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-gold-sm hover:scale-105 transition-all"
            >
              + Add New Frame
            </Link>
            <Link
              href="/admin/offers"
              className="px-4 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-neutral-200 hover:text-white font-semibold text-xs tracking-wider uppercase transition-colors"
            >
              + Create Promo
            </Link>
          </div>
        </div>

        {/* 4 Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-obsidian-900 rounded-3xl p-6 border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">
                Total Appointments
              </span>
              <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-serif font-bold text-white">
                {stats?.totalAppointments || 0}
              </span>
              <span className="text-[11px] text-emerald-400 block mt-1">
                {stats?.confirmedAppointments || 0} confirmed sessions
              </span>
            </div>
          </div>

          <div className="bg-obsidian-900 rounded-3xl p-6 border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
                Pending Bookings
              </span>
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-serif font-bold text-white">
                {stats?.pendingAppointments || 0}
              </span>
              <span className="text-[11px] text-amber-300 block mt-1">
                Awaiting optometrist review
              </span>
            </div>
          </div>

          <div className="bg-obsidian-900 rounded-3xl p-6 border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">
                Vault Products
              </span>
              <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30">
                <Glasses className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-serif font-bold text-white">
                {stats?.totalProducts || 0}
              </span>
              <span className="text-[11px] text-neutral-400 block mt-1">
                Active catalog models
              </span>
            </div>
          </div>

          <div className="bg-obsidian-900 rounded-3xl p-6 border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">
                Active Privileges
              </span>
              <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30">
                <Tag className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-serif font-bold text-white">
                {stats?.activeOffers || 0}
              </span>
              <span className="text-[11px] text-emerald-400 block mt-1">
                Live homepage banners
              </span>
            </div>
          </div>
        </div>

        {/* Recent Appointments Table */}
        <div className="bg-obsidian-900 rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-serif font-bold text-white">Recent Eye Test Bookings</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Quickly confirm, complete, or cancel incoming consultations.
              </p>
            </div>
            <Link
              href="/admin/appointments"
              className="text-xs text-gold-400 hover:text-gold-300 font-semibold flex items-center space-x-1"
            >
              <span>View All Bookings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-neutral-400 text-sm">Loading recent sessions...</div>
          ) : !stats?.recentAppointments || stats.recentAppointments.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 text-sm">No recent bookings recorded.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-neutral-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Ref Code</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Date &amp; Time</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {stats.recentAppointments.map((apt) => (
                    <tr key={apt._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-gold-400">
                        {apt.referenceCode}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white">{apt.customerName}</div>
                        <div className="text-[11px] text-neutral-400">{apt.phone}</div>
                      </td>
                      <td className="py-4 px-4 text-neutral-300">{apt.serviceType}</td>
                      <td className="py-4 px-4">
                        <div className="text-white">{apt.date}</div>
                        <div className="text-[11px] text-neutral-400">{apt.timeSlot}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            apt.status === 'Confirmed'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : apt.status === 'Pending'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : apt.status === 'Completed'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {apt.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right space-x-1">
                        {apt.status !== 'Confirmed' && (
                          <button
                            onClick={() => handleUpdateStatus(apt._id, 'Confirmed')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white transition-colors text-[10px] font-bold"
                          >
                            Confirm
                          </button>
                        )}
                        {apt.status !== 'Completed' && (
                          <button
                            onClick={() => handleUpdateStatus(apt._id, 'Completed')}
                            className="px-2.5 py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white transition-colors text-[10px] font-bold"
                          >
                            Complete
                          </button>
                        )}
                        {apt.status !== 'Cancelled' && (
                          <button
                            onClick={() => handleUpdateStatus(apt._id, 'Cancelled')}
                            className="px-2.5 py-1 rounded-lg bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white transition-colors text-[10px] font-bold"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
