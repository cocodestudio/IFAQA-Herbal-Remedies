'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquarePlus,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { AccountShell } from '@/components/account/AccountShell';
import { useAuth } from '@/context/AuthContext';
import {
  SupportTicket,
  createSupportTicket,
  getSupportTickets,
  syncCustomerAccountFromDb,
} from '@/lib/account-storage';
import { getCustomerOrders } from '@/lib/orders-service';
import { CustomerOrder } from '@/lib/types';
import { Button3D } from '@/components/ui/Button3D';

function SupportContent() {
  const searchParams = useSearchParams();
  const initialOrder = searchParams.get('order') || '';
  const { user } = useAuth();

  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [category, setCategory] = useState('Order Status & Tracking');
  const [orderNumber, setOrderNumber] = useState(initialOrder);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [createdBanner, setCreatedBanner] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;
    setTickets(getSupportTickets(user.uid));
    syncCustomerAccountFromDb(user.uid).then(() => {
      setTickets(getSupportTickets(user.uid));
    });
    getCustomerOrders(user.uid, user.phoneNumber).then(setOrders);
  }, [user]);

  useEffect(() => {
    if (initialOrder) {
      setOrderNumber(initialOrder);
    }
  }, [initialOrder]);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;
    setError(null);

    if (subject.trim().length < 4) {
      setError('Enter a brief subject for your support request.');
      return;
    }
    if (message.trim().length < 10) {
      setError('Describe your query in at least 10 characters.');
      return;
    }

    const updated = createSupportTicket(user.uid, {
      category,
      orderNumber: orderNumber.trim() || undefined,
      subject: subject.trim(),
      message: message.trim(),
    });
    setTickets(updated);
    setSubject('');
    setMessage('');
    setCreatedBanner(true);
    setTimeout(() => setCreatedBanner(false), 3000);
  };

  const faqs = [
    {
      q: 'How long does Pan-India courier dispatch take?',
      a: 'Orders are prepared and sealed cleanly at our Saharanpur dispensary within 24–48 hours (Mon–Sat) and typically arrive within 4–7 working days across India.',
    },
    {
      q: 'How are refunds processed if an order is cancelled?',
      a: 'Prepaid refunds return to the original payment method. For COD order cancellations or returns, refunds are sent to your primary Saved UPI ID or Bank Account.',
    },
    {
      q: 'Can I confirm herbal dosage before ordering?',
      a: 'Yes, call our Saharanpur support desk on +91 97298 40336 (Mon–Sat, 9 AM – 6 PM) or raise a dosage inquiry ticket below.',
    },
  ];

  return (
    <AccountShell
      title="Help & Support"
      subtitle="Submit an order inquiry, dosage question, or refund request directly to our Saharanpur dispensary desk."
    >
      {/* Verified Contact Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <a
          href="tel:+919729840336"
          className="bg-white rounded-xl border border-ifaqa-plum/10 hover:border-ifaqa-plum/25 p-5 shadow-luxury-card space-y-1.5 transition-colors"
        >
          <Phone className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
          <div className="text-xs text-[#5A6962]">Customer helpline (Mon–Sat)</div>
          <div className="text-sm font-mono font-semibold text-ifaqa-plum tabular-nums" dir="ltr">
            +91 97298 40336
          </div>
        </a>

        <a
          href="mailto:support@ifaqa.in"
          className="bg-white rounded-xl border border-ifaqa-plum/10 hover:border-ifaqa-plum/25 p-5 shadow-luxury-card space-y-1.5 transition-colors"
        >
          <Mail className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
          <div className="text-xs text-[#5A6962]">Email support</div>
          <div className="text-xs sm:text-sm font-medium text-ifaqa-plum break-all" dir="ltr">
            support@ifaqa.in
          </div>
        </a>

        <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-5 shadow-luxury-card space-y-1.5">
          <MapPin className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
          <div className="text-xs text-[#5A6962]">Dispensary address</div>
          <div className="text-xs text-ifaqa-plum leading-relaxed">
            Near Mandi Wali Masjid, Bartha Kayasth Pather, Saharanpur - 247231
          </div>
        </div>
      </div>

      {/* Create Support Ticket */}
      <form
        onSubmit={handleSubmitTicket}
        className="bg-white rounded-xl border border-ifaqa-plum/10 p-6 shadow-luxury-card space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-ifaqa-plum/10">
          <div className="flex items-center gap-2.5">
            <MessageSquarePlus className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
            <h2 className="font-serif text-xl text-ifaqa-plum">Raise a support request</h2>
          </div>
          {createdBanner && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#E8F3EE] text-[#165A45] text-xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
              Request logged
            </span>
          )}
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-900 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-700 shrink-0" strokeWidth={1.5} />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
              Issue category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum bg-white"
            >
              <option>Order Status & Tracking</option>
              <option>Refund & Bank / UPI Transfer</option>
              <option>Damaged or Missing Item</option>
              <option>Dosage & Formulation Query</option>
              <option>General Feedback</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
              Related order number (Optional)
            </label>
            {orders.length > 0 ? (
              <select
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full h-11 px-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm font-mono text-ifaqa-plum bg-white"
              >
                <option value="">None selected</option>
                {orders.map((o) => (
                  <option key={o.id} value={o.orderNumber}>
                    {o.orderNumber}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. IFA-2026-1049"
                className="w-full h-11 px-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm font-mono text-ifaqa-plum bg-white"
              />
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
              Subject *
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief summary of your question or issue"
              className="w-full h-11 px-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
              Message details *
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your query, preferred call-back timing, or batch details..."
              className="w-full p-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum bg-white resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button3D type="submit" variant="primary" size="md">
            Submit support request
          </Button3D>
        </div>
      </form>

      {/* Support Ticket History */}
      {tickets.length > 0 && (
        <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-6 shadow-luxury-card space-y-4">
          <h2 className="font-serif text-xl text-ifaqa-plum">Your recent requests</h2>
          <div className="space-y-3">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-lg border border-ifaqa-plum/10 bg-ifaqa-linen/50 space-y-1.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-ifaqa-plum">
                      {t.id}
                    </span>
                    <span className="text-xs text-[#5A6962]">· {t.category}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-ifaqa-cashmere text-ifaqa-plum text-[11px] font-medium">
                    <Clock className="w-3 h-3" strokeWidth={1.5} />
                    {t.status}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-ifaqa-plum">{t.subject}</h3>
                <p className="text-xs text-[#5A6962] leading-relaxed">{t.message}</p>
                {t.orderNumber && (
                  <p className="text-[11px] font-mono text-[#5A6962]">
                    Order Ref: {t.orderNumber}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Help Questions */}
      <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-6 shadow-luxury-card space-y-4">
        <h2 className="font-serif text-xl text-ifaqa-plum">Frequently asked questions</h2>
        <div className="divide-y divide-ifaqa-plum/10">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-3.5 first:pt-1 last:pb-1 space-y-1">
              <h3 className="text-sm font-semibold text-ifaqa-plum">{faq.q}</h3>
              <p className="text-xs text-[#5A6962] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </AccountShell>
  );
}

export default function AccountSupportPage() {
  return (
    <Suspense fallback={<div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-14 text-sm text-[#5A6962]">Loading support center...</div>}>
      <SupportContent />
    </Suspense>
  );
}
