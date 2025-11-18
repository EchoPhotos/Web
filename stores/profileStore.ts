import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getUser, registerUser } from '@utils/API';
import { User } from 'app/Models';

interface ProfileState {
  profile: User | undefined;
  loading: boolean;
  showRegistration: boolean;
}

interface ProfileStore extends ProfileState {
  fetchProfile: () => Promise<void>;
  registerProfile: (name: string) => Promise<void>;
  setShowRegistration: (show: boolean) => void;
  reset: () => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      profile: undefined,
      loading: true,
      showRegistration: false,

      fetchProfile: async () => {
        if (get().profile) {
          set({ loading: false });
          return;
        }

        try {
          const profile = await getUser();
          set({ profile, loading: false, showRegistration: false });
        } catch {
          set({ loading: false, showRegistration: true });
        }
      },

      registerProfile: async (name: string) => {
        try {
          const user = await registerUser({ name });
          set({ profile: user, showRegistration: false });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Registration failed';
          throw new Error(message);
        }
      },

      setShowRegistration: (show: boolean) => set({ showRegistration: show }),

      reset: () => set({ profile: undefined, loading: true, showRegistration: false }),
    }),
    {
      name: 'profile-storage',
      partialize: (state) => ({ profile: state.profile }),
    },
  ),
);
