'use client';

import AlbumPanel from '@components/Album/AlbumPanel';
import AuthenticationStateSwitch from '@components/Authentication/AuthenticationStateSwitch';
import InviteAlbumProvider from 'provider/InviteAlbumProvider';
import InvitePanel from '@components/Invite/InvitePanel';
import InviteProvider, { InviteContext } from 'provider/InviteProvider';
import PanelView from '@components/UI/PanelView';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useContext } from 'react';
import { HStack, Toggle, VStack } from '@components/UI/Components';
import {
  disableLikedOnlyPreview,
  disableViewOnly,
  enableLikedOnlyPreview,
  enableViewOnly,
} from '@utils/API';
import Code from '@components/UI/Code';

export default function Page() {
  const { inviteId } = useParams();
  if (!inviteId || typeof inviteId !== 'string') {
    throw new Error('Invalid invite ID');
  }

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
            signedOutContent={<SignedOutContent />}
          />
        }
      >
        <InviteDetails />
      </PanelView>
    </InviteProvider>
  );
}

function SignedOutContent() {
  var invite = useContext(InviteContext);

  return <InvitePanel />;
}

function InviteDetails() {
  var invite = useContext(InviteContext);

  function onLikedOnlyPreviewChanged(checked: boolean) {
    if (checked) {
      enableLikedOnlyPreview(invite.id);
    } else {
      disableLikedOnlyPreview(invite.id);
    }
  }

  function onViewOnlyChanged(checked: boolean) {
    if (checked) {
      enableViewOnly(invite.id);
    } else {
      disableViewOnly(invite.id);
    }
  }

  return (
    <VStack className="h-full items-center justify-between p-12">
      <h1 className="text-4xl font-bold">Invite</h1>

      <VStack className="items-center p-3">
        <Code code={invite.code ?? invite.id.substring(0, 8)} />
      </VStack>

      <Link href={`https://www.echophotos.io/invite/${invite.id}`} className="btn btn-secondary">
        View Invite
      </Link>

      <VStack>
        <HStack className="w-full justify-center space-x-4">
          <Toggle
            enable={invite.previewOnlyLiked ?? false}
            onChange={onLikedOnlyPreviewChanged}
          ></Toggle>
          <div>Show only liked items in preview.</div>
        </HStack>

        <HStack className="w-full justify-center space-x-4">
          <Toggle enable={invite.viewOnly ?? false} onChange={onViewOnlyChanged}></Toggle>
          <div>View-only invite.</div>
        </HStack>
      </VStack>
    </VStack>
  );
}
