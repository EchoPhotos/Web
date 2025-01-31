'use client';

import DownloadList from '@components/Download/DownloadList';
import { Button } from '@headlessui/react';
import NoLink from './CurrentDownload/NoLink';
import { DownloadListContext } from 'provider/DownloadListProvider';
import { AlbumContext } from 'provider/AlbumProvider';
import { useContext } from 'react';
import Spinner from '@components/UI/Spinner';

export default function AlbumDownloadsPanel() {
  const downloads = useContext(DownloadListContext);
  const album = useContext(AlbumContext);

  if (!album || !downloads) {
    return <Spinner />;
  }

  if (downloads?.length === 0) {
    return <NoLink album={album} />;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-3 bg-slate-300 px-12 pt-12">
      <h1 className="text-2xl font-semibold">Download Links</h1>
      <Button onClick={undefined}>Test</Button>
      <DownloadList downloads={downloads} />
    </div>
  );
}
