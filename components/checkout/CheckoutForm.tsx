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
import { Lock, AlertCircle } from 'lucide-react';

export function CheckoutForm() {
  const router = useRouter();
  const { items, activeCurrency, clearCart } = useCart();
  const { user } = useAuth();

  const [recipientName, setRecipientName] = useState(user?.displayName || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phoneNumber || '+92 300 1234567');
  const [customerEmail, setCustomerEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [apartmentSuite, setApartmentSuite] = useState('');
  const [city, setCity] = useState('Lahore');
  const [stateProvince, setStateProvince] = useState('Punjab');
  const [postalCode, setPostalCode] = useState('54000');
  const [country, setCountry] = useState(activeCurrency === 'USD' ? 'United Kingdom' : 'Pakistan');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    activeCurrency === 'USD' ? 'credit_card' : 'cash_on_delivery'
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError('Your dispensary cart is empty. Please select remedies from the catalog.');
      return;
    }

    const cleanPhone = customerPhone.trim().replace(/\s+/g, '');
    if (!validateE164Phone(cleanPhone)) {
      setError('Please provide a valid recipient phone number in international E.164 format (e.g. +923001234567 or +447911123456).');
      return;
    }

    if (!validatePostalCode(postalCode)) {
      setError('Please enter a valid postal/ZIP code (3 to 10 alphanumeric characters).');
      return;
    }

    if (recipientName.trim().length < 2) {
      setError('Recipient name must be at least 2 characters long.');
      return;
    }

    if (streetAddress.trim().length < 5) {
      setError('Street address must be at least 5 characters long.');
      return;
    }

    setLoading(true);

    try {
      const shippingAddress: ShippingAddress = {
        recipientName: recipientName.trim(),
        streetAddress: streetAddress.trim(),
        apartmentSuite: apartmentSuite.trim() || undefined,
        city: city.trim(),
        stateProvince: stateProvince.trim(),
        postalCode: postalCode.trim(),
        country: country.trim(),
      };

      const orderPayload = assembleCustomerOrder({
        customer: {
          uid: user?.uid || 'guest',
          name: recipientName.trim(),
          phone: cleanPhone,
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
    <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-ifaqa-sand/40 p-6 md:p-8 shadow-sm">
      {error && (
        <div className="p-4 bg-red-50 border-l-2 border-l-red-800 text-red-950 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-800 shrink-0 mt-0.5" />
          <div className="leading-relaxed">{error}</div>
        </div>
      )}

      {/* Recipient & Contact Details */}
      <div>
        <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-ifaqa-plum mb-4 border-b border-ifaqa-sand/30 pb-2">
          1. Recipient & Contact Canons
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-serif font-bold uppercase tracking-wider text-ifaqa-plum mb-1.5">
              Recipient Full Name *
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="e.g. Hakim Muhammad Salman"
              className="w-full px-3.5 py-2.5 bg-ifaqa-linen/50 border border-ifaqa-sand/60 text-ifaqa-plum text-xs focus:outline-none focus:border-ifaqa-plum focus:ring-1 focus:ring-ifaqa-plum"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-serif font-bold uppercase tracking-wider text-ifaqa-plum mb-1.5">
              Contact Phone (E.164 International) *
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="+92 300 1234567"
              className="w-full px-3.5 py-2.5 bg-ifaqa-linen/50 border border-ifaqa-sand/60 text-ifaqa-plum text-xs font-mono focus:outline-none focus:border-ifaqa-plum focus:ring-1 focus:ring-ifaqa-plum"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-serif font-bold uppercase tracking-wider text-ifaqa-plum mb-1.5">
              Patron Email Address (Optional for Order Updates)
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="patron@ifaqa-remedies.com"
              className="w-full px-3.5 py-2.5 bg-ifaqa-linen/50 border border-ifaqa-sand/60 text-ifaqa-plum text-xs focus:outline-none focus:border-ifaqa-plum focus:ring-1 focus:ring-ifaqa-plum"
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div>
        <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-ifaqa-plum mb-4 border-b border-ifaqa-sand/30 pb-2">
          2. Delivery Destination
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-serif font-bold uppercase tracking-wider text-ifaqa-plum mb-1.5">
              Street Address & Dawakhana/Building *
            </label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              placeholder="e.g. House 42, Sector C, DHA Phase 5"
              className="w-full px-3.5 py-2.5 bg-ifaqa-linen/50 border border-ifaqa-sand/60 text-ifaqa-plum text-xs focus:outline-none focus:border-ifaqa-plum focus:ring-1 focus:ring-ifaqa-plum"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-ifaqa-plum mb-1.5">
                City *
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Lahore"
                className="w-full px-3.5 py-2.5 bg-ifaqa-linen/50 border border-ifaqa-sand/60 text-ifaqa-plum text-xs focus:outline-none focus:border-ifaqa-plum focus:ring-1 focus:ring-ifaqa-plum"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-ifaqa-plum mb-1.5">
                State / Province *
              </label>
              <input
                type="text"
                value={stateProvince}
                onChange={(e) => setStateProvince(e.target.value)}
                placeholder="Punjab"
                className="w-full px-3.5 py-2.5 bg-ifaqa-linen/50 border border-ifaqa-sand/60 text-ifaqa-plum text-xs focus:outline-none focus:border-ifaqa-plum focus:ring-1 focus:ring-ifaqa-plum"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-ifaqa-plum mb-1.5">
                Postal / ZIP Code *
              </label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="54792"
                className="w-full px-3.5 py-2.5 bg-ifaqa-linen/50 border border-ifaqa-sand/60 text-ifaqa-plum text-xs font-mono focus:outline-none focus:border-ifaqa-plum focus:ring-1 focus:ring-ifaqa-plum"
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
                placeholder="Pakistan"
                className="w-full px-3.5 py-2.5 bg-ifaqa-linen/50 border border-ifaqa-sand/60 text-ifaqa-plum text-xs focus:outline-none focus:border-ifaqa-plum focus:ring-1 focus:ring-ifaqa-plum"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <PaymentMethodSelector
        selected={paymentMethod}
        onChange={setPaymentMethod}
        currency={activeCurrency}
      />

      {/* Submit Button */}
      <div className="pt-4 border-t border-ifaqa-sand/30">
        <Button3D
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading || items.length === 0}
          className="w-full"
        >
          <Lock className="w-4 h-4 mr-2" />
          {loading ? 'Confirming Dispensary Order...' : 'Authorize & Place Order'}
        </Button3D>
        <p className="text-[11px] text-center text-ifaqa-mauve mt-2.5 font-serif">
          Immediate confirmation with tracking reference issued upon placement.
        </p>
      </div>
    </form>
  );
}
