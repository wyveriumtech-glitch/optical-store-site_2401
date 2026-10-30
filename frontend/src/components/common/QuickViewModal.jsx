'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Star, Shield, Glasses, MessageSquare, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function QuickViewModal({ product, isOpen, onClose }) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedLens, setSelectedLens] = useState({ name: 'Standard Zero Power Clear', price: 0 });

  if (!isOpen || !product) return null;

  const lensOptions = [
    { name: 'Standard Clear (Plano 0.00 / Fashion)', price: 0, tag: 'Included' },
    { name: 'Zeiss Blue-Cut Digital Shield', price: 2400, tag: 'Most Popular' },
    { name: 'Transitions Gen S Photochromic', price: 4800, tag: 'Auto Sun Tint' },
    { name: 'Freeform Ultra-Thin Progressive', price: 7500, tag: 'Multi-Focus' },
  ];

  const handleAddToCart = () => {
    addToCart(product, selectedLens);
    onClose();
  };

  const currentPrice = product.discountPrice > 0 ? product.discountPrice : product.price;

  const getWhatsAppProductLink = () => {
    const text = `Hello OptoArtist Studio, I am interested in the *${product.name}* (₹${currentPrice.toLocaleString('en-IN')}). Can you confirm availability for in-studio trial? Link: http://localhost:3000/product/${product.slug || product._id}`;
    return `https://wa.me/919921333609?text=${encodeURIComponent(text)}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-obsidian-850 border border-gold-500/30 rounded-3xl overflow-hidden shadow-2xl z-10 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-obsidian-900/80 text-neutral-400 hover:text-white border border-white/10 hover:border-gold-500/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Images */}
            <div className="p-6 sm:p-8 bg-obsidian-900/90 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/5 mb-4 group">
                <img
                  src={product.images?.[selectedImage] || product.images?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.featured && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-gold-gradient text-obsidian-950 font-bold text-[10px] tracking-widest uppercase rounded-full shadow-md">
                    Signature Edition
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                        selectedImage === idx ? 'border-gold-500 scale-105' : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info & Actions */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center space-x-2 text-[10px] text-champagne mb-1 font-medium tracking-[0.25em] uppercase">
                  <span>{product.atelier || 'Atelier Signature'}</span>
                  <span>•</span>
                  <span>{product.category}</span>
                  <span>•</span>
                  <span>{product.frameShape}</span>
                </div>

                <h3 className="text-2xl font-serif font-light text-white tracking-wide">{product.name}</h3>

                {/* Rating */}
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex text-champagne">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-champagne text-champagne" />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-400 font-light">
                    {product.rating || 4.9} ({product.reviewCount || 24} clinical reviews)
                  </span>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline space-x-3 mt-4">
                  <span className="text-2xl sm:text-3xl font-light font-serif text-champagne">
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </span>
                  {product.discountPrice > 0 && (
                    <span className="text-sm text-neutral-500 line-through">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discountPrice > 0 && (
                    <span className="text-[10px] bg-rose-500/15 border border-rose-500/30 text-rose-300 px-2 py-0.5 rounded-full font-medium">
                      Save ₹{(product.price - product.discountPrice).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-300 mt-3 leading-relaxed font-light">{product.description}</p>

                {/* Specs */}
                {product.specs && (
                  <div className="mt-4 p-3 bg-[#141419] rounded-xl border border-white/[0.06] grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <span className="text-neutral-500 block text-[9px] uppercase tracking-wider">Lens Width</span>
                      <span className="font-medium text-white">{product.specs.lensWidth} mm</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[9px] uppercase tracking-wider">Bridge Width</span>
                      <span className="font-medium text-white">{product.specs.bridgeWidth} mm</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[9px] uppercase tracking-wider">Temple Length</span>
                      <span className="font-medium text-white">{product.specs.templeLength} mm</span>
                    </div>
                  </div>
                )}

                {/* Lens Selection */}
                <div className="mt-5">
                  <label className="text-[11px] font-medium uppercase tracking-[0.2em] text-champagne/90 block mb-2">
                    Ophthalmic Lens Package:
                  </label>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {lensOptions.map((lens) => (
                      <button
                        key={lens.name}
                        onClick={() => setSelectedLens(lens)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                          selectedLens.name === lens.name
                            ? 'bg-champagne/15 border-champagne text-white'
                            : 'bg-[#141419] border-white/[0.06] text-neutral-300 hover:border-champagne/40'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                              selectedLens.name === lens.name ? 'border-champagne bg-champagne' : 'border-neutral-600'
                            }`}
                          >
                            {selectedLens.name === lens.name && <Check className="w-2.5 h-2.5 text-obsidian-950 font-bold" />}
                          </div>
                          <span className="text-xs">{lens.name}</span>
                        </div>
                        <span className="text-champagne font-medium text-xs">
                          {lens.price > 0 ? `+₹${lens.price.toLocaleString('en-IN')}` : 'Included'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-6 rounded-full bg-champagne hover:bg-champagne-light text-obsidian-950 font-semibold text-xs tracking-[0.2em] uppercase flex items-center justify-center space-x-2 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag (₹{(currentPrice + selectedLens.price).toLocaleString('en-IN')})</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={getWhatsAppProductLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] text-white font-medium text-xs flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-champagne" />
                    <span>WhatsApp Inquiry</span>
                  </a>

                  <Link
                    href={`/product/${product.slug || product._id}`}
                    onClick={onClose}
                    className="py-2.5 px-4 rounded-full bg-transparent hover:bg-white/[0.03] text-neutral-300 border border-white/[0.08] font-light text-xs flex items-center justify-center transition-colors"
                  >
                    <span>Full Details Page →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
