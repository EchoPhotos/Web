'use client';

import AlbumItemColumn from '@components/Album/AlbumItemColumn';
import AlbumProvider from 'provider/AlbumProvider';
import RequireAuthentication from '@components/Authentication/RequireAuthentication';
import PanelView from '@components/UI/PanelView';
import UploadWidget from '@components/UploadWidget';
import AlbumPanel from '@components/Album/AlbumPanel';

export default function Page() {
  return (
    <RequireAuthentication>
      <PanelView
        panelConent={
          <AlbumProvider>
            <AlbumPanel />
          </AlbumProvider>
        }
      >
        <div className="flex h-full w-full flex-row">
          <AlbumItemColumn />
          <div className="h-full w-3/4">
            <UploadWidget />
          </div>
        </div>
      </PanelView>
    </RequireAuthentication>
  );
}
