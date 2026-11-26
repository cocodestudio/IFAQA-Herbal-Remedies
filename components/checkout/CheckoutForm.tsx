'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { assembleCustomerOrder, placeCustomerOrder } from '@/lib/orders-service';
import { PaymentMethod, ShippingAddress } from '@/lib/types';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { Button3D } from '@/components/ui/Button3D';
import { validateE164Phone, validatePostalCode } from '@/lib/formatters';
import { getSavedAddresses, getAccountProfile } from '@/lib/account-storage';
import { triggerNavigationProgress } from '@/lib/nav-progress';
import { Lock, AlertCircle, ShieldCheck, MapPin, User } from 'lucide-react';

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

  useEffect(() => {
    if (!user?.uid) return;
    const savedProfile = getAccountProfile(user.uid);
    const savedAddresses = getSavedAddresses(user.uid);
    const defaultAddr = savedAddresses.find((a) => a.isDefault) || savedAddresses[0];

    if (savedProfile.fullName) {
      setRecipientName((prev) => prev || savedProfile.fullName);
    }
    if (savedProfile.email) {
      setCustomerEmail((prev) => prev || savedProfile.email);
    }
    if (user.phoneNumber) {
      setCustomerPhone((prev) => (prev === '+91 ' || !prev ? user.phoneNumber : prev));
    }

    if (defaultAddr) {
      if (defaultAddr.recipientName) {
        setRecipientName((prev) => prev || defaultAddr.recipientName);
      }
      if (defaultAddr.phone) {
        setCustomerPhone((prev) => (prev === '+91 ' || !prev ? defaultAddr.phone : prev));
      }
      setStreetAddress((prev) => prev || defaultAddr.streetAddress);
      setCity((prev) => prev || defaultAddr.city);
      setStateProvince((prev) => prev || defaultAddr.stateProvince);
      setPostalCode((prev) => prev || defaultAddr.postalCode);
      setCountry((prev) => prev || defaultAddr.country || 'India');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError('Your shopping cart is empty.');
      return;
    }

    const cleanPhone = customerPhone.trim().replace(/\s+/g, '');
    const formattedPhone = cleanPhone.startsWith('+') ? cleanPhone : `+91${cleanPhone.replace(/^0+/, '')}`;
    if (!validateE164Phone(formattedPhone)) {
      setError('Enter a valid 10-digit mobile number (for example +91 98765 43210).');
      return;
    }

    if (recipientName.trim().length < 2) {
      setError('Enter your full name.');
      return;
    }

    if (streetAddress.trim().length < 5) {
      setError('Enter your complete house or street delivery address.');
      return;
    }

    if (!city.trim() || !stateProvince.trim()) {
      setError('Enter both city and state.');
      return;
    }

    if (!validatePostalCode(postalCode)) {
      setError('Enter a valid 6-digit PIN code.');
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
      const targetUrl = `/order-confirmation?orderNumber=${res.orderNumber}&orderId=${res.orderId}`;
      triggerNavigationProgress(targetUrl);
      router.push(targetUrl);
    } catch (err: any) {
      setError(err?.message || 'Unable to place your order. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-xl border border-ifaqa-plum/10 p-5 sm:p-8 shadow-luxury-card font-sans">
      {error && (
        <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" strokeWidth={1.5} />
          <div className="leading-relaxed">{error}</div>
        </div>
      )}

      {/* 1. Customer Details */}
      <div>
        <h3 className="font-sans text-sm font-semibold text-ifaqa-plum mb-4 border-b border-ifaqa-plum/10 pb-2.5 flex items-center gap-2">
          <User className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
          <span>Customer details</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
              Full name
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Rahul Sharma"
              className="w-full h-10 px-3.5 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/15 text-ifaqa-plum text-sm focus:outline-none focus:border-ifaqa-plum focus:bg-white transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
              Mobile number
            </label>
            <input
              type="tel"
              dir="ltr"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full h-10 px-3.5 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/15 text-ifaqa-plum text-sm font-mono focus:outline-none focus:border-ifaqa-plum focus:bg-white transition-colors tabular-nums"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
              Email address (optional)
            </label>
            <input
              type="email"
              dir="ltr"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full h-10 px-3.5 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/15 text-ifaqa-plum text-sm focus:outline-none focus:border-ifaqa-plum focus:bg-white transition-colors"
            />
          </div>
        </div>
      </div>

      {/* 2. Delivery Address */}
      <div>
        <h3 className="font-sans text-sm font-semibold text-ifaqa-plum mb-4 border-b border-ifaqa-plum/10 pb-2.5 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
          <span>Delivery address</span>
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
              House or flat number, street, landmark
            </label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              placeholder="House 42, Gandhi Nagar, Near Central Market"
              className="w-full h-10 px-3.5 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/15 text-ifaqa-plum text-sm focus:outline-none focus:border-ifaqa-plum focus:bg-white transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Saharanpur"
                className="w-full h-10 px-3.5 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/15 text-ifaqa-plum text-sm focus:outline-none focus:border-ifaqa-plum focus:bg-white transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                State
              </label>
              <input
                type="text"
                value={stateProvince}
                onChange={(e) => setStateProvince(e.target.value)}
                placeholder="Uttar Pradesh"
                className="w-full h-10 px-3.5 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/15 text-ifaqa-plum text-sm focus:outline-none focus:border-ifaqa-plum focus:bg-white transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                PIN code
              </label>
              <input
                type="text"
                dir="ltr"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="247231"
                maxLength={10}
                className="w-full h-10 px-3.5 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/15 text-ifaqa-plum text-sm font-mono focus:outline-none focus:border-ifaqa-plum focus:bg-white transition-colors tabular-nums"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                Country
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="India"
                className="w-full h-10 px-3.5 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/15 text-ifaqa-plum text-sm focus:outline-none focus:border-ifaqa-plum focus:bg-white transition-colors"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Payment Method (UPI/Cards & Cash on Delivery only — NEFT removed) */}
      <div>
        <PaymentMethodSelector
          selected={paymentMethod}
          onChange={setPaymentMethod}
          currency={activeCurrency}
        />
      </div>

      <div className="pt-4 border-t border-ifaqa-plum/10 space-y-3">
        <Button3D
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading || items.length === 0}
          className="w-full"
        >
          <Lock className="w-4 h-4 me-2" strokeWidth={1.5} />
          <span>{loading ? 'Processing order' : 'Confirm and place order'}</span>
        </Button3D>

        <p className="text-xs text-center text-[#5A6962] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#165A45]" strokeWidth={1.5} />
          <span>Order confirmation and courier tracking reference sent to your mobile</span>
        </p>
      </div>
    </form>
  );
}
