'use client';

import { getAlbums } from '@utils/API';
import { IdAlbum } from '@utils/Models';
import React from 'react';
import { useEffect, useState } from 'react';

export const AlbumListContext = React.createContext<IdAlbum[] | undefined>(undefined);

export default function AlbumListProvider({ children }) {
  const [albums, setAlbums] = useState<IdAlbum[] | undefined>(undefined);
  useEffect(() => {
    getAlbums().then((albums) => {
      setAlbums(albums);
    });
  }, []);

  return <AlbumListContext.Provider value={albums}>{children}</AlbumListContext.Provider>;
}
