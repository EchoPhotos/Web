'use client';

import Spinner from '@components/UI/Spinner';
import { getDownload } from '@utils/API';
import { IdDownloadWithAlbum } from '@utils/Models';

import { useParams } from 'next/navigation';
import React from 'react';
import { useEffect, useState } from 'react';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const DownloadContext = React.createContext<IdDownloadWithAlbum | undefined>(undefined);

export default function DownloadProvider({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const downloadId: string =
    typeof params.downloadId === 'string' ? params.downloadId : params.downloadId[0];

  const [error, setError] = useState<Error | undefined>(undefined);
  const [download, setDownload] = useState<IdDownloadWithAlbum | undefined>(undefined);

  useEffect(() => {
    getDownload(downloadId)
      .then((download) => {
        setDownload(download);
        if (!download.ready) {
          delay(5000).then(() => {
            getDownload(downloadId).then((download) => {
              setDownload(download);
            });
          });
        }
      })
      .catch(setError);
  }, []);

  if (download) {
    return <DownloadContext.Provider value={download}>{children}</DownloadContext.Provider>;
  } else if (error) {
    return <div className="flex h-full flex-col items-center justify-center">{error.message}</div>;
  } else {
    return <Spinner />;
  }
}
