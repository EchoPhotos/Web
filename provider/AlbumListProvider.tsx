'use client';

import { getAlbums } from '@utils/API';
import { IdAlbum } from 'app/Models';
import React from 'react';
import { useEffect, useState } from 'react';

export const AlbumListContext = React.createContext<IdAlbum[] | undefined>(undefined);

export default function AlbumListProvider({ children }) {
  const [albums, setAlbums] = useState<IdAlbum[] | undefined>(undefined);

  useEffect(() => {
    const cachedAlbumsString = localStorage.getItem('cached-albums');
    if (cachedAlbumsString) {
      const cachedAlbums = JSON.parse(cachedAlbumsString) as IdAlbum[];
      setAlbums(cachedAlbums);
    }
    getAlbums(20).then((albums) => {
      setAlbums(albums);
      localStorage.setItem('cached-albums', JSON.stringify(albums));
    });
  }, []);

  return <AlbumListContext.Provider value={albums}>{children}</AlbumListContext.Provider>;
}
