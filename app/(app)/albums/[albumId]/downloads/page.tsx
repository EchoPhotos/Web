'use client';

import AlbumDownloadsPanel from '@components/Album/AlbumDownloadsPanel';
import DownloadListProvider from 'provider/DownloadListProvider';

export default function AlbumDownloadsPage() {
  return (
    <DownloadListProvider>
      <div className="flex h-full w-full flex-row">
        <AlbumDownloadsPanel />
      </div>
    </DownloadListProvider>
  );
}
