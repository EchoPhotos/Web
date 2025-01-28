'use client';

import Panel from '@components/Album/CurrentDownload/Panel';
import DownloadProvider from 'provider/DownloadProvider';

export default function AlbumDownloadPage() {
  return (
    <DownloadProvider>
      <div className="flex h-full w-full flex-row">
        <Panel />
      </div>
    </DownloadProvider>
  );
}
