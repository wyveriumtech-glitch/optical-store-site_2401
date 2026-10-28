'use client';
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Filter,
  Search,
  ShoppingBag,
  MessageSquare,
  Eye,
  Star,
  Sparkles,
  SlidersHorizontal,
  X,
  RotateCcw,
} from 'lucide-react';
import { api } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import QuickViewModal from '@/components/common/QuickViewModal';
import { FadeIn, SlideUp } from '@/components/animations/MotionWrappers';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialShape = searchParams.get('frameShape') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedAtelier, setSelectedAtelier] = useState('All');
  const [selectedShape, setSelectedShape] = useState(initialShape);
  const [selectedGender, setSelectedGender] = useState('All');
  const [priceTier, setPriceTier] = useState('All');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.getProducts();
        if (res.success && res.data) {
          setProducts(res.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Sync with searchParams
  useEffect(() => {
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category'));
    if (searchParams.get('frameShape')) setSelectedShape(searchParams.get('frameShape'));
    if (searchParams.get('search')) setSearchQuery(searchParams.get('search'));
  }, [searchParams]);

  const categories = ['All', 'Eyeglasses', 'Sunglasses', 'Contact Lenses', 'Kids', 'Accessories'];
  const ateliers = ['All', 'Noir Atelier', 'Riviera', 'Heritage', 'Minimal', 'Atelier Clear', 'Clinic'];
  const frameShapes = ['All', 'Aviator', 'Square', 'Round', 'Cat-Eye', 'Geometric', 'Rimless', 'Clubmaster'];
  const genders = ['All', 'Men', 'Women', 'Unisex', 'Kids'];
  const priceTiers = [
    { label: 'All Prices', value: 'All' },
    { label: 'Under ₹5,000', min: 0, max: 5000, value: 'tier1' },
    { label: '₹5,000 – ₹10,000', min: 5000, max: 10000, value: 'tier2' },
    { label: '₹10,000 – ₹15,000', min: 10000, max: 15000, value: 'tier3' },
    { label: '₹15,000+', min: 15000, max: 999999, value: 'tier4' },
  ];

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedAtelier('All');
    setSelectedShape('All');
    setSelectedGender('All');
    setPriceTier('All');
    setSearchQuery('');
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'All' && p.category.toLowerCase() !== selectedCategory.toLowerCase())
          return false;
        if (selectedAtelier !== 'All' && p.atelier?.toLowerCase() !== selectedAtelier.toLowerCase())
          return false;
        if (selectedShape !== 'All' && p.frameShape?.toLowerCase() !== selectedShape.toLowerCase())
          return false;
        if (selectedGender !== 'All') {
          if (p.gender !== selectedGender && p.gender !== 'Unisex') return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchAtelier = p.atelier && p.atelier.toLowerCase().includes(q);
          const matchTags = p.tags && p.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchAtelier && !matchTags) return false;
        }
        if (priceTier !== 'All') {
          const tier = priceTiers.find((t) => t.value === priceTier);
          if (tier) {
            const price = p.discountPrice > 0 ? p.discountPrice : p.price;
            if (price < tier.min || price > tier.max) return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        const pA = a.discountPrice > 0 ? a.discountPrice : a.price;
        const pB = b.discountPrice > 0 ? b.discountPrice : b.price;
        if (sortBy === 'price-low') return pA - pB;
        if (sortBy === 'price-high') return pB - pA;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0; // featured/default
      });
  }, [products, selectedCategory, selectedAtelier, selectedShape, selectedGender, priceTier, searchQuery, sortBy]);

  const getWhatsAppProductLink = (prod) => {
    const price = prod.discountPrice || prod.price;
    const msg = `Hello OptoArtist Studio, I would like to inquire about the *${prod.name}* (₹${price.toLocaleString('en-IN')}). Is this piece available for in-studio trial? Link: http://localhost:3000/product/${prod.slug || prod._id}`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-obsidian-950 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-12 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs text-neutral-400 mb-3">
            <Link href="/" className="hover:text-champagne transition-colors">
              Studio
            </Link>
            <span>/</span>
            <span className="text-champagne font-medium tracking-wide">The Collection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight">
            Curated Eyewear <span className="italic font-normal text-champagne">Collection</span>
          </h1>
          <p className="text-neutral-400 text-sm mt-2.5 max-w-xl font-light leading-relaxed">
            Japanese titanium, Mazzucchelli block acetate, and clinician-calibrated prescription compatibility curated by Optom. Akash Arjun Sawant.
          </p>
        </div>

        {/* Search, Sort and Mobile Filter Toggle */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0e0e12] border border-white/[0.08] mb-8">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-champagne absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by model, Noir Atelier, Riviera, titanium, aviator..."
              className="w-full bg-[#141419] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-champagne/60 transition-colors"
            />
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-4 py-2.5 rounded-xl bg-[#141419] border border-white/[0.08] text-neutral-200 text-xs font-semibold flex items-center space-x-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-champagne" />
              <span>Filters</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#141419] border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-champagne/60"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Clinical Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <div className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1`}>
            <div className="bg-[#0e0e12] rounded-3xl p-6 border border-white/[0.08] sticky top-28 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <h3 className="font-serif text-base text-white flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-champagne" />
                  <span>Refine Atelier</span>
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-xs text-neutral-400 hover:text-champagne flex items-center space-x-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Category */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-champagne/90 block mb-2.5">
                  Category
                </label>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        selectedCategory === cat
                          ? 'bg-champagne/15 text-champagne font-semibold border border-champagne/30'
                          : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Atelier Line Filter */}
              <div className="pt-2 border-t border-white/[0.06]">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-champagne/90 block mb-2.5">
                  Atelier / Line
                </label>
                <div className="space-y-1">
                  {ateliers.map((atl) => (
                    <button
                      key={atl}
                      onClick={() => setSelectedAtelier(atl)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        selectedAtelier === atl
                          ? 'text-champagne font-semibold bg-champagne/10'
                          : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'
                      }`}
                    >
                      • {atl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frame Shape */}
              <div className="pt-2 border-t border-white/[0.06]">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-champagne/90 block mb-2.5">
                  Frame Silhouette
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {frameShapes.map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setSelectedShape(shape)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                        selectedShape === shape
                          ? 'bg-champagne text-obsidian-950 font-bold shadow-sm'
                          : 'bg-[#141419] text-neutral-400 border border-white/[0.06] hover:border-champagne/40 hover:text-white'
                      }`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div className="pt-2 border-t border-white/[0.06]">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-champagne/90 block mb-2.5">
                  Gender / Fit
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {genders.map((gen) => (
                    <button
                      key={gen}
                      onClick={() => setSelectedGender(gen)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                        selectedGender === gen
                          ? 'bg-champagne text-obsidian-950 font-bold shadow-sm'
                          : 'bg-[#141419] text-neutral-400 border border-white/[0.06] hover:border-champagne/40 hover:text-white'
                      }`}
                    >
                      {gen}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Tier */}
              <div className="pt-2 border-t border-white/[0.06]">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-champagne/90 block mb-2.5">
                  Price Bracket (INR)
                </label>
                <div className="space-y-1">
                  {priceTiers.map((tier) => (
                    <button
                      key={tier.value}
                      onClick={() => setPriceTier(tier.value)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        priceTier === tier.value
                          ? 'text-champagne font-semibold'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      • {tier.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-10 h-10 border-2 border-champagne border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm text-neutral-400 font-light">Retrieving curated optical pieces...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-[#0e0e12] rounded-3xl p-12 text-center border border-white/[0.06]">
                <p className="text-lg text-neutral-200 font-serif">No frames match your current criteria</p>
                <p className="text-xs text-neutral-400 mt-2 max-w-sm mx-auto font-light">
                  Try adjusting your atelier or shape filters, or reset to explore our full Ratnagiri studio collection.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2.5 rounded-full bg-champagne text-obsidian-950 font-semibold text-xs uppercase tracking-wider hover:bg-champagne-light transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((item) => {
                  const currentPrice = item.discountPrice > 0 ? item.discountPrice : item.price;
                  return (
                    <div
                      key={item._id}
                      className="group bg-[#0e0e12] rounded-3xl overflow-hidden border border-white/[0.08] hover:border-champagne/40 shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Image Preview */}
                        <div className="relative aspect-[4/3] bg-black/40 overflow-hidden">
                          <img
                            src={item.images?.[0] || 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80'}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />

                          {/* Hover Secondary image */}
                          {item.images?.[1] && (
                            <img
                              src={item.images[1]}
                              alt=""
                              className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            />
                          )}

                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-1">
                            <span className="px-2.5 py-0.5 rounded-full bg-obsidian-950/85 backdrop-blur-md border border-white/[0.08] text-[9px] font-medium tracking-[0.2em] uppercase text-champagne">
                              {item.category}
                            </span>
                            {item.discountPrice > 0 && (
                              <span className="px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[9px] font-medium">
                                Save ₹{(item.price - item.discountPrice).toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>

                          {/* Quick View Button */}
                          <button
                            onClick={() => setActiveModalProduct(item)}
                            className="absolute top-3 right-3 p-2 rounded-full bg-obsidian-950/80 backdrop-blur-md border border-white/10 text-neutral-300 hover:text-champagne hover:border-champagne/50 opacity-0 group-hover:opacity-100 transition-all duration-300"
                            title="Quick View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Product info */}
                        <div className="p-5">
                          <span className="text-[10px] tracking-[0.2em] uppercase text-champagne/80 font-medium block mb-1">
                            {item.atelier || 'Atelier Signature'}
                          </span>

                          <Link href={`/product/${item.slug || item._id}`}>
                            <h3 className="text-xl font-serif font-light text-white group-hover:text-champagne transition-colors truncate">
                              {item.name}
                            </h3>
                          </Link>

                          <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-1">
                            <span>{item.frameShape} • {item.specs?.frameMaterial || 'Titanium'}</span>
                            <div className="flex items-center text-champagne">
                              <Star className="w-3 h-3 fill-champagne mr-1" />
                              <span>{item.rating || 4.9}</span>
                            </div>
                          </div>

                          {item.specs && (
                            <p className="text-[10px] text-neutral-500 mt-1">
                              Lens: {item.specs.lensWidth}mm · Bridge: {item.specs.bridgeWidth}mm
                            </p>
                          )}

                          <div className="flex items-baseline space-x-2 mt-3">
                            <span className="text-lg font-serif font-medium text-champagne">
                              ₹{currentPrice.toLocaleString('en-IN')}
                            </span>
                            {item.discountPrice > 0 && (
                              <span className="text-xs text-neutral-500 line-through">
                                ₹{item.price.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => addToCart(item)}
                          className="py-2.5 px-3 rounded-full bg-champagne hover:bg-champagne-light text-obsidian-950 font-semibold text-[11px] uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </button>

                        <a
                          href={getWhatsAppProductLink(item)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-neutral-200 hover:text-white font-medium text-[11px] flex items-center justify-center space-x-1.5 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3 text-champagne" />
                          <span>Enquire</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={activeModalProduct}
        isOpen={!!activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-obsidian-950 py-20 text-center text-white">Loading Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
