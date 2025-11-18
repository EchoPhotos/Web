import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getAlbums } from '@utils/API';
import { Album } from 'app/Models';

interface AlbumListState {
  albums: Album[] | undefined;
  loading: boolean;
}

interface AlbumListStore extends AlbumListState {
  fetchAlbums: (limit?: number) => Promise<void>;
  reset: () => void;
}

export const useAlbumListStore = create<AlbumListStore>()(
  persist(
    (set) => ({
      albums: undefined,
      loading: true,

      fetchAlbums: async (limit: number = 20) => {
        try {
          const albums = await getAlbums(limit);
          set({ albums, loading: false });
        } catch {
          set({ loading: false });
        }
      },

      reset: () => set({ albums: undefined, loading: true }),
    }),
    {
      name: 'album-list-storage',
      partialize: (state) => ({ albums: state.albums }),
    },
  ),
);
