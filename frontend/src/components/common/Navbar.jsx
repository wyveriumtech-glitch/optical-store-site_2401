'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Glasses,
  Search,
  ShoppingBag,
  Calendar,
  ChevronDown,
  Menu,
  X,
  PhoneCall,
  User,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { totalItemsCount, setIsDrawerOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const categories = [
    { name: 'Optical Eyewear', href: '/shop?category=Eyeglasses', desc: 'Single vision & digital progressive frames' },
    { name: 'Couture Sunglasses', href: '/shop?category=Sunglasses', desc: 'Polarized CR-39 & titanium sunwear' },
    { name: 'Contact Lens Clinic', href: '/shop?category=Contact+Lenses', desc: 'Soft · RGP · Scleral · Ortho-K lenses' },
    { name: 'Pediatric & Kids', href: '/shop?category=Kids', desc: 'Myopia management & flexible frames' },
    { name: 'Atelier Accessories', href: '/shop?category=Accessories', desc: 'Full-grain leather cases & microfiber cloths' },
  ];

  return (
    <>
      {/* Top Quiet Luxury Notice Bar */}
      <div className="bg-obsidian-950 border-b border-white/[0.06] text-[11px] py-2 px-4 tracking-wider">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-neutral-400">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold-400" />
            <span className="text-neutral-300 font-light">
              Ratnagiri Studio · <span className="text-gold-300 font-normal">Couture Eyewear × Clinical Vision Care</span>
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-neutral-400 font-light">
            <Link href="/contact" className="hover:text-gold-300 transition-colors flex items-center space-x-1.5">
              <PhoneCall className="w-3 h-3 text-gold-400" />
              <span>Studio: +91 98765 43210</span>
            </Link>
            <span className="text-neutral-700">|</span>
            <Link
              href="/admin/login"
              className="hover:text-gold-300 transition-colors flex items-center space-x-1 text-gold-400/80 font-normal"
            >
              <User className="w-3 h-3" />
              <span>Clinician Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Clean Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-xl py-3 border-b border-white/[0.08]'
            : 'bg-obsidian-900/90 backdrop-blur-md py-4 border-b border-white/[0.05]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-lg border border-gold-400/40 bg-obsidian-950 flex items-center justify-center group-hover:border-gold-400 transition-colors">
                <Glasses className="w-5 h-5 text-gold-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-serif tracking-[0.18em] text-white flex items-center font-medium">
                  OPTOARTIST
                </span>
                <span className="text-[9px] tracking-[0.3em] text-gold-400/90 uppercase font-light -mt-1">
                  Craft Your Vision
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 text-xs tracking-wider uppercase font-light">
              <Link
                href="/"
                className={`transition-colors hover:text-gold-300 ${
                  pathname === '/' ? 'text-gold-400 font-normal' : 'text-neutral-300'
                }`}
              >
                Home
              </Link>

              {/* Collections with Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCategoryDropdown(true)}
                onMouseLeave={() => setCategoryDropdown(false)}
              >
                <Link
                  href="/shop"
                  className={`flex items-center space-x-1 transition-colors hover:text-gold-300 ${
                    pathname.startsWith('/shop') ? 'text-gold-400 font-normal' : 'text-neutral-300'
                  }`}
                >
                  <span>The Collection</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 transition-transform" />
                </Link>

                {categoryDropdown && (
                  <div className="absolute top-full left-0 w-80 pt-3">
                    <div className="glass-gold-panel rounded-2xl p-3 shadow-2xl space-y-1">
                      {categories.map((c) => (
                        <Link
                          key={c.name}
                          href={c.href}
                          onClick={() => setCategoryDropdown(false)}
                          className="block p-3 rounded-xl hover:bg-gold-500/10 hover:border-gold-500/20 border border-transparent transition-all group"
                        >
                          <div className="font-serif text-sm text-neutral-200 group-hover:text-gold-300">
                            {c.name}
                          </div>
                          <div className="text-[11px] text-neutral-400 font-light mt-0.5 normal-case tracking-normal">
                            {c.desc}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/services"
                className={`transition-colors hover:text-gold-300 ${
                  pathname === '/services' ? 'text-gold-400 font-normal' : 'text-neutral-300'
                }`}
              >
                Vision Care
              </Link>

              <Link
                href="/offers"
                className="relative transition-colors hover:text-gold-300 text-neutral-300 flex items-center space-x-1.5"
              >
                <span>Offers</span>
                <span className="px-1.5 py-0.2 rounded-full bg-gold-500/20 border border-gold-400/30 text-gold-300 text-[8px] font-semibold">
                  Privilege
                </span>
              </Link>

              <Link
                href="/reviews"
                className={`transition-colors hover:text-gold-300 ${
                  pathname === '/reviews' ? 'text-gold-400 font-normal' : 'text-neutral-300'
                }`}
              >
                Testimonials
              </Link>

              <Link
                href="/about"
                className={`transition-colors hover:text-gold-300 ${
                  pathname === '/about' ? 'text-gold-400 font-normal' : 'text-neutral-300'
                }`}
              >
                About
              </Link>

              <Link
                href="/contact"
                className={`transition-colors hover:text-gold-300 ${
                  pathname === '/contact' ? 'text-gold-400 font-normal' : 'text-neutral-300'
                }`}
              >
                Studio
              </Link>
            </nav>

            {/* Right actions: Search, Book CTA, Cart */}
            <div className="flex items-center space-x-4">
              {/* Search Trigger */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-neutral-400 hover:text-white transition-colors"
                title="Search Frames"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Book Eye Exam CTA */}
              <Link
                href="/book-appointment"
                className="hidden sm:inline-flex items-center space-x-2 px-5 py-2 rounded-full border border-gold-400/50 hover:border-gold-400 text-neutral-100 hover:text-gold-300 text-xs tracking-wider uppercase font-light transition-all hover:bg-gold-500/10"
              >
                <Calendar className="w-3.5 h-3.5 text-gold-400" />
                <span>Book Eye Exam</span>
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="relative p-2 text-neutral-300 hover:text-white transition-colors"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-500 text-obsidian-950 text-[10px] font-bold flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile menu hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 lg:hidden text-neutral-300 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search dropdown */}
          {searchOpen && (
            <form onSubmit={handleSearchSubmit} className="mt-3 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by atelier, titanium, pilot, cat-eye, progressive lenses..."
                className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-gold-400"
                autoFocus
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              <button
                type="submit"
                className="absolute right-2.5 top-2 px-3 py-1 bg-gold-500 text-obsidian-950 rounded-lg text-xs font-semibold hover:bg-gold-400 transition-colors"
              >
                Search
              </button>
            </form>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-obsidian-950/98 border-b border-white/[0.08] px-6 py-6 space-y-4">
            <Link
              href="/book-appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-full border border-gold-400/50 text-gold-300 text-center block text-xs tracking-widest uppercase font-light"
            >
              Book Eye Examination
            </Link>

            <div className="space-y-3 pt-2 text-sm font-light">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-white hover:text-gold-300 border-b border-white/5 font-serif text-base"
              >
                The Collection (All Eyewear)
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.name}
                  href={c.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 pl-4 text-xs text-neutral-400 hover:text-gold-300"
                >
                  • {c.name}
                </Link>
              ))}

              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-neutral-200 hover:text-gold-300 border-b border-white/5"
              >
                Vision Care &amp; Clinical Services
              </Link>
              <Link
                href="/offers"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-neutral-200 hover:text-gold-300 border-b border-white/5"
              >
                Seasonal Privileges
              </Link>
              <Link
                href="/reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-neutral-200 hover:text-gold-300 border-b border-white/5"
              >
                Client Testimonials
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-neutral-200 hover:text-gold-300 border-b border-white/5"
              >
                About the Studio
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-neutral-200 hover:text-gold-300 border-b border-white/5"
              >
                Contact &amp; Location
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-xs text-gold-400/80 font-normal pt-2"
              >
                Clinician Portal →
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
