'use client';

import RequireAuthentication from '@components/Authentication/RequireAuthentication';
import PanelView from '@components/UI/PanelView';
import { SloganMemories } from '@components/UI/Slogans';
import AlbumListPanel from '@components/Album/AlbumListPanel';
import ProfileProvider from 'provider/ProfileProvider';

export default function Page() {
  return (
    <RequireAuthentication>
      <ProfileProvider>
        <PanelView panelConent={<SloganMemories />}>
          <AlbumListPanel />
        </PanelView>
      </ProfileProvider>
    </RequireAuthentication>
  );
}
