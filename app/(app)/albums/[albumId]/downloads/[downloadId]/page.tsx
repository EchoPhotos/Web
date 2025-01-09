'use client';

import AlbumPanel from '@components/Album/AlbumPanel';
import Panel from '@components/Album/CurrentDownload/Panel';
import RequireAuthentication from '@components/Authentication/RequireAuthentication';
import PanelView from '@components/UI/PanelView';
import DownloadProvider from 'provider/DownloadProvider';
import AlbumProvider from 'provider/AlbumProvider';

export default function Page() {
  return (
    <RequireAuthentication>
      <AlbumProvider>
        <DownloadProvider>
          <PanelView panelConent={<AlbumPanel />}>
            <div className="flex h-full w-full flex-row">
              <Panel />
            </div>
          </PanelView>
        </DownloadProvider>
      </AlbumProvider>
    </RequireAuthentication>
  );
}
