'use client';

import RequireAuthentication from '@components/Authentication/RequireAuthentication';
import AlbumOverview from '@components/Album/AlbumOverview';
import ActiveInviteProvider from 'provider/ActiveInviteProvider';
import PanelView from '@components/UI/PanelView';
import AlbumPanel from '@components/Album/AlbumPanel';
import AlbumItemColumn from '@components/Album/AlbumItemColumn';
import AlbumProvider from 'provider/AlbumProvider';

export default function Page() {
  return (
    <RequireAuthentication>
      <AlbumProvider>
        <ActiveInviteProvider>
          <PanelView panelConent={<AlbumPanel />}>
            <div className="flex h-full w-full flex-col md:flex-row">
              <AlbumItemColumn />
              <div className="h-full w-full">
                <AlbumOverview />
              </div>
            </div>
          </PanelView>
        </ActiveInviteProvider>
      </AlbumProvider>
    </RequireAuthentication>
  );
}
