'use client';

import { getAlbums } from '@utils/API';
import { Album } from 'app/Models';
import React from 'react';
import { useEffect, useState } from 'react';

export const AlbumListContext = React.createContext<Album[] | undefined>(undefined);

export default function AlbumListProvider({ children }) {
  const [albums, setAlbums] = useState<Album[] | undefined>(undefined);

  useEffect(() => {
    const cachedAlbumsString = localStorage.getItem('cached-albums');
    if (cachedAlbumsString) {
      const cachedAlbums = JSON.parse(cachedAlbumsString) as Album[];
      setAlbums(cachedAlbums);
    }
    getAlbums(20).then((albums) => {
      setAlbums(albums);
      localStorage.setItem('cached-albums', JSON.stringify(albums));
    });
  }, []);

  return <AlbumListContext.Provider value={albums}>{children}</AlbumListContext.Provider>;
}
