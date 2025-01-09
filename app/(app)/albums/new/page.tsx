'use client';

import NewAlbumForm from '@components/NewAlbumForm';
import PanelView from '@components/UI/PanelView';
import { SloganPrivacy } from '@components/UI/Slogans';

export default function Page() {
  return (
    <PanelView panelConent={<SloganPrivacy />}>
      <NewAlbumForm />
    </PanelView>
  );
}
