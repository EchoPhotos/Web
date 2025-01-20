'use client';

import ErrorBox from '@components/UI/ErrorBox';
import Spinner from '@components/UI/Spinner';
import { getDownload } from '@utils/API';
import { IdDownload, IdDownloadWithAlbum } from '@utils/Models';

import { useParams } from 'next/navigation';
import React from 'react';
import { useEffect, useState } from 'react';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const DownloadContext = React.createContext<IdDownloadWithAlbum>({} as IdDownloadWithAlbum);

export default function DownloadProvider({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const downloadId: string = params.downloadId as string;

  const [error, setError] = useState<Error | undefined>(undefined);
  const [download, setDownload] = useState<IdDownloadWithAlbum | undefined>(undefined);

  function handleDownload(download: IdDownload) {
    setDownload(download);
    if (!download.ready) {
      delay(5000).then(() => {
        getDownload(downloadId).then((download) => {
          setDownload(download);
        });
      });
    }
  }

  useEffect(() => {
    getDownload(downloadId).then(handleDownload).catch(setError);
  }, []);
  
  if (download) {
    return <DownloadContext.Provider value={download}>{children}</DownloadContext.Provider>;
  } else if (error) {
    return <ErrorBox error={error} />;
  } else {
    return <Spinner />;
  }
}
