'use client';

import { Button } from '@headlessui/react';
import { getViewOnlyInvite } from '@utils/API';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import MemberLimitReachedView from './MemberLimitReachedView';
import { AlbumContext } from 'provider/AlbumProvider';
import { useContext, useState } from 'react';
import InviteDetails from '@components/Invite/InviteDetails';
import { HStack, VStack } from '@components/UI/Components';
import Spinner from '@components/UI/Spinner';

export default function AlbumOverview() {
  const album = useContext(AlbumContext);
  const router = useRouter();
  const pathname = usePathname();

  const [creatingLink, setCrreatingLink] = useState(false);

  const openPublicLink = () => {
    setCrreatingLink(true);
    getViewOnlyInvite(album.id)
      .then((invite) => {
        const link = `/links/${invite.code ?? invite.id}`;

        setTimeout(() => {
          router.push(link);
          setCrreatingLink(false);
        }, 0);
      })
      .catch(() => {
        setCrreatingLink(false);
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
              <Link href={`/albums/${album.id}/upload`} className="btn btn-secondary">
                Upload photos
              </Link>
            )}

            {!pathname.includes('downloads') && (
              <Link href={`/albums/${album.id}/downloads/current`} className="btn btn-secondary">
                Download all
              </Link>
            )}

            <Button onClick={openPublicLink} className="btn btn-secondary">
              {!creatingLink && <>Public page</>}
              {creatingLink && <Spinner className="h-2 scale-50" />}
            </Button>
          </HStack>
        </VStack>

        <InviteDetails />
      </VStack>
    );
  }
}
