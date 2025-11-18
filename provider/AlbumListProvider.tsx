'use client';

import { useEffect } from 'react';
import { useAlbumListStore } from '@stores';

export default function AlbumListProvider({ children }: { children: React.ReactNode }) {
  const fetchAlbums = useAlbumListStore((state) => state.fetchAlbums);

  useEffect(() => {
    fetchAlbums(20);
  }, [fetchAlbums]);

  return <>{children}</>;
}
