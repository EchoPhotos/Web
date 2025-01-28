'use client';

import Panel from '@components/Album/CurrentDownload/Panel';
import CurrentDownloadProvider from 'provider/CurrentDownloadProvider';

export default function CurrentDownloadPage() {
  return (
    <CurrentDownloadProvider>
      <Panel />
    </CurrentDownloadProvider>
  );
}
