'use client';

import Code from '@components/UI/Code';
import { VStack } from '@components/UI/Components';
import { Button } from '@headlessui/react';
import { getInviteURL } from '@utils/Environment';
import Link from 'next/link';
import { InviteContext } from 'provider/InviteProvider';
import { useContext } from 'react';
import * as ReactQRCode from 'react-qr-code';

export default function InviteDetails() {
  const invite = useContext(InviteContext);
  const inviteLink = getInviteURL(invite.id);

  return (
    <VStack className="items-center justify-center overflow-scroll rounded-2xl bg-slate-200 p-2 py-4">
      <p className="text-3xl font-semibold">Invite new members</p>

      <p className="max-w-xs p-2 px-12 text-center text-sm text-slate-500">
        In order to invite people to the album, share the invite code, the QR code or an invite
        link.
      </p>

      <VStack className="items-center space-y-3">
        <Link className="rounded-lg bg-white p-4" href={`/invite/${invite.code ?? invite.id}`}>
          <ReactQRCode.default value={inviteLink} size={120} />
        </Link>

        <VStack className="items-center">
          <p className="p-0 text-xs text-gray-500">Invite code</p>

          <Code code={invite.code ?? invite.id.substring(0, 8)} />
        </VStack>

        <Button
          onClick={() => {
            navigator.share({ url: inviteLink });
          }}
          className="btn btn-primary"
        >
          Share link
        </Button>
      </VStack>
    </VStack>
  );
}
