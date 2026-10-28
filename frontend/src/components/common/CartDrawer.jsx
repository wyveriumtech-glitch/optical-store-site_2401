'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageSquare, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    isDrawerOpen,
    setIsDrawerOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    generateWhatsAppCheckoutUrl,
    clearCart,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isCheckoutDone, setIsCheckoutDone] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'FESTIVEGOLD') {
      applyCoupon('FESTIVEGOLD', 25);
    } else if (code === 'TWINGOLD') {
      applyCoupon('TWINGOLD', 50);
    } else if (code === 'LUXE20') {
      applyCoupon('LUXE20', 20);
    } else {
      setCouponError('Invalid coupon. Try "FESTIVEGOLD" or "LUXE20"');
    }
  };

  const handleSimulatedCheckout = () => {
    setIsCheckoutDone(true);
    setTimeout(() => {
      clearCart();
      setIsCheckoutDone(false);
      setIsDrawerOpen(false);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-obsidian-900 border-l border-gold-500/20 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-obsidian-850">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/30">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif tracking-wider text-white">Your Optical Bag</h2>
                    <p className="text-xs text-neutral-400">
                      {cart.length} {cart.length === 1 ? 'item' : 'items'} selected
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 mb-4">
                      <ShoppingBag className="w-8 h-8 opacity-70" />
                    </div>
                    <h3 className="text-lg font-medium text-neutral-200">Your bag is empty</h3>
                    <p className="text-sm text-neutral-400 mt-1 max-w-xs">
                      Explore our handcrafted luxury frames and bespoke optical lenses.
                    </p>
                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="mt-6 px-6 py-2.5 rounded-full border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-obsidian-950 transition-all font-medium text-sm tracking-wide"
                    >
                      Browse Frames
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Free shipping banner */}
                    <div className="p-3 rounded-lg bg-gold-500/10 border border-gold-500/20 text-xs text-gold-300 flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 flex-shrink-0 text-gold-400" />
                      <span>Complimentary insured luxury packaging & domestic courier.</span>
                    </div>

                    {cart.map((item) => (
                      <div
                        key={item.cartItemId}
                        className="p-4 rounded-xl bg-obsidian-800 border border-white/5 flex gap-4 relative group hover:border-gold-500/30 transition-colors"
                      >
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-black/40 flex-shrink-0 border border-white/10">
                          <img
                            src={item.images?.[0] || 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80'}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white text-sm truncate">{item.name}</h4>
                          <p className="text-xs text-gold-400 font-medium mt-0.5">
                            ₹{(item.discountPrice > 0 ? item.discountPrice : item.price).toLocaleString('en-IN')}
                            {item.discountPrice > 0 && (
                              <span className="text-neutral-500 line-through ml-2">₹{item.price.toLocaleString('en-IN')}</span>
                            )}
                          </p>

                          {item.lensOption && (
                            <p className="text-[11px] text-neutral-400 mt-1 line-clamp-1">
                              Lens: {item.lensOption.name}
                              {item.lensOption.price > 0 && ` (+₹${item.lensOption.price.toLocaleString('en-IN')})`}
                            </p>
                          )}

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-white/10 rounded-md bg-obsidian-850 px-2 py-0.5 space-x-3">
                              <button
                                onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                className="text-neutral-400 hover:text-white transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-semibold text-white">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                className="text-neutral-400 hover:text-white transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.cartItemId)}
                              className="text-neutral-500 hover:text-rose-400 p-1 transition-colors"
                              title="Remove"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Footer Checkout actions */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-obsidian-850 space-y-4">
                  {/* Coupon section */}
                  <div>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-gold-500/10 border border-gold-500/30 rounded-lg p-2.5 text-xs text-gold-300">
                        <div className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-gold-400" />
                          <span>
                            Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% off)
                          </span>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-neutral-400 hover:text-rose-400 text-xs font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Promo code (e.g. FESTIVEGOLD)"
                          className="flex-1 bg-obsidian-800 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-gold-500"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-neutral-800 text-neutral-200 hover:bg-gold-500 hover:text-obsidian-950 font-medium rounded-lg text-xs transition-colors"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                    {couponError && <p className="text-[11px] text-rose-400 mt-1">{couponError}</p>}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-neutral-400">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-gold-400">
                        <span>Discount ({appliedCoupon.code})</span>
                        <span>-₹{discount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-neutral-400">
                      <span>Shipping</span>
                      <span className="text-emerald-400">Complimentary</span>
                    </div>
                    <div className="flex justify-between text-base font-serif font-bold text-white pt-2 border-t border-white/10">
                      <span>Estimated Total</span>
                      <span className="text-gold-400">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  {isCheckoutDone ? (
                    <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-center text-emerald-300 text-sm font-medium animate-pulse">
                      Order simulated successfully! Processing your optical kit...
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {/* WhatsApp Checkout */}
                      <a
                        href={generateWhatsAppCheckoutUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium text-sm flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-emerald-500/20"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Order Directly on WhatsApp</span>
                      </a>

                      {/* Direct Simulated Checkout */}
                      <button
                        onClick={handleSimulatedCheckout}
                        className="w-full py-3 px-4 bg-gold-gradient hover:opacity-90 text-obsidian-950 font-bold rounded-xl text-sm flex items-center justify-center space-x-2 transition-all shadow-gold-sm"
                      >
                        <span>Proceed to Secure Checkout</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
