import React from 'react';
import QRCode from './QRCode';
import Link from 'next/link';
import { HStack, VStack } from '@components/UI/Components';
import { ActionStyle, SecondaryActionStyle } from '@components/UI/ButtonStyles';

interface AlbumCardProps {
  albumName?: string;
  inviteCode: string;
  qrCodeURL: string;
  albumId: string;
  albumCardDict: any;
}

export default function AlbumCard({
  albumName,
  inviteCode,
  qrCodeURL,
  albumId,
  albumCardDict,
}: AlbumCardProps) {
  const dict = albumCardDict;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(inviteCode);
    alert(dict.copied ?? 'Copied!');
  };

  const getApp = async () => {
    if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
      window.open('https://play.google.com/store/apps/details?id=ch.echolabs.echo');
    } else if (navigator.userAgent.toLowerCase().indexOf('iphone') > -1) {
      window.open('https://apps.apple.com/app/id1499073049');
    } else if (navigator.userAgent.toLowerCase().indexOf('macintosh') > -1) {
      window.open('https://apps.apple.com/app/id1499073049');
    } else {
      window.open(`https://web.echophotos.io/invite/${inviteCode}`, '_blank');
    }
  };

  return (
    <VStack className="h-full break-inside-avoid items-center justify-evenly space-y-5 rounded-lg bg-zinc-800 p-5 text-white">
      <h1 className="mt-2 text-center text-4xl font-black">{albumName}</h1>

      <HStack className="items-center space-x-2 overflow-clip rounded-lg bg-white p-2">
        <QRCode qrCodeURL={qrCodeURL} />

        <VStack className="space-y-2 p-1">
          <div className="break-words text-center text-xs font-light text-gray-700">
            {dict.enterCode ?? 'Enter the code or scan the QR-Code to join via app.'}
          </div>

          <button
            onClick={copyToClipboard}
            className="rounded-lg bg-zinc-200 px-5 py-2 text-center font-mono text-lg uppercase text-slate-700 transition hover:bg-slate-600 hover:font-bold hover:text-white"
          >
            {inviteCode}
          </button>
        </VStack>
      </HStack>

      {/* <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch] text-sm">
        {dict.description ?? "test description"}
      </p> */}

      <VStack className="items-center space-y-2 text-center text-xs">
        <div className="w-52">
          {dict.app.description ??
            'With the app, you can upload your photos and add likes and comments.'}
        </div>

        <HStack className="space-x-2">
          <button onClick={getApp}>
            <ActionStyle>{dict.app.installButton ?? 'Get the App'}</ActionStyle>
          </button>

          <Link href={`https://www.echophotos.io/albums/${albumId}/upload`}>
            <SecondaryActionStyle>
              {dict.uploadPhotosButton ?? 'Upload photos'}
            </SecondaryActionStyle>
          </Link>
        </HStack>

        <div className="flex flex-row items-center space-x-5">
          {dict.hostedOn}
          <img src="/images/AppIcon300.png" height="50" width="50" alt="EchoPhotos logo" />
          Echo Photos
        </div>
      </VStack>
    </VStack>
  );
}
