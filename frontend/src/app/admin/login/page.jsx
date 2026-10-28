'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Glasses, Lock, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      const res = await api.login(username, password);
      if (res.success && res.token) {
        localStorage.setItem('eyelitz_admin_token', res.token);
        localStorage.setItem('eyelitz_admin_user', JSON.stringify(res.admin));
        router.push('/admin');
      } else {
        setError(res.message || 'Invalid username or password');
      }
    } catch (err) {
      setError(err.message || 'Error connecting to authentication API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 group mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-gradient p-[1.5px] shadow-gold-md">
              <div className="w-full h-full bg-obsidian-950 rounded-[14px] flex items-center justify-center">
                <Glasses className="w-6 h-6 text-gold-400" />
              </div>
            </div>
            <span className="text-2xl font-serif font-bold tracking-widest text-white">
              EYELITZ<span className="text-gold-400">.</span>
            </span>
          </Link>
          <h1 className="text-2xl font-serif font-bold text-white tracking-wide">
            Haute Optical Management
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Secure administrative control portal for boutique staff and clinical directors.
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-gold-panel rounded-3xl p-8 border border-gold-500/30 shadow-2xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-gold-400" />
                <span>Admin Username</span>
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center space-x-1.5">
                <Lock className="w-3.5 h-3.5 text-gold-400" />
                <span>Password</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500"
              />
            </div>

            {/* Quick Demo Credentials Reminder */}
            <div className="p-3 rounded-xl bg-black/40 border border-gold-500/20 text-[11px] text-neutral-400 flex items-center justify-between">
              <div>
                <span className="text-gold-400 font-bold block">Demo Credentials:</span>
                <span>Username: admin | Password: admin123</span>
              </div>
              <ShieldCheck className="w-4 h-4 text-gold-400 flex-shrink-0" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-gold-sm hover:scale-[1.01] transition-all disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Enter Admin Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-neutral-400 hover:text-gold-400 transition-colors">
            ← Return to Public Boutique Showroom
          </Link>
        </div>
      </div>
    </div>
  );
}
