'use client';

import { invitePreviewUrlForId } from '@utils/API';
import { IoCreate, IoImage, IoImages, IoPersonCircle } from 'react-icons/io5';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { InviteContext } from 'provider/InviteProvider';
import { useContext } from 'react';

export default function InvitePanel() {
  const pathname = usePathname();
  var invite = useContext(InviteContext);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return (
    <div className="flex h-full w-full flex-col items-end justify-center space-y-3 px-12 pt-12">
      <div className="h-24 w-24 content-center rounded-xl bg-slate-700 text-slate-500">
        {invite.groupImage && (
          <div className="relative h-24 w-24 overflow-hidden rounded-xl object-cover">
            <img
              src={invitePreviewUrlForId(invite.id)}
              className="absolute inset-0 h-full w-full object-cover object-center"
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
      {!pathname.endsWith('upload') && (
        <Link
          className="bg-opacity-20 rounded-md bg-white p-1 px-2 hover:bg-slate-200 hover:text-slate-800"
          href={`/invites/${invite.id}/upload`}
        >
          Upload photos
        </Link>
      )}
    </div>
  );
}
