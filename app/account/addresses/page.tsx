'use client';

import React, { useEffect, useState } from 'react';
import { MapPin, Plus, Trash2, Check, Edit3, Home, Briefcase, Building2, AlertCircle, type LucideIcon } from 'lucide-react';
import { AccountShell } from '@/components/account/AccountShell';
import { useAuth } from '@/context/AuthContext';
import {
  CustomerSavedAddress,
  getSavedAddresses,
  saveAddresses,
} from '@/lib/account-storage';
import { validateE164Phone, validatePostalCode } from '@/lib/formatters';
import { Button3D } from '@/components/ui/Button3D';

const EMPTY_FORM: Omit<CustomerSavedAddress, 'id' | 'isDefault'> = {
  label: 'Home',
  recipientName: '',
  phone: '+91 ',
  streetAddress: '',
  apartmentSuite: '',
  city: '',
  stateProvince: '',
  postalCode: '',
  country: 'India',
  deliveryInstructions: '',
};

export default function AccountAddressesPage() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<CustomerSavedAddress[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [makeDefault, setMakeDefault] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.uid) return;
    setAddresses(getSavedAddresses(user.uid));
  }, [user]);

  const openAddForm = () => {
    setEditingId(null);
    setForm({
      ...EMPTY_FORM,
      recipientName: user?.displayName && user.displayName !== 'Customer' ? user.displayName : '',
      phone: user?.phoneNumber || '+91 ',
    });
    setMakeDefault(addresses.length === 0);
    setError(null);
    setShowForm(true);
  };

  const openEditForm = (addr: CustomerSavedAddress) => {
    setEditingId(addr.id);
    setForm({
      label: addr.label,
      recipientName: addr.recipientName,
      phone: addr.phone,
      streetAddress: addr.streetAddress,
      apartmentSuite: addr.apartmentSuite || '',
      city: addr.city,
      stateProvince: addr.stateProvince,
      postalCode: addr.postalCode,
      country: addr.country || 'India',
      deliveryInstructions: addr.deliveryInstructions || '',
    });
    setMakeDefault(addr.isDefault);
    setError(null);
    setShowForm(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;
    setError(null);

    if (form.recipientName.trim().length < 2) {
      setError('Enter the recipient full name.');
      return;
    }

    const cleanPhone = form.phone.trim().replace(/\s+/g, '');
    const formattedPhone = cleanPhone.startsWith('+')
      ? cleanPhone
      : `+91${cleanPhone.replace(/^0+/, '')}`;
    if (!validateE164Phone(formattedPhone)) {
      setError('Enter a valid 10-digit Indian mobile number (e.g. +91 98765 43210).');
      return;
    }

    if (form.streetAddress.trim().length < 5) {
      setError('Enter complete house number, street, or locality.');
      return;
    }
    if (!form.city.trim() || !form.stateProvince.trim()) {
      setError('Enter both city and state.');
      return;
    }
    if (!validatePostalCode(form.postalCode)) {
      setError('Enter a valid 6-digit PIN code.');
      return;
    }

    const newItem: CustomerSavedAddress = {
      ...form,
      id: editingId || `addr_${Date.now()}`,
      phone: formattedPhone,
      recipientName: form.recipientName.trim(),
      streetAddress: form.streetAddress.trim(),
      city: form.city.trim(),
      stateProvince: form.stateProvince.trim(),
      postalCode: form.postalCode.trim(),
      country: form.country.trim() || 'India',
      isDefault: makeDefault || addresses.length === 0,
    };

    let updated: CustomerSavedAddress[];
    if (editingId) {
      updated = addresses.map((a) => (a.id === editingId ? newItem : a));
    } else {
      updated = [newItem, ...addresses];
    }

    if (newItem.isDefault) {
      updated = updated.map((a) => ({ ...a, isDefault: a.id === newItem.id }));
    }

    setAddresses(updated);
    saveAddresses(user.uid, updated);
    setShowForm(false);
    setEditingId(null);
  };

  const handleSetDefault = (id: string) => {
    if (!user?.uid) return;
    const updated = addresses.map((a) => ({ ...a, isDefault: a.id === id }));
    setAddresses(updated);
    saveAddresses(user.uid, updated);
  };

  const handleDelete = (id: string) => {
    if (!user?.uid) return;
    let updated = addresses.filter((a) => a.id !== id);
    if (updated.length > 0 && !updated.some((a) => a.isDefault)) {
      updated = updated.map((a, idx) => ({ ...a, isDefault: idx === 0 }));
    }
    setAddresses(updated);
    saveAddresses(user.uid, updated);
  };

  const labelIcons: Record<string, LucideIcon> = {
    Home,
    Work: Briefcase,
    Dispensary: Building2,
  };

  return (
    <AccountShell
      title="Saved Addresses"
      subtitle="Save home, clinic, or workplace addresses so checkout fills automatically across India."
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-[#5A6962] tabular-nums">
          {addresses.length} {addresses.length === 1 ? 'address' : 'addresses'} saved
        </span>
        {!showForm && (
          <button
            type="button"
            onClick={openAddForm}
            className="h-10 px-4 rounded-lg bg-ifaqa-plum text-ifaqa-linen hover:bg-ifaqa-blackberry text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            <span>Add new address</span>
          </button>
        )}
      </div>

      {/* Add / Edit Address Form */}
      {showForm && (
        <form
          onSubmit={handleSave}
          className="bg-white rounded-xl border border-ifaqa-plum/15 p-6 shadow-luxury-card space-y-5"
        >
          <div className="flex items-center justify-between pb-3 border-b border-ifaqa-plum/10">
            <h2 className="font-serif text-xl text-ifaqa-plum">
              {editingId ? 'Edit delivery address' : 'Add delivery address'}
            </h2>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-xs text-[#5A6962] hover:text-ifaqa-plum underline"
            >
              Cancel
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-900 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-700 shrink-0" strokeWidth={1.5} />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-ifaqa-plum mb-2">
              Address label
            </label>
            <div className="flex flex-wrap gap-2">
              {(['Home', 'Work', 'Dispensary'] as const).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setForm({ ...form, label: tag })}
                  className={`h-9 px-4 rounded-lg text-xs font-medium border transition-colors ${
                    form.label === tag
                      ? 'bg-ifaqa-plum text-ifaqa-linen border-ifaqa-plum'
                      : 'bg-white text-[#5A6962] border-ifaqa-plum/15 hover:bg-ifaqa-cashmere'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                Recipient Full Name *
              </label>
              <input
                type="text"
                value={form.recipientName}
                onChange={(e) => setForm({ ...form, recipientName: e.target.value })}
                placeholder="Full name"
                className="w-full h-11 px-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                Mobile Number *
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                dir="ltr"
                placeholder="+91 98765 43210"
                className="w-full h-11 px-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm font-mono text-ifaqa-plum tabular-nums"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                House No., Building, Street & Locality *
              </label>
              <input
                type="text"
                value={form.streetAddress}
                onChange={(e) => setForm({ ...form, streetAddress: e.target.value })}
                placeholder="Flat / House number, Street, Mohalla"
                className="w-full h-11 px-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                City / Town *
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="e.g. Saharanpur"
                className="w-full h-11 px-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                State *
              </label>
              <input
                type="text"
                value={form.stateProvince}
                onChange={(e) => setForm({ ...form, stateProvince: e.target.value })}
                placeholder="e.g. Uttar Pradesh"
                className="w-full h-11 px-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                6-Digit PIN Code *
              </label>
              <input
                type="text"
                maxLength={6}
                value={form.postalCode}
                onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                placeholder="247231"
                dir="ltr"
                className="w-full h-11 px-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm font-mono text-ifaqa-plum tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                Landmark (Optional)
              </label>
              <input
                type="text"
                value={form.apartmentSuite || ''}
                onChange={(e) => setForm({ ...form, apartmentSuite: e.target.value })}
                placeholder="Near Masjid / Post Office"
                className="w-full h-11 px-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum"
              />
            </div>
          </div>

          <label className="flex items-center gap-2.5 text-xs text-ifaqa-plum cursor-pointer">
            <input
              type="checkbox"
              checked={makeDefault}
              onChange={(e) => setMakeDefault(e.target.checked)}
              className="w-4 h-4 accent-[#0B2D22] rounded"
            />
            <span>Make this my default delivery address at checkout</span>
          </label>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button3D type="submit" variant="primary" size="md">
              {editingId ? 'Save address changes' : 'Save address'}
            </Button3D>
          </div>
        </form>
      )}

      {/* Address Cards */}
      {addresses.length === 0 && !showForm ? (
        <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-10 text-center shadow-luxury-card space-y-4">
          <div className="w-12 h-12 rounded-xl bg-ifaqa-cashmere text-[#5A6962] flex items-center justify-center mx-auto">
            <MapPin className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl text-ifaqa-plum">No saved addresses yet</h2>
            <p className="text-sm text-[#5A6962] max-w-md mx-auto">
              Save your home or clinic delivery address once for faster herbal checkout.
            </p>
          </div>
          <button
            type="button"
            onClick={openAddForm}
            className="h-10 px-5 rounded-lg bg-ifaqa-plum text-ifaqa-linen hover:bg-ifaqa-blackberry text-sm font-medium inline-flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            <span>Add delivery address</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => {
            const LabelIcon = labelIcons[addr.label] || MapPin;
            return (
              <div
                key={addr.id}
                className={`bg-white rounded-xl border p-5 shadow-luxury-card flex flex-col justify-between gap-4 ${
                  addr.isDefault ? 'border-ifaqa-plum/30' : 'border-ifaqa-plum/10'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-ifaqa-cashmere text-ifaqa-plum text-xs font-medium">
                      <LabelIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>{addr.label}</span>
                    </span>
                    {addr.isDefault && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#E8F3EE] text-[#165A45] text-[11px] font-medium">
                        <Check className="w-3 h-3" strokeWidth={2} />
                        Default
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-ifaqa-plum">
                      {addr.recipientName}
                    </h3>
                    <p className="text-xs font-mono text-[#5A6962] tabular-nums mt-0.5" dir="ltr">
                      {addr.phone}
                    </p>
                  </div>

                  <p className="text-xs text-[#3E524A] leading-relaxed">
                    {addr.streetAddress}
                    {addr.apartmentSuite ? `, ${addr.apartmentSuite}` : ''}
                    <br />
                    {addr.city}, {addr.stateProvince} -{' '}
                    <span className="font-mono font-medium tabular-nums">{addr.postalCode}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-ifaqa-plum/10 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => openEditForm(addr)}
                      className="text-ifaqa-plum hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      <Edit3 className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(addr.id)}
                      className="text-[#5A6962] hover:text-red-700 inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>Delete</span>
                    </button>
                  </div>

                  {!addr.isDefault && (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-xs font-medium text-[#165A45] hover:underline"
                    >
                      Set as default
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AccountShell>
  );
}
