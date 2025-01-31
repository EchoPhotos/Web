'use client';

import Spinner from '@components/UI/Spinner';
import { getCurrentAlbumDownload } from '@utils/API';
import { IdDownload } from '@Shared/Models';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { DownloadContext } from './DownloadProvider';
import ErrorBox from '@components/UI/ErrorBox';
import NoLink from '@components/Album/CurrentDownload/NoLink';
import { AlbumContext } from './AlbumProvider';

export default function CurrentDownloadProvider({ children }) {
  const params = useParams();
  const albumId: string = params.albumId as string;

  const [download, setDownload] = useState<IdDownload | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    getCurrentAlbumDownload(albumId)
      .then(setDownload)
      .then(() => setLoading(false))
      .catch(setError);
  }, [albumId]);

  const album = useContext(AlbumContext);
  
  if (download) {
    return <DownloadContext.Provider value={download}>{children}</DownloadContext.Provider>;
  } else if (error) {
    return <ErrorBox error={error} />;
  } else if (loading) {
    return <Spinner />;
  } else {
    return <NoLink album={album} />;
  }
}
