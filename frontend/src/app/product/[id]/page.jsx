'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Star,
  ShieldCheck,
  Glasses,
  MessageSquare,
  ShoppingBag,
  Check,
  ChevronRight,
  Sparkles,
  Ruler,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { api } from '@/lib/api';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedLens, setSelectedLens] = useState({ name: 'Standard Zero Power Clear', price: 0 });
  const { addToCart } = useCart();

  const lensOptions = [
    { name: 'Standard Clear (Fashion / Plano 0.00)', price: 0, tag: 'Included' },
    { name: 'Zeiss Blue-Cut Digital Shield (HEV Block)', price: 2400, tag: 'Bestseller' },
    { name: 'Transitions Gen S Photochromic (UV Darkening)', price: 4800, tag: 'Adaptive' },
    { name: 'Zeiss Digital Freeform Progressive (Multi-Focus)', price: 7500, tag: 'Premium' },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await api.getProduct(id);
        if (res.success && res.data) {
          setProduct(res.data);

          // Also load related products
          const relRes = await api.getProducts({ category: res.data.category });
          if (relRes.success && relRes.data) {
            setRelatedProducts(relRes.data.filter((p) => p._id !== res.data._id).slice(0, 3));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-2 border-champagne border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-neutral-400 font-light">Retrieving bespoke frame specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-serif font-light text-white mb-2">Eyewear Piece Not Found</h2>
        <p className="text-sm text-neutral-400 max-w-sm mb-6">
          The requested frame design may have been archived or is temporarily out of vault.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 rounded-full bg-champagne text-obsidian-950 font-semibold text-xs uppercase tracking-wider"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const currentPrice = product.discountPrice > 0 ? product.discountPrice : product.price;
  const totalPrice = currentPrice + selectedLens.price;

  const getWhatsAppProductLink = () => {
    const text = `Hello OptoArtist Studio! I would like to order/inquire about the *${product.name}* (${product.atelier || 'Atelier Signature'}) with *${selectedLens.name}* (Total: ₹${totalPrice.toLocaleString('en-IN')}). Link: http://localhost:3000/product/${product.slug || product._id}`;
    return `https://wa.me/919921333609?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-obsidian-950 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-neutral-400 mb-8">
          <Link href="/" className="hover:text-gold-400">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-gold-400">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-gold-400">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gold-400 font-medium truncate max-w-xs">{product.name}</span>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Big Main Stage Image with Zoom on Hover */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-obsidian-900 border border-white/10 shadow-2xl group">
              <img
                src={product.images?.[selectedImage] || product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {product.featured && (
                <div className="absolute top-5 left-5">
                  <span className="px-4 py-1.5 rounded-full bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest shadow-md">
                    Signature Masterpiece
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-24 h-24 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      selectedImage === idx
                        ? 'border-gold-500 scale-105 shadow-gold-sm'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Dimensional Specifications Panel */}
            <div className="bg-obsidian-900 rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
              <div className="flex items-center space-x-2 text-gold-400 font-serif font-bold text-sm tracking-wider uppercase">
                <Ruler className="w-4 h-4" />
                <span>Anatomical Frame Proportions</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-obsidian-850 rounded-xl border border-white/5">
                  <span className="text-[10px] uppercase text-neutral-500 block">Lens Width</span>
                  <span className="font-semibold text-white text-sm">{product.specs?.lensWidth || 52} mm</span>
                </div>
                <div className="p-3 bg-obsidian-850 rounded-xl border border-white/5">
                  <span className="text-[10px] uppercase text-neutral-500 block">Bridge Width</span>
                  <span className="font-semibold text-white text-sm">{product.specs?.bridgeWidth || 18} mm</span>
                </div>
                <div className="p-3 bg-obsidian-850 rounded-xl border border-white/5">
                  <span className="text-[10px] uppercase text-neutral-500 block">Temple Length</span>
                  <span className="font-semibold text-white text-sm">{product.specs?.templeLength || 145} mm</span>
                </div>
                <div className="p-3 bg-obsidian-850 rounded-xl border border-white/5">
                  <span className="text-[10px] uppercase text-neutral-500 block">Total Weight</span>
                  <span className="font-semibold text-gold-400 text-sm">
                    {product.specs?.weight || '16g'}
                  </span>
                </div>
              </div>

              <div className="pt-2 text-xs text-neutral-400 space-y-1">
                <p>
                  <strong>Material:</strong> {product.specs?.frameMaterial || 'Pure Japanese Beta-Titanium'}
                </p>
                <p>
                  <strong>Rim Architecture:</strong> {product.specs?.rimType || 'Full Rim Precision Chamfer'}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Pricing, Lens Customizer, CTAs (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-[11px] text-champagne uppercase tracking-[0.25em] font-medium mb-2">
                <span>{product.atelier || 'Atelier Signature'}</span>
                <span>•</span>
                <span>{product.category}</span>
                <span>•</span>
                <span>{product.frameShape}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-light text-white tracking-wide">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mt-3">
                <div className="flex text-champagne">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-champagne text-champagne" />
                  ))}
                </div>
                <span className="text-xs text-neutral-400 font-light">
                  {product.rating || 4.9} ({product.reviewCount || 38} verified clinical reviews)
                </span>
              </div>

              {/* Price display */}
              <div className="flex items-baseline space-x-3 mt-5">
                <span className="text-3xl sm:text-4xl font-serif font-light text-champagne">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </span>
                {product.discountPrice > 0 && (
                  <span className="text-base text-neutral-500 line-through">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discountPrice > 0 && (
                  <span className="text-[11px] bg-rose-500/15 border border-rose-500/30 text-rose-300 px-2.5 py-0.5 rounded-full font-medium">
                    Save ₹{(product.price - product.discountPrice).toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-sm text-neutral-300 mt-4 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Lens Technology Selector */}
            <div className="p-6 rounded-3xl bg-[#0e0e12] border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[11px] uppercase tracking-[0.2em] text-champagne font-medium flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-champagne" />
                  <span>Ophthalmic Lens Package:</span>
                </label>
                <span className="text-[11px] text-neutral-500">Zeiss &amp; Essilor Labs</span>
              </div>

              <div className="space-y-2">
                {lensOptions.map((lens) => {
                  const isSelected = selectedLens.name === lens.name;
                  return (
                    <button
                      key={lens.name}
                      onClick={() => setSelectedLens(lens)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-champagne/15 border-champagne text-white shadow-sm'
                          : 'bg-[#141419] border-white/[0.06] text-neutral-300 hover:border-champagne/40'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-champagne bg-champagne' : 'border-neutral-600'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 text-obsidian-950 font-bold" />}
                        </div>
                        <div>
                          <span className="font-medium text-white">{lens.name}</span>
                          <span className="block text-[10px] text-neutral-400">{lens.tag}</span>
                        </div>
                      </div>
                      <span className="font-semibold text-champagne">
                        {lens.price > 0 ? `+₹${lens.price.toLocaleString('en-IN')}` : 'Included'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => addToCart(product, selectedLens)}
                className="w-full py-4 px-6 rounded-full bg-champagne hover:bg-champagne-light text-obsidian-950 font-semibold text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-3 transition-colors shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag (₹{totalPrice.toLocaleString('en-IN')})</span>
              </button>

              <a
                href={getWhatsAppProductLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] text-white font-medium text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-champagne" />
                <span>WhatsApp Studio Enquiry / Order</span>
              </a>

              <Link
                href="/book-appointment"
                className="w-full py-3 px-6 rounded-full bg-transparent hover:bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.06] font-light text-xs flex items-center justify-center space-x-2 transition-colors"
              >
                <span>Book In-Studio Trial with this Frame →</span>
              </Link>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.08] text-xs text-neutral-400 font-light">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-champagne flex-shrink-0" />
                <span>Complimentary Insured Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-champagne flex-shrink-0" />
                <span>1-Year Complete Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-white/[0.08]">
            <h3 className="text-2xl font-serif font-light text-white mb-8">
              Complementary <span className="italic font-normal text-champagne">Silhouettes</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel._id}
                  href={`/product/${rel.slug || rel._id}`}
                  className="group bg-[#0e0e12] rounded-3xl overflow-hidden border border-white/[0.08] hover:border-champagne/40 p-5 transition-all block"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 mb-4">
                    <img
                      src={rel.images?.[0]}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-champagne/80 font-medium block mb-1">
                    {rel.atelier || 'Atelier Signature'}
                  </span>
                  <h4 className="font-serif font-light text-white group-hover:text-champagne transition-colors truncate">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-champagne font-medium mt-1">
                    ₹{(rel.discountPrice || rel.price).toLocaleString('en-IN')}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
