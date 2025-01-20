'use client';

import { getAPIHost } from '@utils/Environment';
import { Button } from '@headlessui/react';
import { getViewOnlyInvite } from '@utils/API';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import MemberLimitReachedView from './MemberLimitReachedView';
import { AlbumContext } from 'provider/AlbumProvider';
import { useContext } from 'react';
import InviteDetails from '@components/Invite/InviteDetails';
import { SecondaryStyle } from '@components/UI/ButtonStyles';
import { HStack, VStack } from '@components/UI/Components';

export default function AlbumOverview() {
  var album = useContext(AlbumContext);
  const router = useRouter();
  const pathname = usePathname();

  const openPublicLink = () => {
    getViewOnlyInvite(album.id).then((invite) => {
      const link = `/links/${invite.code ?? invite.id}`;

      setTimeout(() => {
        router.push(link);
      }, 0);
    });
  };

  if ((album.memberLimit ?? 400) <= album.members.length) {
    return <MemberLimitReachedView />;
  } else {
    return (
      <VStack className="h-full w-full items-center justify-evenly space-y-8 overflow-scroll p-8">
        <VStack className="w-full items-center space-y-2 rounded-lg bg-slate-100 p-2">
          <p className="text-lg font-semibold text-gray-800">Album actions</p>

          <p className="px-8 text-center text-xs text-gray-700">
            Open the album in the app in order to view, like and delete the photos.
          </p>

          <HStack className="w-full justify-evenly space-x-2 p-2 text-white">
            {!pathname.includes('upload') && (
              <Link href={`/albums/${album.id}/upload`}>
                <SecondaryStyle>Upload photos</SecondaryStyle>
              </Link>
            )}

            {!pathname.includes('downloads') && (
              <Link href={`/albums/${album.id}/downloads/current`}>
                <SecondaryStyle>Download all</SecondaryStyle>
              </Link>
            )}

            <Button onClick={openPublicLink}>
              <SecondaryStyle>Public page</SecondaryStyle>
            </Button>
          </HStack>
        </VStack>

        <InviteDetails />
      </VStack>
    );
  }
}
