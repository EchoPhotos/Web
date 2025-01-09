'use client';

import AlbumPanel from '@components/Album/AlbumPanel';
import AuthenticationStateSwitch from '@components/Authentication/AuthenticationStateSwitch';
import InviteAlbumProvider from 'provider/InviteAlbumProvider';
import InvitePanel from '@components/Invite/InvitePanel';
import InviteProvider, { InviteContext } from 'provider/InviteProvider';
import PanelView from '@components/UI/PanelView';
import UploadWidget from '@components/UploadWidget';

export default function Page() {
  return (
    <InviteProvider>
      <PanelView
        panelConent={
          <AuthenticationStateSwitch
            signedInContent={
              <InviteAlbumProvider>
                <AlbumPanel />
              </InviteAlbumProvider>
            }
            signedOutContent={<InvitePanel />}
          />
        }
      >
        <UploadWidget />
      </PanelView>
    </InviteProvider>
  );
}
