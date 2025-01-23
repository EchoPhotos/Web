'use client';

import Spinner from '@components/UI/Spinner';
import { getDownloads } from '@utils/API';
import { IdDownload } from '@Shared/Models';

import { useParams } from 'next/navigation';
import React from 'react';
import { useEffect, useState } from 'react';

export const DownloadListContext = React.createContext<IdDownload[] | undefined>(undefined);

export default function DownloadListProvider({ children }) {
  const params = useParams();
  const albumId: string = params.albumId as string;

  const [downloads, setDownloads] = useState<IdDownload[] | undefined>();

  useEffect(() => {
    getDownloads(albumId).then((downloads) => {
      setDownloads(downloads.sort((a, b) => b.timestamp - a.timestamp));
    });
  }, []);

  return (
    <>
      {downloads && (
        <DownloadListContext.Provider value={downloads}>{children}</DownloadListContext.Provider>
      )}
      {!downloads && <Spinner />}
    </>
  );
}
