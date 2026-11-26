'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  Search,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Leaf,
  MapPin,
} from 'lucide-react';
import { AccountShell } from '@/components/account/AccountShell';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { getCustomerOrders } from '@/lib/orders-service';
import { CustomerOrder, OrderStatus } from '@/lib/types';
import { formatPriceINR, formatPriceUSD } from '@/lib/formatters';
import seedData from '@/lib/seed-data.json';
import { HerbalRemedy } from '@/lib/types';

type FilterTab = 'all' | 'active' | 'delivered' | 'cancelled';

const STATUS_TIMELINE: OrderStatus[] = [
  'placed',
  'confirmed',
  'dispensing',
  'dispatched',
  'delivered',
];

function getStatusBadge(status: OrderStatus) {
  switch (status) {
    case 'delivered':
      return {
        label: 'Delivered',
        classes: 'bg-[#E8F3EE] text-[#165A45] border-[#165A45]/20',
        icon: CheckCircle2,
      };
    case 'cancelled':
      return {
        label: 'Cancelled',
        classes: 'bg-red-50 text-red-800 border-red-200',
        icon: XCircle,
      };
    case 'dispatched':
      return {
        label: 'Dispatched',
        classes: 'bg-ifaqa-cashmere text-ifaqa-plum border-ifaqa-mauve/40',
        icon: Truck,
      };
    default:
      return {
        label: status.charAt(0).toUpperCase() + status.slice(1),
        classes: 'bg-ifaqa-linen text-ifaqa-plum border-ifaqa-plum/15',
        icon: Clock,
      };
  }
}

