'use client';

import AlbumListPanel from '@components/Album/AlbumListPanel';
import AuthenticationStateSwitch from '@components/Authentication/AuthenticationStateSwitch';
import NewAlbumForm from '@components/NewAlbumForm';
import PanelView from '@components/UI/PanelView';
import { SloganLink } from '@components/UI/Slogans';

export default function Page() {
  return (
    <PanelView panelConent={<SloganLink />}>
      <AuthenticationStateSwitch
        signedInContent={<AlbumListPanel />}
        signedOutContent={<NewAlbumForm />}
      />
    </PanelView>
  );
}
