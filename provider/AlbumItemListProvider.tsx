'use client';

import { getAlbumItems } from '@utils/API';
import { IdAlbumItem } from '@utils/Models';

import { useParams } from 'next/navigation';
import React from 'react';
import { useEffect, useState } from 'react';

export const AlbumItemListContext = React.createContext<IdAlbumItem[] | undefined>(undefined);

export default function AlbumItemListProvider({ children }) {
  const params = useParams();
  const albumId: string = typeof params.albumId === 'string' ? params.albumId : params.albumId[0];
  const [albums, setAlbums] = useState<IdAlbumItem[] | undefined>(undefined);
  useEffect(() => {
    getAlbumItems(albumId).then((albums) => {
      setAlbums(albums);
    });
  }, []);

  return <AlbumItemListContext.Provider value={albums}>{children}</AlbumItemListContext.Provider>;
}