export default function AccountOrdersPage() {
  const { user } = useAuth();
  const { addToCart, openCart } = useCart();

  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!user) {
        if (mounted) setLoading(false);
        return;
      }
      setLoading(true);
      const data = await getCustomerOrders(user.uid, user.phoneNumber);
      if (mounted) {
        setOrders(data);
        if (data.length > 0) setExpandedOrderId(data[0].id);
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [user]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (activeTab === 'delivered' && order.orderStatus !== 'delivered') return false;
      if (activeTab === 'cancelled' && order.orderStatus !== 'cancelled') return false;
      if (
        activeTab === 'active' &&
        (order.orderStatus === 'delivered' || order.orderStatus === 'cancelled')
      ) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesNumber = order.orderNumber.toLowerCase().includes(q);
        const matchesItem = order.items.some((item) => item.name.toLowerCase().includes(q));
        return matchesNumber || matchesItem;
      }
      return true;
    });
  }, [orders, activeTab, searchQuery]);

  const handleReorder = (order: CustomerOrder) => {
    const allRemedies = seedData.remedies as unknown as HerbalRemedy[];
    order.items.forEach((item) => {
      const found =
        allRemedies.find((r) => r.id === item.remedyId || r.sku === item.sku) ||
        ({
          id: item.remedyId,
          sku: item.sku,
          name: item.name,
          urduName: item.urduName,
          romanUrduName: item.name,
          slug: item.remedyId,
          categoryId: 'hazim',
          categoryName: 'Herbal Remedy',
          shortDescription: item.name,
          longDescription: item.name,
          therapeuticIndications: [],
          herbalIngredients: [],
          dosageInstructions: {
            amount: 'As directed',
            timing: 'Daily',
            anupana: 'Lukewarm water',
            contraindications: [],
          },
          form: 'Majun',
          packaging: { size: item.size || 'Standard', containerType: 'Sealed Jar' },
          pricePKR: item.unitPrice,
          priceUSD: Math.max(4, Math.round(item.unitPrice / 80)),
          stockQuantity: 10,
          isAvailable: true,
          isFeatured: false,
          isBestSeller: false,
          rating: 5,
          reviewCount: 0,
          images: item.image ? [item.image] : [],
          primaryImage: item.image || '',
        } as HerbalRemedy);

      addToCart(found, item.quantity);
    });
    openCart();
  };

  return (
    <AccountShell
      title="My Orders"
      subtitle="Track delivery progress, inspect itemized totals, and reorder your previous herbal remedies."
    >
      {/* Filter Tabs & Search */}
      <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-4 shadow-luxury-card flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'all', label: `All (${orders.length})` },
              {
                id: 'active',
                label: `In Progress (${orders.filter((o) => o.orderStatus !== 'delivered' && o.orderStatus !== 'cancelled').length})`,
              },
              {
                id: 'delivered',
                label: `Delivered (${orders.filter((o) => o.orderStatus === 'delivered').length})`,
              },
              {
                id: 'cancelled',
                label: `Cancelled (${orders.filter((o) => o.orderStatus === 'cancelled').length})`,
              },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`h-9 px-3.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-ifaqa-plum text-ifaqa-linen'
                  : 'bg-ifaqa-linen text-[#5A6962] hover:text-ifaqa-plum'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#5A6962] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order # or remedy"
            className="w-full h-9 ps-9 pe-3 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-xs text-ifaqa-plum bg-white"
          />
        </div>
      </div>

      {/* Orders List / Empty State */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-ifaqa-plum/10 p-6 h-40 animate-pulse" />
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-10 text-center shadow-luxury-card space-y-4">
          <div className="w-12 h-12 rounded-xl bg-ifaqa-cashmere text-[#5A6962] flex items-center justify-center mx-auto">
            <Package className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl text-ifaqa-plum">
              {orders.length === 0 ? 'No orders placed yet' : 'No matching orders found'}
            </h2>
            <p className="text-sm text-[#5A6962] max-w-md mx-auto">
              {orders.length === 0
                ? 'Orders placed from your account will appear here with courier tracking and itemized receipts.'
                : 'Try clearing the order filter tab or search query.'}
            </p>
          </div>
          <div className="pt-1">
            {orders.length === 0 ? (
              <Link
                href="/catalog"
                className="inline-flex items-center h-10 px-5 rounded-lg bg-ifaqa-plum text-ifaqa-linen hover:bg-ifaqa-blackberry text-sm font-medium transition-colors"
              >
                Browse herbal catalog
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setActiveTab('all');
                  setSearchQuery('');
                }}
                className="inline-flex items-center h-10 px-5 rounded-lg bg-ifaqa-cashmere text-ifaqa-plum text-sm font-medium hover:bg-[#EDE5D5] transition-colors"
              >
                Show all orders
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const statusInfo = getStatusBadge(order.orderStatus);
            const StatusIcon = statusInfo.icon;
            const isExpanded = expandedOrderId === order.id;
            const formattedPrice =
              order.currency === 'USD'
                ? formatPriceUSD(order.totalAmount)
                : formatPriceINR(order.totalAmount);
            const currentStageIndex = STATUS_TIMELINE.indexOf(order.orderStatus);

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-ifaqa-plum/10 shadow-luxury-card overflow-hidden"
              >
                {/* Order Summary Header */}
                <div className="p-4 sm:p-5 bg-ifaqa-linen/70 border-b border-ifaqa-plum/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex flex-wrap items-center gap-5 sm:gap-8">
                    <div>
                      <span className="text-[#5A6962] block">Order ID</span>
                      <span className="font-mono font-semibold text-ifaqa-plum text-sm tabular-nums" dir="ltr">
                        {order.orderNumber}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#5A6962] block">Placed on</span>
                      <span className="font-medium text-ifaqa-plum">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#5A6962] block">Total</span>
                      <span className="font-mono font-semibold text-ifaqa-plum text-sm tabular-nums">
                        {formattedPrice}
                      </span>
                    </div>
                    <div className="hidden sm:block">
                      <span className="text-[#5A6962] block">Deliver to</span>
                      <span className="font-medium text-ifaqa-plum">
                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-medium ${statusInfo.classes}`}
                    >
                      <StatusIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>{statusInfo.label}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                      className="h-8 px-2.5 rounded-lg border border-ifaqa-plum/15 bg-white text-ifaqa-plum hover:bg-ifaqa-cashmere inline-flex items-center gap-1 font-medium transition-colors"
                    >
                      <span>{isExpanded ? 'Hide' : 'Details'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" strokeWidth={1.5} />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.5} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Items Preview + Actions */}
                <div className="p-4 sm:p-5 space-y-4">
                  <div className="divide-y divide-ifaqa-plum/10">
                    {order.items.map((item, idx) => (
                      <div
                        key={`${order.id}-${idx}`}
                        className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-12 h-12 rounded-lg bg-white border border-ifaqa-plum/10 shrink-0 overflow-hidden flex items-center justify-center">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="48px"
                                className="object-contain p-1"
                              />
                            ) : (
                              <Leaf className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-ifaqa-plum truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-[#5A6962] font-mono tabular-nums">
                              Qty: {item.quantity} ·{' '}
                              {order.currency === 'USD'
                                ? formatPriceUSD(item.unitPrice)
                                : formatPriceINR(item.unitPrice)}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-sm font-semibold text-ifaqa-plum tabular-nums shrink-0">
                          {order.currency === 'USD'
                            ? formatPriceUSD(item.totalPrice)
                            : formatPriceINR(item.totalPrice)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Expanded Timeline + Address */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-ifaqa-plum/10 space-y-5">
                      {order.orderStatus !== 'cancelled' && (
                        <div>
                          <div className="text-xs font-medium text-[#5A6962] mb-3">
                            Fulfillment progress
                          </div>
                          <div className="grid grid-cols-5 gap-2">
                            {STATUS_TIMELINE.map((stage, idx) => {
                              const done = currentStageIndex >= idx;
                              return (
                                <div key={stage} className="space-y-1.5">
                                  <div
                                    className={`h-1.5 rounded-sm ${
                                      done ? 'bg-ifaqa-plum' : 'bg-ifaqa-plum/10'
                                    }`}
                                  />
                                  <span
                                    className={`block text-[11px] capitalize ${
                                      done ? 'text-ifaqa-plum font-medium' : 'text-[#5A6962]'
                                    }`}
                                  >
                                    {stage}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/10 text-xs">
                        <div className="space-y-1">
                          <span className="font-medium text-ifaqa-plum flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#5A6962]" strokeWidth={1.5} />
                            Delivery address
                          </span>
                          <p className="text-[#5A6962] leading-relaxed">
                            {order.shippingAddress.recipientName}
                            <br />
                            {order.shippingAddress.streetAddress}, {order.shippingAddress.city}
                            <br />
                            {order.shippingAddress.stateProvince} -{' '}
                            {order.shippingAddress.postalCode}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <span className="font-medium text-ifaqa-plum block">Payment summary</span>
                          <p className="text-[#5A6962]">
                            Method:{' '}
                            <span className="text-ifaqa-plum font-medium">
                              {order.paymentMethod === 'cash_on_delivery'
                                ? 'Cash on Delivery'
                                : order.paymentMethod === 'credit_card'
                                ? 'Card / UPI'
                                : 'Bank Transfer'}
                            </span>
                          </p>
                          <p className="text-[#5A6962] font-mono tabular-nums">
                            Shipping:{' '}
                            {order.currency === 'USD'
                              ? formatPriceUSD(order.shippingFee)
                              : formatPriceINR(order.shippingFee)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Footer Buttons */}
                  <div className="pt-3 border-t border-ifaqa-plum/10 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => handleReorder(order)}
                      className="h-9 px-4 rounded-lg bg-ifaqa-plum text-ifaqa-linen hover:bg-ifaqa-blackberry text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>Reorder items</span>
                    </button>

                    <Link
                      href={`/account/support?order=${encodeURIComponent(order.orderNumber)}`}
                      className="text-xs font-medium text-[#5A6962] hover:text-ifaqa-plum underline"
                    >
                      Need help with this order?
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AccountShell>
  );
}
