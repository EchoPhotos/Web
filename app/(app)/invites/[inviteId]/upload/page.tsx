'use client';

import InvitePanel from '@components/Invite/InvitePanel';
import InviteProvider from 'provider/InviteProvider';
import PanelView from '@components/UI/PanelView';
import UploadWidget from '@components/UploadWidget';

export default function Page() {
  return (
    <InviteProvider>
      <PanelView panelConent={<InvitePanel />}>
        <UploadWidget />
      </PanelView>
    </InviteProvider>
  );
}
