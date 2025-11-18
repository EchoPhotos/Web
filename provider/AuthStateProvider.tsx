'use client';

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@utils/FirebaseConfig';

export interface AuthState {
  loading: boolean;
  userId?: string;
}

export const AuthStateContext = React.createContext<AuthState>({
  userId: undefined,
  loading: true,
});

export default function AuthStateProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({ userId: undefined, loading: true });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState({ userId: user?.uid, loading: false });
    });

    return () => unsubscribe();
  }, []);

  return <AuthStateContext.Provider value={authState}>{children}</AuthStateContext.Provider>;
}
