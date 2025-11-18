'use client';

import ErrorBox from '@components/UI/ErrorBox';
import Spinner from '@components/UI/Spinner';
import { getDownload } from '@utils/API';
import { IdDownload, IdDownloadWithAlbum } from 'app/Models';

import { useParams } from 'next/navigation';
import React from 'react';
import { useEffect, useState } from 'react';

const DOWNLOAD_POLL_INTERVAL_MS = 5000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const DownloadContext = React.createContext<IdDownloadWithAlbum>({} as IdDownloadWithAlbum);

export default function DownloadProvider({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const downloadId: string = params.downloadId as string;

  const [error, setError] = useState<Error | undefined>(undefined);
  const [download, setDownload] = useState<IdDownloadWithAlbum | undefined>(undefined);

  useEffect(() => {
    function handleDownload(download: IdDownload) {
      setDownload(download);
      if (!download.ready) {
        delay(DOWNLOAD_POLL_INTERVAL_MS).then(() => {
          getDownload(downloadId)
            .then((updatedDownload) => {
              setDownload(updatedDownload);
            })
            .catch(setError);
        });
      }
    }
    getDownload(downloadId).then(handleDownload).catch(setError);
  }, [downloadId]);

  if (download) {
    return <DownloadContext.Provider value={download}>{children}</DownloadContext.Provider>;
  } else if (error) {
    return <ErrorBox error={error} />;
  } else {
    return <Spinner />;
  }
}
