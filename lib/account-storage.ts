'use client';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth as firebaseAuth, db } from './firebase';
import { SavedAddress } from './types';

export interface CustomerAccountProfile {
  fullName: string;
  email: string;
  alternatePhone: string;
  gender: 'prefer_not_to_say' | 'male' | 'female' | 'other';
  updatedAt: string;
}

export interface CustomerSavedAddress extends SavedAddress {
  phone: string;
}

export interface CustomerBankAccount {
  id: string;
  accountHolderName: string;
  bankName: string;
  accountNumberMasked: string;
  last4: string;
  ifscCode: string;
  isPrimary: boolean;
  createdAt: string;
}

export interface CustomerUpiId {
  id: string;
  upiId: string;
  label: string;
  isPrimary: boolean;
  createdAt: string;
}

export interface CustomerPreferences {
  orderSms: boolean;
  dispatchUpdates: boolean;
  restockAlerts: boolean;
  promotionalEmails: boolean;
}

export interface SupportTicket {
  id: string;
  category: string;
  orderNumber?: string;
  subject: string;
  message: string;
  status: 'Open' | 'In Review' | 'Resolved';
  createdAt: string;
}

const safeKey = (prefix: string, uid: string) =>
  `${prefix}_${(uid || 'guest').replace(/[^a-zA-Z0-9_-]/g, '')}`;

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors cleanly
  }
}

function resolveCustomerDocId(uid: string): string | null {
  if (process.env.NEXT_PUBLIC_MOCK_FALLBACK === 'true') return null;
  const target = firebaseAuth?.currentUser?.uid || uid;
  if (!target || target === 'guest') return null;
  return target;
}

