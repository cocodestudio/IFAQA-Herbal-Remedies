'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { assembleCustomerOrder, placeCustomerOrder } from '@/lib/orders-service';
import { PaymentMethod, ShippingAddress } from '@/lib/types';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { Button3D } from '@/components/ui/Button3D';
import { validateE164Phone, validatePostalCode } from '@/lib/formatters';
import { Lock, AlertCircle, ShieldCheck, MapPin, Phone, User, Mail } from 'lucide-react';

export function CheckoutForm() {
  const router = useRouter();
  const { items, activeCurrency, clearCart } = useCart();
  const { user } = useAuth();

  const [recipientName, setRecipientName] = useState(user?.displayName || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phoneNumber || '+91 ');
  const [customerEmail, setCustomerEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('India');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError('Your shopping cart is empty. Please select products from the catalog.');
      return;
    }

    const cleanPhone = customerPhone.trim().replace(/\s+/g, '');
    // Standard phone validation: accepts +91... or standard 10 digit number
    const formattedPhone = cleanPhone.startsWith('+') ? cleanPhone : `+91${cleanPhone.replace(/^0+/, '')}`;
    if (!validateE164Phone(formattedPhone)) {
      setError('Please provide a valid 10-digit mobile number (e.g. +91 98765 43210).');
      return;
    }

    if (recipientName.trim().length < 2) {
      setError('Please enter your full name (at least 2 characters).');
      return;
    }

    if (streetAddress.trim().length < 5) {
      setError('Please enter your complete delivery address with house/flat number.');
      return;
    }

    if (!city.trim()) {
      setError('Please enter your city.');
      return;
    }

    if (!stateProvince.trim()) {
      setError('Please enter your state.');
      return;
    }

    if (!validatePostalCode(postalCode)) {
      setError('Please enter a valid 6-digit PIN code.');
      return;
    }

    setLoading(true);

    try {
      const shippingAddress: ShippingAddress = {
        recipientName: recipientName.trim(),
        streetAddress: streetAddress.trim(),
        city: city.trim(),
        stateProvince: stateProvince.trim(),
        postalCode: postalCode.trim(),
        country: country.trim() || 'India',
      };

      const orderPayload = assembleCustomerOrder({
        customer: {
          uid: user?.uid || 'guest',
          name: recipientName.trim(),
          phone: formattedPhone,
          email: customerEmail.trim() || undefined,
        },
        shippingAddress,
        items: items.map(item => ({
          remedyId: item.remedyId,
          sku: item.sku,
          name: item.name,
          urduName: item.urduName,
          unitPrice: activeCurrency === 'USD' ? item.unitPriceUSD : item.unitPrice,
          quantity: item.quantity,
          totalPrice: (activeCurrency === 'USD' ? item.unitPriceUSD : item.unitPrice) * item.quantity,
          image: item.image,
        })),
        currency: activeCurrency,
        paymentMethod,
        discount: 0,
      });

      const res = await placeCustomerOrder(orderPayload);
      clearCart();
      router.push(`/order-confirmation?orderNumber=${res.orderNumber}&orderId=${res.orderId}`);
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred while placing your order. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-ifaqa-sand/60 p-5 sm:p-8 shadow-sm">
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-l-red-800 text-red-950 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-800 shrink-0 mt-0.5" />
          <div className="leading-relaxed font-medium">{error}</div>
        </div>
      )}

      {/* 1. Recipient & Contact Details */}
      <div>
        <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-ifaqa-plum mb-4 border-b border-ifaqa-sand/40 pb-2 flex items-center gap-2">
          <User className="w-4 h-4 text-emerald-800" />
          <span>1. Customer & Contact Details</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-serif font-bold uppercase tracking-wider text-ifaqa-plum mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-ifaqa-sand/70 text-ifaqa-plum text-xs focus:outline-none focus:border-ifaqa-plum focus:bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-serif font-bold uppercase tracking-wider text-ifaqa-plum mb-1.5">
              Mobile Number (For Delivery Updates) *
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-ifaqa-sand/70 text-ifaqa-plum text-xs font-mono focus:outline-none focus:border-ifaqa-plum focus:bg-white"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-serif font-bold uppercase tracking-wider text-ifaqa-plum mb-1.5">
              Email Address (Optional - For Invoices & Tracking)
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="customer@email.com"
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-ifaqa-sand/70 text-ifaqa-plum text-xs focus:outline-none focus:border-ifaqa-plum focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* 2. Delivery Address */}
      <div>
        <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-ifaqa-plum mb-4 border-b border-ifaqa-sand/40 pb-2 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-800" />
          <span>2. Delivery Address</span>
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-serif font-bold uppercase tracking-wider text-ifaqa-plum mb-1.5">
              Complete Street Address (Flat / House No., Landmark) *
            </label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              placeholder="e.g. Flat 302, Green Valley Apartments, MG Road"
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-ifaqa-sand/70 text-ifaqa-plum text-xs focus:outline-none focus:border-ifaqa-plum focus:bg-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-ifaqa-plum mb-1.5">
                City *
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. New Delhi"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-ifaqa-sand/70 text-ifaqa-plum text-xs focus:outline-none focus:border-ifaqa-plum focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-ifaqa-plum mb-1.5">
                State *
              </label>
              <input
                type="text"
                value={stateProvince}
                onChange={(e) => setStateProvince(e.target.value)}
                placeholder="e.g. Delhi"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-ifaqa-sand/70 text-ifaqa-plum text-xs focus:outline-none focus:border-ifaqa-plum focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-ifaqa-plum mb-1.5">
                PIN Code *
              </label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="e.g. 110001"
                maxLength={10}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-ifaqa-sand/70 text-ifaqa-plum text-xs font-mono focus:outline-none focus:border-ifaqa-plum focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-ifaqa-plum mb-1.5">
                Country *
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="India"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-ifaqa-sand/70 text-ifaqa-plum text-xs focus:outline-none focus:border-ifaqa-plum focus:bg-white"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Payment Method (NEFT Removed, only UPI/Cards & COD) */}
      <div>
        <PaymentMethodSelector
          selected={paymentMethod}
          onChange={setPaymentMethod}
          currency={activeCurrency}
        />
      </div>

      {/* Submit Order Button */}
      <div className="pt-4 border-t border-ifaqa-sand/40 space-y-3">
        <Button3D
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading || items.length === 0}
          className="w-full shadow-lg font-bold"
        >
          <Lock className="w-4 h-4 mr-2" />
          {loading ? 'Processing Order...' : 'Confirm & Place Order'}
        </Button3D>

        <p className="text-xs text-center text-ifaqa-blackberry font-sans flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
          <span>Instant Order Confirmation & Tracking SMS sent to your mobile.</span>
        </p>
      </div>
    </form>
  );
}
