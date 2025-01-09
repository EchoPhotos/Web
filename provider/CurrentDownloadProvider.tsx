'use client';

import Spinner from '@components/UI/Spinner';
import { getCurrentAlbumDownload } from '@utils/API';
import { IdDownload, IdDownloadWithAlbum } from '@utils/Models';

import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { DownloadContext } from './DownloadProvider';
import { AlbumContext } from './AlbumProvider';

export default function CurrentDownloadProvider({ children }) {
  const params = useParams();
  const albumId: string = typeof params.albumId === 'string' ? params.albumId : params.albumId[0];

  const [download, setDownload] = useState<IdDownload | undefined>();
  const [loading, setLoading] = useState(true);
  const album = useContext(AlbumContext);

  useEffect(() => {
    getCurrentAlbumDownload(albumId).then((download) => {
      let currentDownload = download as IdDownloadWithAlbum;
      const disabled = currentDownload?.isDisabled;
      if (!disabled) {
        if (download) {
          currentDownload.albumData = album;
        }
        setDownload(currentDownload);
      }
      setLoading(false);
    });
  }, []);

  return (
    <>
      {!loading && <DownloadContext.Provider value={download}>{children}</DownloadContext.Provider>}
      {loading && <Spinner />}
    </>
  );
}
