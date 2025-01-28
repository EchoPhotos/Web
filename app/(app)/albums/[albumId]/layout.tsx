'use client';

import AlbumPanel from '@components/Album/AlbumPanel';
import RequireAuthentication from '@components/Authentication/RequireAuthentication';
import PanelView from '@components/UI/PanelView';
import ActiveInviteProvider from 'provider/ActiveInviteProvider';
import AlbumProvider from 'provider/AlbumProvider';

export default function AlbumLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuthentication>
      <AlbumProvider>
        <ActiveInviteProvider>
          <PanelView panelConent={<AlbumPanel />}>{children}</PanelView>
        </ActiveInviteProvider>
      </AlbumProvider>
    </RequireAuthentication>
  );
}
