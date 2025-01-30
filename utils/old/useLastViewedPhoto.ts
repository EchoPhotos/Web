import { create } from 'zustand';

interface PhotoStore {
  lastViewedPhoto: string | undefined;
  setLastViewedPhoto: (photo: string) => void;
}

const lastViewedPhotoStore = create<PhotoStore>((set) => ({
  lastViewedPhoto: undefined,
  setLastViewedPhoto: (photo: string) => set({ lastViewedPhoto: photo }),
}));

export const useLastViewedPhoto = (): [string | undefined, (photo: string) => void] => {
  const lastViewedPhoto = lastViewedPhotoStore((state) => state.lastViewedPhoto);
  const setLastViewedPhoto = lastViewedPhotoStore((state) => state.setLastViewedPhoto);

  return [lastViewedPhoto, setLastViewedPhoto];
};
