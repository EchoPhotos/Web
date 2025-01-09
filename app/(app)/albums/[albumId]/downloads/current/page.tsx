'use client';

import AlbumPanel from '@components/Album/AlbumPanel';
import Panel from '@components/Album/CurrentDownload/Panel';
import CurrentDownloadProvider from 'provider/CurrentDownloadProvider';
import RequireAuthentication from '@components/Authentication/RequireAuthentication';
import PanelView from '@components/UI/PanelView';
import AlbumProvider from 'provider/AlbumProvider';

export default function Page() {
  return (
    <RequireAuthentication>
      <AlbumProvider>
        <CurrentDownloadProvider>
          <PanelView panelConent={<AlbumPanel />}>
            <div className="flex h-full w-full flex-row">
              <Panel />
            </div>
          </PanelView>
        </CurrentDownloadProvider>
      </AlbumProvider>
    </RequireAuthentication>
  );
}
