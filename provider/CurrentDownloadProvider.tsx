'use client';

import Spinner from '@components/UI/Spinner';
import { getCurrentAlbumDownload } from '@utils/API';
import { IdDownload } from '@utils/Models';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DownloadContext } from './DownloadProvider';
import ErrorBox from '@components/UI/ErrorBox';

export default function CurrentDownloadProvider({ children }) {
  const params = useParams();
  const albumId: string = params.albumId as string;

  const [download, setDownload] = useState<IdDownload | undefined>();
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    getCurrentAlbumDownload(albumId).then(setDownload).catch(setError);
  }, []);
    
  if (download) {
    return <DownloadContext.Provider value={download}>{children}</DownloadContext.Provider>;
  } else if (error) {
    return <ErrorBox error={error} />;
  } else {
    return <Spinner />;
  }
}
