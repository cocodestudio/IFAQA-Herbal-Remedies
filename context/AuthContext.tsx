'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth as firebaseAuth } from '@/lib/firebase';
import { onAuthStateChanged, signOut as fbSignOut, User as FirebaseUser } from 'firebase/auth';

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
    // Check local storage session first
    try {
      const stored = localStorage.getItem('ifaqa_customer_auth');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (_) {}

    // Listen to Firebase Auth state if available
    if (firebaseAuth) {
      try {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (fbUser: FirebaseUser | null) => {
          if (fbUser) {
            const customer: CustomerAuthUser = {
              uid: fbUser.uid,
              phoneNumber: fbUser.phoneNumber || '',
              displayName: fbUser.displayName || 'IFAQA Customer',
              role: 'customer',
            };
            setUser(customer);
            localStorage.setItem('ifaqa_customer_auth', JSON.stringify(customer));
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
    const uid = `cust_${cleanPhone.replace(/[^0-9]/g, '').slice(-8)}`;
    let savedName = 'Customer';
    try {
      const profileRaw = localStorage.getItem(`ifaqa_profile_${uid}`);
      if (profileRaw) {
        const parsed = JSON.parse(profileRaw);
        if (parsed?.fullName?.trim()) savedName = parsed.fullName.trim();
      }
    } catch (_) {}

    const customer: CustomerAuthUser = {
      uid,
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

  const updateDisplayName = (displayName: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, displayName: displayName.trim() || prev.displayName };
      try {
        localStorage.setItem('ifaqa_customer_auth', JSON.stringify(updated));
      } catch (_) {}
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
