'use client';

import AlbumPanel from '@components/Album/AlbumPanel';
import RequireAuthentication from '@components/Authentication/RequireAuthentication';
import PanelView from '@components/UI/PanelView';
import ActiveInviteProvider from 'provider/ActiveInviteProvider';
import AlbumItemListProvider from 'provider/AlbumItemListProvider';
import AlbumProvider from 'provider/AlbumProvider';
import ProfileProvider from 'provider/ProfileProvider';

export default function AlbumLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProfileProvider>
      <RequireAuthentication>
        <AlbumProvider>
          <AlbumItemListProvider>
            <ActiveInviteProvider>
              <PanelView panelConent={<AlbumPanel />}>{children}</PanelView>
            </ActiveInviteProvider>
          </AlbumItemListProvider>
        </AlbumProvider>
      </RequireAuthentication>
    </ProfileProvider>
  );
}
