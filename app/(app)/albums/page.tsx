'use client';

import RequireAuthentication from '@components/Authentication/RequireAuthentication';
import PanelView from '@components/UI/PanelView';
import { SloganMemories } from '@components/UI/Slogans';
import AlbumListPanel from '@components/Album/AlbumListPanel';

export default function Page() {
  return (
    <RequireAuthentication>
      <PanelView panelConent={<SloganMemories />}>
        <AlbumListPanel />
      </PanelView>
    </RequireAuthentication>
  );
}