async function persistCustomerField(uid: string, patch: Record<string, unknown>): Promise<void> {
  if (!db || process.env.NEXT_PUBLIC_MOCK_FALLBACK === 'true') return;
  const docId = resolveCustomerDocId(uid);
  if (!docId) return;

  try {
    await setDoc(
      doc(db, 'customers', docId),
      {
        id: docId,
        ...patch,
        lastActiveAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Firestore customer sync notice:', err);
  }
}

/**
 * Pulls live customer data (profile, addresses, bank, UPI, prefs, tickets)
 * from Firestore `customers/{uid}` into local state/cache cleanly.
 */
export async function syncCustomerAccountFromDb(uid: string): Promise<{
  fullName?: string;
} | null> {
  if (!db || process.env.NEXT_PUBLIC_MOCK_FALLBACK === 'true') return null;
  const docId = resolveCustomerDocId(uid);
  if (!docId) return null;

  try {
    const snap = await getDoc(doc(db, 'customers', docId));
    if (!snap.exists()) return null;
    const data = snap.data() as Record<string, any>;

    if (data.profile) writeJson(safeKey('ifaqa_profile', uid), data.profile);
    if (Array.isArray(data.savedAddresses)) {
      writeJson(safeKey('ifaqa_addresses', uid), data.savedAddresses);
    }
    if (Array.isArray(data.bankAccounts)) {
      writeJson(safeKey('ifaqa_bank', uid), data.bankAccounts);
    }
    if (Array.isArray(data.upiIds)) {
      writeJson(safeKey('ifaqa_upi', uid), data.upiIds);
    }
    if (data.preferences) writeJson(safeKey('ifaqa_prefs', uid), data.preferences);
    if (Array.isArray(data.supportTickets)) {
      writeJson(safeKey('ifaqa_tickets', uid), data.supportTickets);
    }

    return {
      fullName: data.profile?.fullName || data.fullName || undefined,
    };
  } catch (err) {
    console.warn('Firestore customer load notice:', err);
    return null;
  }
}

export function getAccountProfile(uid: string): CustomerAccountProfile {
  return readJson<CustomerAccountProfile>(safeKey('ifaqa_profile', uid), {
    fullName: '',
    email: '',
    alternatePhone: '',
    gender: 'prefer_not_to_say',
    updatedAt: '',
  });
}

export function saveAccountProfile(uid: string, profile: CustomerAccountProfile): void {
  const payload = {
    ...profile,
    updatedAt: new Date().toISOString(),
  };
  writeJson(safeKey('ifaqa_profile', uid), payload);
  void persistCustomerField(uid, {
    profile: payload,
    fullName: payload.fullName,
    email: payload.email,
  });
}

export function getSavedAddresses(uid: string): CustomerSavedAddress[] {
  return readJson<CustomerSavedAddress[]>(safeKey('ifaqa_addresses', uid), []);
}

export function saveAddresses(uid: string, addresses: CustomerSavedAddress[]): void {
  writeJson(safeKey('ifaqa_addresses', uid), addresses);
  void persistCustomerField(uid, { savedAddresses: addresses });
}

export function getBankAccounts(uid: string): CustomerBankAccount[] {
  return readJson<CustomerBankAccount[]>(safeKey('ifaqa_bank', uid), []);
}

export function saveBankAccounts(uid: string, accounts: CustomerBankAccount[]): void {
  writeJson(safeKey('ifaqa_bank', uid), accounts);
  void persistCustomerField(uid, { bankAccounts: accounts });
}

export function getUpiIds(uid: string): CustomerUpiId[] {
  return readJson<CustomerUpiId[]>(safeKey('ifaqa_upi', uid), []);
}

export function saveUpiIds(uid: string, upis: CustomerUpiId[]): void {
  writeJson(safeKey('ifaqa_upi', uid), upis);
  void persistCustomerField(uid, { upiIds: upis });
}

export function getAccountPrefs(uid: string): CustomerPreferences {
  return readJson<CustomerPreferences>(safeKey('ifaqa_prefs', uid), {
    orderSms: true,
    dispatchUpdates: true,
    restockAlerts: false,
    promotionalEmails: false,
  });
}

export function saveAccountPrefs(uid: string, prefs: CustomerPreferences): void {
  writeJson(safeKey('ifaqa_prefs', uid), prefs);
  void persistCustomerField(uid, { preferences: prefs });
}

export function getSupportTickets(uid: string): SupportTicket[] {
  return readJson<SupportTicket[]>(safeKey('ifaqa_tickets', uid), []);
}

export function createSupportTicket(
  uid: string,
  ticket: Omit<SupportTicket, 'id' | 'status' | 'createdAt'>
): SupportTicket[] {
  const existing = getSupportTickets(uid);
  const newTicket: SupportTicket = {
    ...ticket,
    id: `SUP-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 'Open',
    createdAt: new Date().toISOString(),
  };
  const updated = [newTicket, ...existing];
  writeJson(safeKey('ifaqa_tickets', uid), updated);
  void persistCustomerField(uid, { supportTickets: updated });

  if (db && process.env.NEXT_PUBLIC_MOCK_FALLBACK !== 'true') {
    const docId = resolveCustomerDocId(uid);
    if (docId) {
      void setDoc(doc(db, 'supportTickets', newTicket.id), {
        ...newTicket,
        customerId: docId,
      }).catch(() => {
        // Already mirrored inside customers/{uid}.supportTickets
      });
    }
  }

  return updated;
}

export function clearCustomerAccountLocalData(uid: string): void {
  if (typeof window === 'undefined') return;
  const prefixes = [
    'ifaqa_profile',
    'ifaqa_addresses',
    'ifaqa_bank',
    'ifaqa_upi',
    'ifaqa_prefs',
    'ifaqa_tickets',
  ];
  for (const p of prefixes) {
    try {
      localStorage.removeItem(safeKey(p, uid));
    } catch {
      // Ignore storage errors
    }
  }
}

export function maskBankAccountNumber(rawNumber: string): { masked: string; last4: string } {
  const digits = rawNumber.replace(/\D/g, '');
  const last4 = digits.slice(-4);
  return {
    masked: `•••• •••• ${last4}`,
    last4,
  };
}

export function validateIfscCode(ifsc: string): boolean {
  return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc.trim().toUpperCase());
}

export function validateUpiId(upi: string): boolean {
  return /^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9]{2,}$/.test(upi.trim());
}
