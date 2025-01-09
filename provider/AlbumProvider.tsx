'use client';

import Spinner from '@components/UI/Spinner';
import { getAlbum } from '@utils/API';
import { IdAlbum } from '@utils/Models';

import { useParams } from 'next/navigation';
import React from 'react';
import { useEffect, useState } from 'react';

export const AlbumContext = React.createContext<IdAlbum | undefined>(undefined);

export default function AlbumProvider({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const albumId: string = typeof params.albumId === 'string' ? params.albumId : params.albumId[0];

  const [album, setAlbum] = useState<IdAlbum | undefined>(undefined);
  useEffect(() => {
    getAlbum(albumId).then((album) => {
      setAlbum(album);
    });
  }, []);

  return (
    <>
      {album && <AlbumContext.Provider value={album}>{children}</AlbumContext.Provider>}
      {!album && <Spinner />}
    </>
  );
}
