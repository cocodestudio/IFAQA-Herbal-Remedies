'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { HerbalRemedy, OrderItem } from '@/lib/types';
import { calculateShippingFee } from '@/lib/orders-service';
import { roundUsdCents } from '@/lib/formatters';

export interface CartLineItem extends OrderItem {
  unitPriceUSD: number;
  maxStock: number;
}

interface CartContextType {
  items: CartLineItem[];
  isOpen: boolean;
  activeCurrency: 'PKR' | 'USD';
  setActiveCurrency: (currency: 'PKR' | 'USD') => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (remedy: HerbalRemedy, quantity?: number) => void;
  decrementItem: (remedyId: string) => void;
  updateQuantity: (remedyId: string, quantity: number) => void;
  removeItem: (remedyId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotalPKR: number;
  subtotalUSD: number;
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLineItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeCurrency, setActiveCurrency] = useState<'PKR' | 'USD'>('PKR');
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ifaqa_cart_items');
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedCurr = localStorage.getItem('ifaqa_active_currency');
      if (storedCurr === 'USD' || storedCurr === 'PKR') {
        setActiveCurrency(storedCurr);
      }
    } catch (_) {
      // Local storage unavailable or malformed
    }
    setIsHydrated(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('ifaqa_cart_items', JSON.stringify(items));
      localStorage.setItem('ifaqa_active_currency', activeCurrency);
    } catch (_) {}
  }, [items, activeCurrency, isHydrated]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen(prev => !prev);

  const addToCart = (remedy: HerbalRemedy, quantity: number = 1) => {
    if (!remedy.isAvailable || remedy.stockQuantity <= 0) {
      throw new Error(`REMEDY_UNAVAILABLE: ${remedy.name} is currently out of stock.`);
    }

    setItems(currentItems => {
      const existingIndex = currentItems.findIndex(i => i.remedyId === remedy.id);
      if (existingIndex > -1) {
        const existing = currentItems[existingIndex];
        const newQty = existing.quantity + quantity;
        if (newQty > remedy.stockQuantity) {
          throw new Error(`STOCK_LIMIT_EXCEEDED: Cannot add ${quantity} more. Only ${remedy.stockQuantity} in stock.`);
        }
        const updated = [...currentItems];
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
          totalPrice: newQty * existing.unitPrice,
        };
        return updated;
      } else {
        if (quantity > remedy.stockQuantity) {
          throw new Error(`STOCK_LIMIT_EXCEEDED: Requested ${quantity} exceeds available stock of ${remedy.stockQuantity}.`);
        }
        const newItem: CartLineItem = {
          remedyId: remedy.id,
          sku: remedy.sku,
          name: remedy.name,
          urduName: remedy.urduName,
          unitPrice: remedy.pricePKR,
          unitPriceUSD: remedy.priceUSD,
          quantity,
          totalPrice: quantity * remedy.pricePKR,
          image: remedy.primaryImage,
          maxStock: remedy.stockQuantity,
          size: remedy.packaging?.size,
        };
        return [...currentItems, newItem];
      }
    });

    // Auto-open sliding drawer on add-to-cart
    setIsOpen(true);
  };

  const decrementItem = (remedyId: string) => {
    setItems(currentItems => {
      const index = currentItems.findIndex(i => i.remedyId === remedyId);
      if (index === -1) return currentItems;
      const item = currentItems[index];
      if (item.quantity > 1) {
        const updated = [...currentItems];
        updated[index] = {
          ...item,
          quantity: item.quantity - 1,
          totalPrice: (item.quantity - 1) * item.unitPrice,
        };
        return updated;
      }
      return currentItems.filter(i => i.remedyId !== remedyId);
    });
  };

  const updateQuantity = (remedyId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(remedyId);
      return;
    }
    setItems(currentItems => {
      return currentItems.map(item => {
        if (item.remedyId !== remedyId) return item;
        const cappedQty = Math.min(quantity, item.maxStock);
        return {
          ...item,
          quantity: cappedQty,
          totalPrice: cappedQty * item.unitPrice,
        };
      });
    });
  };

  const removeItem = (remedyId: string) => {
    setItems(currentItems => currentItems.filter(i => i.remedyId !== remedyId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotalPKR = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

  const subtotalUSD = items.reduce((sum, item) => {
    return sum + roundUsdCents(item.unitPriceUSD, item.quantity);
  }, 0);

  const subtotal = activeCurrency === 'USD' ? subtotalUSD : subtotalPKR;
  const shippingFee = calculateShippingFee(subtotal, activeCurrency);
  const totalAmount = activeCurrency === 'USD'
    ? Math.round((subtotal + shippingFee) * 100) / 100
    : subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        activeCurrency,
        setActiveCurrency,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        decrementItem,
        updateQuantity,
        removeItem,
        clearCart,
        itemCount,
        subtotalPKR,
        subtotalUSD,
        subtotal,
        shippingFee,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
