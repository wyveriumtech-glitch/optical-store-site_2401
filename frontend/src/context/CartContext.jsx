'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('eyelitz_cart');
      if (saved) setCart(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem('eyelitz_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToCart = (product, lensOption = null, quantity = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item._id === product._id && item.lensOption?.name === lensOption?.name
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            ...product,
            cartItemId: `${product._id}_${Date.now()}`,
            lensOption: lensOption || { name: 'Standard Zero Power Clear Lenses', price: 0 },
            quantity,
          },
        ];
      }
    });
    setIsDrawerOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  const applyCoupon = (code, discountPercent = 20) => {
    setAppliedCoupon({ code, discountPercent });
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = item.discountPrice > 0 ? item.discountPrice : item.price;
    const lensPrice = item.lensOption?.price || 0;
    return acc + (itemPrice + lensPrice) * item.quantity;
  }, 0);

  const discount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discountPercent) / 100) : 0;
  const total = Math.max(0, subtotal - discount);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // WhatsApp Order message builder
  const generateWhatsAppCheckoutUrl = (customerName = '', customerPhone = '') => {
    const phone = '919876543210'; // Store official contact
    let message = `*✨ OPTOARTIST — NEW EYEWEAR ORDER ENQUIRY*\n`;
    if (customerName) message += `*Customer:* ${customerName} (${customerPhone})\n`;
    message += `--------------------------------\n`;

    cart.forEach((item, i) => {
      const price = item.discountPrice || item.price;
      message += `${i + 1}. *${item.name}* (Qty: ${item.quantity})\n`;
      message += `   • Frame Price: ₹${price.toLocaleString('en-IN')}\n`;
      if (item.lensOption && item.lensOption.price > 0) {
        message += `   • Lens: ${item.lensOption.name} (+₹${item.lensOption.price.toLocaleString('en-IN')})\n`;
      }
      message += `   • Link: http://localhost:3000/product/${item.slug || item._id}\n\n`;
    });

    message += `--------------------------------\n`;
    message += `*Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n`;
    if (appliedCoupon) {
      message += `*Coupon (${appliedCoupon.code}):* -₹${discount.toLocaleString('en-IN')}\n`;
    }
    message += `*Total Order Value:* ₹${total.toLocaleString('en-IN')}\n`;
    message += `\n_Please confirm availability and dispatch timeline for my order._`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isDrawerOpen,
        setIsDrawerOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        appliedCoupon,
        subtotal,
        discount,
        total,
        totalItemsCount,
        generateWhatsAppCheckoutUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
