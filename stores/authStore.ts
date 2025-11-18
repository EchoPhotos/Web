import { create } from 'zustand';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@utils/FirebaseConfig';

export interface AuthState {
  loading: boolean;
  userId?: string;
}

interface AuthStore extends AuthState {
  setAuthState: (state: AuthState) => void;
  initialize: () => () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  loading: true,
  userId: undefined,
  setAuthState: (state) => set(state),
  initialize: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({ userId: user?.uid, loading: false });
    });
    return unsubscribe;
  },
}));
