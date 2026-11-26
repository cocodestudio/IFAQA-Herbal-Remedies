'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button3D } from '@/components/ui/Button3D';
import { CheckCircle2, Printer, ArrowRight, MapPin } from 'lucide-react';
import { getOrderById } from '@/lib/orders-service';
import { CustomerOrder } from '@/lib/types';
import { formatPriceINR, formatPriceUSD } from '@/lib/formatters';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'IFA-2026-1001';
  const orderId = searchParams.get('orderId') || '';

  const [order, setOrder] = useState<CustomerOrder | null>(null);

  useEffect(() => {
    if (!orderId) return;
    getOrderById(orderId).then((loaded) => {
      if (loaded) setOrder(loaded);
    });
  }, [orderId]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const formattedTotal = order
    ? order.currency === 'USD'
      ? formatPriceUSD(order.totalAmount)
      : formatPriceINR(order.totalAmount)
    : null;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-12 md:py-16 select-none font-sans">
      <div className="bg-white rounded-2xl border border-ifaqa-plum/10 p-6 sm:p-10 shadow-luxury-card text-center space-y-6">
        <div className="w-12 h-12 rounded-xl mx-auto bg-[#E8F3EE] text-[#165A45] flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <h1 className="font-serif font-normal text-3xl sm:text-4xl text-ifaqa-plum">
            Order confirmed
          </h1>
          <p className="text-sm text-[#5A6962] max-w-md mx-auto leading-relaxed">
            Your order has been saved and received at our Saharanpur dispensary for dispatch.
          </p>
        </div>

        {/* Order Reference Box */}
        <div className="p-5 rounded-xl bg-ifaqa-cashmere/70 border border-ifaqa-plum/10 inline-block text-start min-w-[260px] max-w-full">
          <span className="text-xs font-sans text-[#5A6962] block">
            Order reference
          </span>
          <span className="font-mono text-2xl font-medium text-ifaqa-plum block mt-1 tabular-nums" dir="ltr">
            {order?.orderNumber || orderNumber}
          </span>
          {formattedTotal && (
            <span className="text-xs text-ifaqa-plum font-mono font-semibold block mt-1 tabular-nums">
              Total paid / due: {formattedTotal}
            </span>
          )}
        </div>

        {/* Live Saved Order Summary if available */}
        {order && (
          <div className="text-start bg-ifaqa-linen rounded-xl border border-ifaqa-plum/10 p-4 space-y-3 text-xs">
            <div className="flex items-start gap-2 text-[#3E524A]">
              <MapPin className="w-4 h-4 text-[#5A6962] shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <span className="font-semibold text-ifaqa-plum block">
                  Delivering to {order.shippingAddress.recipientName}
                </span>
                <span>
                  {order.shippingAddress.streetAddress}, {order.shippingAddress.city},{' '}
                  {order.shippingAddress.stateProvince} - {order.shippingAddress.postalCode}
                </span>
              </div>
            </div>
            <div className="border-t border-ifaqa-plum/10 pt-2.5 space-y-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-[#3E524A]">
                  <span className="truncate pe-3">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-mono tabular-nums shrink-0">
                    {order.currency === 'USD'
                      ? formatPriceUSD(item.totalPrice)
                      : formatPriceINR(item.totalPrice)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fulfillment Pipeline */}
        <div className="pt-6 border-t border-ifaqa-plum/10 max-w-md mx-auto">
          <h4 className="text-xs font-sans font-medium text-[#5A6962] mb-4">
            Fulfillment stages
          </h4>
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-sans">
            <div className="space-y-1.5">
              <div className="w-7 h-7 rounded-lg mx-auto bg-ifaqa-plum text-ifaqa-linen flex items-center justify-center font-mono text-xs">
                1
              </div>
              <span className="text-ifaqa-plum font-medium block">Received</span>
            </div>
            <div className="space-y-1.5">
              <div className="w-7 h-7 rounded-lg mx-auto bg-ifaqa-cashmere text-[#5A6962] border border-ifaqa-plum/10 flex items-center justify-center font-mono text-xs">
                2
              </div>
              <span className="text-[#5A6962] block">Packed</span>
            </div>
            <div className="space-y-1.5">
              <div className="w-7 h-7 rounded-lg mx-auto bg-ifaqa-linen text-[#5A6962] border border-ifaqa-plum/10 flex items-center justify-center font-mono text-xs">
                3
              </div>
              <span className="text-[#5A6962] block">Dispatched</span>
            </div>
            <div className="space-y-1.5">
              <div className="w-7 h-7 rounded-lg mx-auto bg-ifaqa-linen text-[#5A6962] border border-ifaqa-plum/10 flex items-center justify-center font-mono text-xs">
                4
              </div>
              <span className="text-[#5A6962] block">Delivered</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto h-10 px-5 rounded-lg bg-white border border-ifaqa-plum/15 text-ifaqa-plum text-sm font-sans font-medium hover:bg-ifaqa-cashmere transition-colors inline-flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
            <span>Print receipt</span>
          </button>
          <Link href="/account/orders" className="w-full sm:w-auto">
            <Button3D variant="secondary" size="md" className="w-full sm:w-auto">
              View in My Orders
            </Button3D>
          </Link>
          <Link href="/catalog" className="w-full sm:w-auto">
            <Button3D variant="primary" size="md" className="w-full sm:w-auto">
              <span>Continue shopping</span>
              <ArrowRight className="w-4 h-4 ms-2 rtl-flip" strokeWidth={1.5} />
            </Button3D>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto px-4 py-16 text-center text-[#5A6962] text-sm font-sans">
          Loading order details...
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
