'use client';

import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { createAlbum } from '@utils/API';
import RegisterActionButton from '@components/Authentication/RegisterActionButton';
import PhoneExplanationPopover from '@components/PhoneExplanationPopover';
import Link from 'next/link';
import { AuthStateContext } from 'provider/AuthStateProvider';

export default function NewAlbumForm() {
  const [albumName, setAlbumName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const router = useRouter();

  const authState = useContext(AuthStateContext);

  const handlePhoneNumberChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAlbumNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setAlbumName(event.target.value);
  };

  const handleCreatorNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setCreatorName(event.target.value);
  };

  const createAlbumAction = async () => {
    const album = await createAlbum({
      name: albumName,
      members: authState.userId ? [authState.userId] : [],
    });
    router.push(`/albums/${album.id}`);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg p-14 md:items-start md:text-start">
      <div>
        <div className="mb-6">
          <Link
            className="rounded-lg bg-slate-100 p-2 text-xs text-slate-600 hover:bg-slate-200"
            href="/albums"
          >
            See your existing albums
          </Link>
        </div>
        <div className="inline text-2xl font-semibold tracking-tight md:text-5xl">
          Create new album
        </div>
        <div>
          <p className="mt-3 mb-1 text-xs font-semibold text-slate-600">Album name</p>
          <input
            type="text"
            name="albumName"
            autoComplete="off"
            placeholder={new Date().toLocaleString('en-US', {
              day: '2-digit',
              month: 'long',
              year: '2-digit',
            })}
            className="mb-2 w-full rounded-lg border border-gray-300 px-2 py-2 text-start text-xl md:text-3xl"
            onChange={handleAlbumNameChange}
          />
        </div>
        {!authState.userId && (
          <div>
            <p className="mt-3 text-xs font-semibold text-slate-600">Name</p>
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your name"
              className="w -42 rounded-lg border border-gray-300 px-1 py-1 text-start text-sm"
              onChange={handleCreatorNameChange}
            />
          </div>
        )}
        {!authState.userId && (
          <div>
            <p className="mt-3 text-xs font-semibold text-slate-600">Phone number</p>
            <input
              type="tel"
              name="phone"
              placeholder="Your phone number"
              autoComplete="tel"
              className="w-36 rounded-lg border border-gray-300 px-1 py-1 text-start text-sm"
              onChange={handlePhoneNumberChange}
            />
            <PhoneExplanationPopover />
          </div>
        )}
        <div className="flex justify-start pt-3">
          <RegisterActionButton
            name={creatorName}
            phoneNumber={phoneNumber}
            action={createAlbumAction}
          >
            Create
          </RegisterActionButton>
        </div>
      </div>
    </div>
  );
}
