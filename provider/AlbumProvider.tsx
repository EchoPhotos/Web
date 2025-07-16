'use client';

import ErrorBox from '@components/UI/ErrorBox';
import Spinner from '@components/UI/Spinner';
import { getAlbum } from '@utils/API';
import { Album } from 'app/Models';

import { useParams } from 'next/navigation';
import React from 'react';
import { useEffect, useState } from 'react';

export const AlbumContext = React.createContext<Album>({} as Album);

export default function AlbumProvider({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const albumId: string = params.albumId as string;

  const [album, setAlbum] = useState<Album | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    getAlbum(albumId).then(setAlbum).catch(setError);
  }, [albumId]);

  if (album) {
    return <AlbumContext.Provider value={album}>{children}</AlbumContext.Provider>;
  } else if (error) {
    return <ErrorBox error={error} />;
  } else {
    return <Spinner />;
  }
}
