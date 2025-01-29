import React, { useState } from 'react';
import QRCode from './QRCode';
import Link from 'next/link';
import { HStack, VStack } from '@components/UI/Components';
import { Button } from '@headlessui/react';
import RegisterActionButton from '@components/Authentication/RegisterActionButton';
import Banner from '@components/UI/Banner';

interface AlbumCardProps {
  albumName?: string;
  inviteCode: string;
  qrCodeURL: string;
  inviteId: string;
  albumCardDict: any;
}

export default function AlbumCard({
  albumName,
  inviteCode,
  qrCodeURL,
  inviteId,
  albumCardDict,
}: AlbumCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  
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

  async function open() {
    setIsOpen(true);
  }

  return (
    <VStack className="h-full break-inside-avoid items-center justify-evenly space-y-5 rounded-lg bg-zinc-800 p-5 text-white">
      <h1 className="mt-2 text-center text-4xl font-black">{albumName}</h1>

      <HStack className="max-w-72 items-center space-x-2 overflow-clip rounded-lg bg-white p-2">
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

      <RegisterActionButton name={''} phoneNumber={''} action={open}>
        Join Album
      </RegisterActionButton>
      <Banner
        isVisible={isOpen}
        onClose={function (value: boolean): void {
          setIsOpen(false);
        }}
      >
        <Button onClick={() => setIsOpen(false)} className="btn btn-primary">
          Test
        </Button>
        <div className="bg-red-400">Lass</div>
      </Banner>
      {/* <ModalDialog
        isOpen={isOpen}
        onClose={function (value: boolean): void {
          setIsOpen(false);
        }}
      >
        <SignInWidget />
      </ModalDialog> */}

      <VStack className="items-center space-y-2 text-center text-xs">
        <div className="w-52">
          {dict.app.description ??
            'With the app, you can upload your photos and add likes and comments.'}
        </div>

        <VStack className="space-y-2">
          <Button onClick={getApp} className="btn btn-primary">
            {dict.app.installButton ?? 'Get the App'}
          </Button>

          <Link href={`/invites/${inviteId}/upload`} className="btn btn-primary-inverted">
            {dict.uploadPhotosButton ?? 'Upload photos'}
          </Link>
        </VStack>

        <div className="flex flex-row items-center space-x-5">
          {dict.hostedOn}
          <img src="/images/AppIcon300.png" height="50" width="50" alt="EchoPhotos logo" />
          Echo Photos
        </div>
      </VStack>
    </VStack>
  );
}
