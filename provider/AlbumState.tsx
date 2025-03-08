import { AlbumItem } from '@Shared/Models';
import { createStore } from 'zustand';
import { createContext, useRef } from 'react';
import { create } from 'domain';

export interface AlbumProps {
  items: AlbumItem[];
}

export interface AlbumState extends AlbumProps {
  addItem: (item: AlbumItem) => void;
}

export type AlbumStateStore = ReturnType<typeof createAlbumStateStore>;

export const createAlbumStateStore = (initProps?: Partial<AlbumProps>) => {
  const DEFAULT_PROPS: AlbumProps = {
    items: [],
  };
  return createStore<AlbumState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    addItem: (item: AlbumItem) =>
      set((state) => {
        const items = state.items;
        items.push(item);
        return { items: items };
      }),
  }));
};

export const AlbumStateContext = createContext<AlbumStateStore | undefined>(undefined);

export function AlbumStateProvider({albumItems}) {
  const albumStateStore: AlbumProps = {items: albumItems};
    const store = useRef(createAlbumStateStore(albumStateStore)).current;
  return (
    <AlbumStateContext.Provider value={store}>
      <div />
    </AlbumStateContext.Provider>
  );
}
