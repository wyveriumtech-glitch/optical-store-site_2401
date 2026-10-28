'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, MessageSquare, Eye, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import QuickViewModal from '@/components/common/QuickViewModal';

export default function FeaturedSlider({ products = [] }) {
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const { addToCart } = useCart();

  const featuredList = (products && products.length > 0)
    ? products.slice(0, 6)
    : [];

  const getWhatsAppProductLink = (prod) => {
    const price = prod.discountPrice || prod.price;
    const msg = `Hello OptoArtist, I am inquiring about the *${prod.name}* (₹${price.toLocaleString('en-IN')}). Is this available for trial? Link: http://localhost:3000/product/${prod.slug || prod._id}`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section className="py-24 bg-obsidian-950 border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* OptoArtist Style Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400/90 font-light block mb-2">
              The Collection
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-white font-normal tracking-tight">
              Premium Eyewear
            </h2>
          </div>

          <Link
            href="/shop"
            className="text-xs uppercase tracking-[0.18em] text-neutral-400 hover:text-gold-300 font-light flex items-center space-x-1.5 transition-colors group"
          >
            <span>View All Frames</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Clean Editorial Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredList.map((item, i) => {
            const currentPrice = item.discountPrice > 0 ? item.discountPrice : item.price;
            const originalPrice = item.price;
            const atelierName = item.atelier || (item.category === 'Sunglasses' ? 'Noir Atelier' : 'Heritage');

            return (
              <motion.div
                key={item._id || i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex flex-col justify-between"
              >
                <div>
                  {/* Image Frame */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-obsidian-900 border border-white/[0.06] group-hover:border-gold-400/30 transition-all duration-500 mb-4">
                    <img
                      src={item.images?.[0] || 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80'}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Secondary Image on Hover */}
                    {item.images?.[1] && (
                      <img
                        src={item.images[1]}
                        alt=""
                        className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    )}

                    {/* Subtle Quick View Button */}
                    <button
                      onClick={() => setActiveModalProduct(item)}
                      className="absolute bottom-3 right-3 p-2 rounded-full bg-obsidian-950/80 backdrop-blur-md border border-white/10 text-neutral-300 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                      title="Quick View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Clean Minimal Typography */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-light block">
                      {atelierName}
                    </span>

                    <Link href={`/product/${item.slug || item._id}`}>
                      <h3 className="font-serif text-lg text-white group-hover:text-gold-300 transition-colors font-medium">
                        {item.name}
                      </h3>
                    </Link>

                    {/* Clean INR Price */}
                    <div className="flex items-baseline space-x-2 pt-0.5">
                      <span className="font-sans text-sm font-normal text-white">
                        ₹{currentPrice.toLocaleString('en-IN')}
                      </span>
                      {item.discountPrice > 0 && (
                        <span className="font-sans text-xs text-neutral-500 line-through">
                          ₹{originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subtle Action Row */}
                <div className="pt-3 mt-3 border-t border-white/[0.04] flex items-center justify-between">
                  <button
                    onClick={() => addToCart(item)}
                    className="text-[11px] uppercase tracking-wider text-neutral-400 hover:text-gold-300 font-light flex items-center space-x-1 transition-colors"
                  >
                    <ShoppingBag className="w-3 h-3 text-gold-400" />
                    <span>Add to Bag</span>
                  </button>

                  <a
                    href={getWhatsAppProductLink(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 transition-colors font-light"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Enquire</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={activeModalProduct}
        isOpen={!!activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </section>
  );
}
