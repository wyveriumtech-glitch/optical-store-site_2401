'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Glasses,
  Tag,
  Star,
  BookOpen,
  LogOut,
  ExternalLink,
  ShieldAlert,
  Menu,
  X,
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState(null);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  useEffect(() => {
    // Only check auth on client
    const token = localStorage.getItem('eyelitz_admin_token');
    const user = localStorage.getItem('eyelitz_admin_user');
    if (!token && !pathname.includes('/login')) {
      router.push('/admin/login');
    } else if (user) {
      try {
        setAdminUser(JSON.parse(user));
      } catch (e) {}
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('eyelitz_admin_token');
    localStorage.removeItem('eyelitz_admin_user');
    router.push('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Eye Appointments', href: '/admin/appointments', icon: Calendar },
    { name: 'Products Catalog', href: '/admin/products', icon: Glasses },
    { name: 'Offers & Promos', href: '/admin/offers', icon: Tag },
    { name: 'Customer Reviews', href: '/admin/reviews', icon: Star },
    { name: 'Blog Publications', href: '/admin/blogs', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-obsidian-950 flex flex-col md:flex-row text-neutral-100">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-obsidian-900 border-b border-gold-500/20 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Glasses className="w-5 h-5 text-gold-400" />
          <span className="font-serif font-bold text-white text-base">EYELITZ ADMIN</span>
        </div>
        <button
          onClick={() => setMobileSidebar(!mobileSidebar)}
          className="p-2 text-neutral-300 hover:text-white"
        >
          {mobileSidebar ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 z-30 h-screen w-64 bg-obsidian-900 border-r border-gold-500/20 p-6 flex flex-col justify-between transition-transform duration-300 ${
          mobileSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-8">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gold-gradient p-[1.5px] shadow-gold-sm">
              <div className="w-full h-full bg-obsidian-950 rounded-[10px] flex items-center justify-center">
                <Glasses className="w-5 h-5 text-gold-400" />
              </div>
            </div>
            <div>
              <span className="text-lg font-serif font-bold tracking-wider text-white block">
                EYELITZ
              </span>
              <span className="text-[9px] uppercase tracking-widest text-gold-400 font-semibold block -mt-1">
                Admin Control
              </span>
            </div>
          </div>

          {/* User badge */}
          <div className="p-3 rounded-2xl bg-obsidian-850 border border-white/5 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-400 font-bold text-xs flex items-center justify-center">
              AD
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-semibold text-white block truncate">
                {adminUser?.username || 'Administrator'}
              </span>
              <span className="text-[10px] text-emerald-400 block">● Session Active</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileSidebar(false)}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-gold-500 text-obsidian-950 font-bold shadow-gold-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs text-neutral-400 hover:text-gold-400 hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Public Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
