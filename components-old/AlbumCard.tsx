import React from 'react';
import QRCode from './QRCode';
import Link from 'next/link';

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
    <div className="mb-5 flex break-inside-avoid flex-col items-center space-y-5 rounded-lg bg-zinc-800 p-5 text-white">
      <h1 className="mt-2 text-center text-4xl font-black">{albumName}</h1>

      <div className="flex flex-col items-center space-y-2 rounded-lg bg-white p-3" id="qrcode">
        <QRCode qrCodeURL={qrCodeURL} />

        <div className="max-w-1/2 w-44 break-words text-center text-xs font-light text-gray-700">
          {dict.enterCode ?? 'Enter the code or scan the QR-Code to join via app.'}
        </div>

        <button
          id="inviteCode"
          onClick={copyToClipboard}
          className="rounded-lg bg-zinc-200 px-5 py-2 text-center font-mono text-xl uppercase text-slate-700 transition hover:bg-slate-600 hover:font-bold hover:text-white"
        >
          {inviteCode}
        </button>
      </div>

      {/* <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch] text-sm">
        {dict.description ?? "test description"}
      </p> */}

      <div className="flex flex-row items-center space-x-5">
        {dict.hostedOn}
        <img src="/images/AppIcon300.png" height="50" width="50" alt="EchoPhotos logo" />
        Echo Photos
      </div>

      <div className="flex flex-col items-center text-center text-xs">
        <div className="w-52">
          {dict.app.description ??
            'With the app, you can upload your photos and add likes and comments.'}
        </div>

        <button
          id="inviteCode"
          onClick={getApp}
          className="mt-2 rounded-lg bg-blue-600 px-6 py-3.5 text-center text-xl font-bold text-white transition hover:bg-zinc-100 hover:text-blue-500"
        >
          {dict.app.installButton ?? 'Get the App'}
        </button>

        <Link
          id="upload"
          href={`https://www.echophotos.io/albums/${albumId}/upload`}
          className="mt-2 rounded-lg bg-zinc-300 px-5 py-2 text-center text-lg font-bold text-blue-500 transition hover:bg-blue-400 hover:text-white"
        >
          {dict.uploadPhotosButton ?? 'Upload photos'}
        </Link>
      </div>
    </div>
  );
}
