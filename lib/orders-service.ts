import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from './firebase';
import { CustomerOrder, OrderItem, ShippingAddress } from './types';
import { validateE164Phone, validatePostalCode, generateOrderNumber, roundUsdCents } from './formatters';
export { roundUsdCents } from './formatters';

export interface AssembleOrderInput {
  customer: {
    uid?: string;
    name: string;
    phone: string;
    email?: string;
  };
  shippingAddress: ShippingAddress;
  items: Array<{
    remedyId: string;
    sku: string;
    name: string;
    urduName: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
    image: string;
  }>;
  currency?: 'PKR' | 'USD';
  paymentMethod?: 'cash_on_delivery' | 'bank_transfer' | 'credit_card';
  discount?: number;
}

export function validateShippingAddress(address: ShippingAddress): { valid: boolean; error?: string } {
  const required: Array<keyof ShippingAddress> = ['recipientName', 'streetAddress', 'city', 'stateProvince', 'postalCode', 'country'];
  for (const field of required) {
    if (!address[field] || typeof address[field] !== 'string' || address[field].trim() === '') {
      return { valid: false, error: `Missing or empty required address field: ${field}` };
    }
  }
  if (!validatePostalCode(address.postalCode)) {
    return { valid: false, error: 'Invalid postal code format' };
  }
  return { valid: true };
}

export function calculateShippingFee(subtotal: number, currency: 'PKR' | 'USD'): number {
  if (currency === 'PKR') {
    return subtotal >= 5000 ? 0 : 250;
  }
  // International USD shipping flat rate
  return 15.0;
}

export function assembleCustomerOrder(input: AssembleOrderInput): CustomerOrder {
  const addrVal = validateShippingAddress(input.shippingAddress);
  if (!addrVal.valid) {
    throw new Error(addrVal.error);
  }

  if (!validateE164Phone(input.customer.phone)) {
    throw new Error(`Invalid customer phone number: ${input.customer.phone}. Must be in E.164 international format (e.g. +919876543210).`);
  }

  if (!input.items || input.items.length === 0) {
    throw new Error("Order must contain at least one remedy item");
  }

  const currency = input.currency || 'PKR';
  let subtotal = 0;

  if (currency === 'USD') {
    const subtotalCents = input.items.reduce((sum, item) => {
      const priceCents = Math.round(item.unitPrice * 100);
      return sum + (priceCents * item.quantity);
    }, 0);
    subtotal = subtotalCents / 100;
  } else {
    subtotal = input.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  }

  const shippingFee = calculateShippingFee(subtotal, currency);
  const discount = input.discount || 0;
  const totalAmount = currency === 'USD' 
    ? Math.round((subtotal + shippingFee - discount) * 100) / 100
    : subtotal + shippingFee - discount;

  const orderId = `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  const order: CustomerOrder = {
    id: orderId,
    orderNumber: generateOrderNumber(),
    customerId: input.customer.uid || 'guest',
    customerName: input.customer.name,
    customerPhone: input.customer.phone,
    customerEmail: input.customer.email || '',
    shippingAddress: input.shippingAddress,
    items: input.items,
    subtotal,
    shippingFee,
    discount,
    totalAmount,
    currency,
    paymentMethod: input.paymentMethod || 'cash_on_delivery',
    paymentStatus: input.paymentMethod === 'credit_card' ? 'verified' : 'pending',
    orderStatus: 'placed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return order;
}

export async function placeCustomerOrder(order: CustomerOrder): Promise<{ success: boolean; orderId: string; orderNumber: string }> {
  // Validate total arithmetic
  const expectedTotal = order.currency === 'USD'
    ? Math.round((order.subtotal + order.shippingFee - order.discount) * 100) / 100
    : order.subtotal + order.shippingFee - order.discount;

  if (Math.abs(order.totalAmount - expectedTotal) > 0.01 || order.totalAmount <= 0) {
    throw new Error("Order arithmetic mismatch: totalAmount must equal subtotal + shippingFee - discount and be positive.");
  }

  // Always mirror order to local storage so My Orders shows recent checkouts immediately
  if (typeof window !== 'undefined') {
    try {
      const existing: CustomerOrder[] = JSON.parse(localStorage.getItem('ifaqa_customer_orders') || '[]');
      const deduped = [order, ...existing.filter((o) => o.id !== order.id)];
      localStorage.setItem('ifaqa_customer_orders', JSON.stringify(deduped));
    } catch (e) {
      console.warn("Failed saving order to localStorage mirror:", e);
    }
  }

  // Attempt Firestore write
  if (db && process.env.NEXT_PUBLIC_MOCK_FALLBACK !== 'true') {
    try {
      await setDoc(doc(db, 'orders', order.id), order);
      return { success: true, orderId: order.id, orderNumber: order.orderNumber };
    } catch (err) {
      console.warn("Firestore order write failed, using local order repository:", err);
    }
  }

  return { success: true, orderId: order.id, orderNumber: order.orderNumber };
}

/**
 * Fetches orders belonging to a signed-in customer by UID or normalized phone number,
 * merging local order mirror + Firestore orders sorted newest-first.
 */
export async function getCustomerOrders(uid?: string, phone?: string): Promise<CustomerOrder[]> {
  const normalizedPhone = (phone || '').replace(/\s+/g, '');
  const results = new Map<string, CustomerOrder>();

  if (typeof window !== 'undefined') {
    try {
      const localOrders: CustomerOrder[] = JSON.parse(localStorage.getItem('ifaqa_customer_orders') || '[]');
      for (const order of localOrders) {
        const orderPhone = (order.customerPhone || '').replace(/\s+/g, '');
        if ((uid && order.customerId === uid) || (normalizedPhone && orderPhone === normalizedPhone)) {
          results.set(order.id, order);
        }
      }
    } catch {
      // Ignore parse issues
    }
  }

  if (db && process.env.NEXT_PUBLIC_MOCK_FALLBACK !== 'true' && (uid || normalizedPhone)) {
    try {
      const ordersRef = collection(db, 'orders');
      const queries = [];
      if (uid) queries.push(getDocs(query(ordersRef, where('customerId', '==', uid))));
      if (normalizedPhone) queries.push(getDocs(query(ordersRef, where('customerPhone', '==', normalizedPhone))));
      const snaps = await Promise.all(queries);
      for (const snap of snaps) {
        snap.forEach((docSnap) => {
          const data = docSnap.data() as CustomerOrder;
          results.set(data.id || docSnap.id, { ...data, id: data.id || docSnap.id });
        });
      }
    } catch {
      // Fall back cleanly to local orders if Firestore rules restrict query
    }
  }

  return Array.from(results.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
