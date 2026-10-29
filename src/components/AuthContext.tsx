'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { getFirebaseAuth, googleProvider } from '@/lib/firebase';
import type { UserQuotaStatus } from '@/lib/userDb';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  quota: UserQuotaStatus | null;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  authModalPrompt: string | null;
  openAuthModal: (mode?: 'login' | 'signup', prompt?: string) => void;
  closeAuthModal: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
  refreshQuota: () => Promise<void>;
  setQuota: (quota: UserQuotaStatus | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [quota, setQuota] = useState<UserQuotaStatus | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [authModalPrompt, setAuthModalPrompt] = useState<string | null>(null);

  const syncUserToD1 = useCallback(async (currentUser: User) => {
    try {
      const token = await currentUser.getIdToken();
      const res = await fetch('/api/user/sync', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.quota) {
          setQuota(data.quota);
        }
      }
    } catch (err) {
      console.warn('Failed to sync user state with Cloudflare D1:', err);
    }
  }, []);

  const refreshQuota = useCallback(async () => {
    if (!user) return;
    await syncUserToD1(user);
  }, [user, syncUserToD1]);

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await syncUserToD1(currentUser);
      } else {
        setQuota(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [syncUserToD1]);

  const openAuthModal = (mode: 'login' | 'signup' = 'login', prompt?: string) => {
    setAuthModalMode(mode);
    setAuthModalPrompt(prompt || null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthModalPrompt(null);
  };

  const signInWithGoogle = async () => {
    const auth = getFirebaseAuth();
    const res = await signInWithPopup(auth, googleProvider);
    if (res.user) {
      await syncUserToD1(res.user);
      closeAuthModal();
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    const auth = getFirebaseAuth();
    const res = await signInWithEmailAndPassword(auth, email.trim(), pass);
    if (res.user) {
      await syncUserToD1(res.user);
      closeAuthModal();
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    const auth = getFirebaseAuth();
    const res = await createUserWithEmailAndPassword(auth, email.trim(), pass);
    if (res.user) {
      if (name.trim()) {
        await updateProfile(res.user, { displayName: name.trim() });
      }
      await syncUserToD1(res.user);
      closeAuthModal();
    }
  };

  const sendPasswordReset = async (email: string) => {
    const auth = getFirebaseAuth();
    await sendPasswordResetEmail(auth, email.trim());
  };

  const signOutUser = async () => {
    const auth = getFirebaseAuth();
    await signOut(auth);
    setUser(null);
    setQuota(null);
  };

  const getIdToken = async (): Promise<string | null> => {
    if (!user) return null;
    return await user.getIdToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        quota,
        isAuthModalOpen,
        authModalMode,
        authModalPrompt,
        openAuthModal,
        closeAuthModal,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        sendPasswordReset,
        signOutUser,
        getIdToken,
        refreshQuota,
        setQuota,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
