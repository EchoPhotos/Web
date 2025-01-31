'use client';

import { invitePreviewUrlForId, joinAlbum } from '@utils/API';
import { IoCreate, IoImage, IoImages, IoPersonCircle } from 'react-icons/io5';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { InviteContext } from 'provider/InviteProvider';
import { useContext } from 'react';
import { AuthStateContext } from 'provider/AuthStateProvider';
import { Button } from '@headlessui/react';

export default function InvitePanel() {
  const pathname = usePathname();
  const invite = useContext(InviteContext);
  const authState = useContext(AuthStateContext);
  const router = useRouter();

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  async function onClickJoin() {
    await joinAlbum(invite.id);
    router.push(`/albums/${invite.group}`);
  }

  return (
    <div className="flex h-full w-full flex-col items-end justify-center space-y-3 px-12 pt-12">
      <div className="h-24 w-24 content-center rounded-xl bg-slate-700 text-slate-500">
        {invite.groupImage && (
          <div className="relative h-24 w-24 overflow-hidden rounded-xl object-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={invitePreviewUrlForId(invite.id)}
              className="absolute inset-0 h-full w-full object-cover object-center"
              alt={invite.id}
            />
          </div>
        )}
        {!invite.groupImage && <IoImage className="m-auto" size={33} />}
      </div>

      <div className="text-3xl font-semibold">{invite.groupName}</div>

      <div className="flex flex-col items-end font-light text-gray-500">
        <div className="flex items-center">
          {invite.photoCount ?? 0}
          <IoImages className="w-8" />
        </div>
        <div className="flex items-center">
          {invite.members?.length ?? 1}
          <IoPersonCircle className="w-8" />
        </div>
        <div className="flex items-center">
          {new Date(invite.timestamp).toLocaleString(undefined, options)}
          <IoCreate className="w-8" />
        </div>
      </div>
      {authState.userId !== undefined && (
        <Button className="btn btn-primary" onClick={onClickJoin}>
          Join Album
        </Button>
      )}
      {!pathname.endsWith('upload') && (
        <Link className="btn btn-secondary" href={`/invites/${invite.id}/upload`}>
          Upload photos
        </Link>
      )}
    </div>
  );
}
