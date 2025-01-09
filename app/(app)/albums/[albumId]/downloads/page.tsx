'use client';

import AlbumDownloadsPanel from '@components/Album/AlbumDownloadsPanel';
import AlbumPanel from '@components/Album/AlbumPanel';
import RequireAuthentication from '@components/Authentication/RequireAuthentication';
import PanelView from '@components/UI/PanelView';
import AlbumProvider from 'provider/AlbumProvider';
import DownloadListProvider from 'provider/DownloadListProvider';

export default function Page() {
  return (
    <RequireAuthentication>
      <AlbumProvider>
        <DownloadListProvider>
          <PanelView panelConent={<AlbumPanel />}>
            <div className="flex h-full w-full flex-row">
              <AlbumDownloadsPanel />
            </div>
          </PanelView>
        </DownloadListProvider>
      </AlbumProvider>
    </RequireAuthentication>
  );
}
