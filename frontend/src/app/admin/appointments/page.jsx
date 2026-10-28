'use client';
import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Filter,
  Eye,
  RefreshCw,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { api } from '@/lib/api';

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedApt, setSelectedApt] = useState(null);

  const loadAppointments = async () => {
    const token = localStorage.getItem('eyelitz_admin_token');
    try {
      setLoading(true);
      const res = await api.getAppointments(statusFilter, token);
      if (res.success && res.data) {
        setAppointments(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [statusFilter]);

  const handleUpdateStatus = async (id, status) => {
    const token = localStorage.getItem('eyelitz_admin_token');
    try {
      const res = await api.updateAppointmentStatus(id, status, token);
      if (res.success) {
        loadAppointments();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this booking?')) return;
    const token = localStorage.getItem('eyelitz_admin_token');
    try {
      const res = await api.deleteAppointment(id, token);
      if (res.success) {
        loadAppointments();
        if (selectedApt?._id === id) setSelectedApt(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredAppointments = appointments.filter((a) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      a.customerName?.toLowerCase().includes(q) ||
      a.phone?.toLowerCase().includes(q) ||
      a.referenceCode?.toLowerCase().includes(q) ||
      a.email?.toLowerCase().includes(q)
    );
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-white tracking-wide">
              Appointments Management
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Confirm or reschedule client vision appointments and home consultations.
            </p>
          </div>

          <button
            onClick={loadAppointments}
            className="px-4 py-2 rounded-xl bg-obsidian-850 border border-white/10 text-neutral-300 hover:text-white text-xs font-semibold flex items-center space-x-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Table</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-obsidian-900 border border-white/10">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
            {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  statusFilter === st
                    ? 'bg-gold-500 text-obsidian-950 shadow-sm'
                    : 'bg-obsidian-850 text-neutral-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by code, name, phone..."
              className="w-full bg-obsidian-850 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-obsidian-900 rounded-3xl border border-white/10 overflow-hidden shadow-xl">
          {loading ? (
            <div className="py-20 text-center text-neutral-400 text-sm">Loading bookings...</div>
          ) : filteredAppointments.length === 0 ? (
            <div className="py-20 text-center text-neutral-500 text-sm">No appointment records match.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-neutral-400 uppercase tracking-wider text-[10px] bg-obsidian-850/50">
                    <th className="py-3.5 px-4">Ref Code</th>
                    <th className="py-3.5 px-4">Customer Details</th>
                    <th className="py-3.5 px-4">Service</th>
                    <th className="py-3.5 px-4">Date &amp; Slot</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredAppointments.map((apt) => (
                    <tr key={apt._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-gold-400">
                        {apt.referenceCode}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white">{apt.customerName}</div>
                        <div className="text-[11px] text-neutral-400">{apt.phone}</div>
                        <div className="text-[10px] text-neutral-500">{apt.email}</div>
                      </td>
                      <td className="py-4 px-4 text-neutral-300">
                        <div className="font-medium text-white">{apt.serviceType}</div>
                        {apt.address && (
                          <div className="text-[11px] text-neutral-400 truncate max-w-xs">
                            📍 {apt.address}
                          </div>
                        )}
                        {apt.notes && (
                          <div className="text-[10px] text-gold-400/90 italic truncate max-w-xs mt-0.5">
                            Note: {apt.notes}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-white font-medium">{apt.date}</div>
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
                      <td className="py-4 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => handleUpdateStatus(apt._id, 'Confirmed')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white transition-colors text-[10px] font-bold"
                          title="Confirm"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(apt._id, 'Completed')}
                          className="px-2.5 py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white transition-colors text-[10px] font-bold"
                          title="Complete"
                        >
                          Done
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(apt._id, 'Cancelled')}
                          className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-rose-600 text-neutral-400 hover:text-white transition-colors text-[10px] font-bold"
                          title="Cancel"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDelete(apt._id)}
                          className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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
