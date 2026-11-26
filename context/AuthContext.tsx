'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth as firebaseAuth, db } from '@/lib/firebase';
import {
  onAuthStateChanged,
  signOut as fbSignOut,
  signInAnonymously,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { syncCustomerAccountFromDb, saveAccountProfile, getAccountProfile } from '@/lib/account-storage';

export interface CustomerAuthUser {
  uid: string;
  phoneNumber: string;
  displayName?: string;
  role: 'customer' | 'guest';
}

interface AuthContextType {
  user: CustomerAuthUser | null;
  isAuthenticated: boolean;
  isPhoneModalOpen: boolean;
  openPhoneModal: () => void;
  closePhoneModal: () => void;
  signInWithTestAccount: (phoneNumber: string) => void;
  updateDisplayName: (displayName: string) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CustomerAuthUser | null>(null);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ifaqa_customer_auth');
      if (stored) {
        const parsed = JSON.parse(stored) as CustomerAuthUser;
        setUser(parsed);
        if (parsed?.uid) {
          void syncCustomerAccountFromDb(parsed.uid);
        }
      }
    } catch (_) {}

    if (firebaseAuth) {
      try {
        const unsubscribe = onAuthStateChanged(firebaseAuth, async (fbUser: FirebaseUser | null) => {
          if (fbUser) {
            const cachedStored = (() => {
              try {
                const raw = localStorage.getItem('ifaqa_customer_auth');
                return raw ? (JSON.parse(raw) as CustomerAuthUser) : null;
              } catch {
                return null;
              }
            })();

            const phoneNum = fbUser.phoneNumber || cachedStored?.phoneNumber || '';
            const synced = await syncCustomerAccountFromDb(fbUser.uid);

            const customer: CustomerAuthUser = {
              uid: fbUser.uid,
              phoneNumber: phoneNum,
              displayName:
                synced?.fullName ||
                fbUser.displayName ||
                (cachedStored?.displayName && cachedStored.displayName !== 'Customer'
                  ? cachedStored.displayName
                  : 'Customer'),
              role: 'customer',
            };
            setUser(customer);
            try {
              localStorage.setItem('ifaqa_customer_auth', JSON.stringify(customer));
            } catch (_) {}

            if (db && process.env.NEXT_PUBLIC_MOCK_FALLBACK !== 'true') {
              void setDoc(
                doc(db, 'customers', fbUser.uid),
                {
                  id: fbUser.uid,
                  phoneNumber: phoneNum,
                  lastActiveAt: new Date().toISOString(),
                },
                { merge: true }
              ).catch(() => {});
            }
          }
        });
        return () => unsubscribe();
      } catch (_) {}
    }
  }, []);

  const openPhoneModal = () => setIsPhoneModalOpen(true);
  const closePhoneModal = () => setIsPhoneModalOpen(false);

  const signInWithTestAccount = (phoneNumber: string) => {
    const cleanPhone = phoneNumber.trim().replace(/\s+/g, '');

    const finalizeSession = async (resolvedUid: string) => {
      const synced = await syncCustomerAccountFromDb(resolvedUid);
      let savedName = synced?.fullName || 'Customer';
      if (savedName === 'Customer') {
        try {
          const profileRaw = localStorage.getItem(`ifaqa_profile_${resolvedUid}`);
          if (profileRaw) {
            const parsed = JSON.parse(profileRaw);
            if (parsed?.fullName?.trim()) savedName = parsed.fullName.trim();
          }
        } catch (_) {}
      }

      const customer: CustomerAuthUser = {
        uid: resolvedUid,
        phoneNumber: cleanPhone,
        displayName: savedName,
        role: 'customer',
      };
      setUser(customer);
      try {
        localStorage.setItem('ifaqa_customer_auth', JSON.stringify(customer));
      } catch (_) {}
      setIsPhoneModalOpen(false);
    };

    if (firebaseAuth && process.env.NEXT_PUBLIC_MOCK_FALLBACK !== 'true') {
      if (firebaseAuth.currentUser) {
        void finalizeSession(firebaseAuth.currentUser.uid);
        return;
      }
      void signInAnonymously(firebaseAuth)
        .then((cred) => finalizeSession(cred.user.uid))
        .catch(() => finalizeSession(`cust_${cleanPhone.replace(/[^0-9]/g, '').slice(-8)}`));
      return;
    }

    void finalizeSession(`cust_${cleanPhone.replace(/[^0-9]/g, '').slice(-8)}`);
  };

  const updateDisplayName = (displayName: string) => {
    const cleanName = displayName.trim();
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, displayName: cleanName || prev.displayName };
      try {
        localStorage.setItem('ifaqa_customer_auth', JSON.stringify(updated));
      } catch (_) {}
      if (cleanName) {
        const currentProfile = getAccountProfile(prev.uid);
        saveAccountProfile(prev.uid, { ...currentProfile, fullName: cleanName });
      }
      return updated;
    });
  };

  const signOut = async () => {
    if (firebaseAuth) {
      try {
        await fbSignOut(firebaseAuth);
      } catch (_) {}
    }
    setUser(null);
    try {
      localStorage.removeItem('ifaqa_customer_auth');
    } catch (_) {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isPhoneModalOpen,
        openPhoneModal,
        closePhoneModal,
        signInWithTestAccount,
        updateDisplayName,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
