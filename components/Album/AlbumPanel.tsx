'use client';

import { thumbnailUrlForId } from '@utils/API';
import { IdAlbum } from '@utils/Models';
import { IoCreate, IoImage, IoImages, IoPersonCircle } from 'react-icons/io5';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PremiumButton } from './PremiumButton';
import { AlbumContext } from 'provider/AlbumProvider';
import { HStack, SizeAdapted, VStack } from '@components/UI/Components';
import Logo from '@components/UI/Logo';
import { useContext } from 'react';
import CachedImage from '@components/UI/CachedImage';
import { ImageFormat } from '@utils/ImageCache';

export default function AlbumPanel() {
  var album = useContext(AlbumContext);

  return (
    <SizeAdapted
      className="h-full w-full"
      desktop={<DesktopAlbumPanel album={album} />}
      mobile={<MobileAlbumHeader album={album} />}
    />
  );
}

export function MobileAlbumHeader({ album }: { album: IdAlbum }) {
  const pathname = usePathname();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return (
    <div className="w-screen p-4">
      <VStack>
        <HStack className="justify-center space-x-2">
          <div className="mt-8 h-16 w-16 content-center rounded-xl bg-slate-700 text-slate-500">
            <div className="relative h-24 w-24 overflow-hidden rounded-xl object-cover">
              <CachedImage imageId={album.image} format={ImageFormat.Thumbnail} />
            </div>
          </div>

          <VStack className="items-start justify-center space-y-0">
            <HStack className="w-full justify-end">
              {pathname.includes('albums') && (
                <Link
                  className="rounded-md text-xs font-light text-gray-400 underline hover:bg-slate-500"
                  href={`/albums`}
                >
                  Your albums
                </Link>
              )}
            </HStack>

            <Link className="text-lg font-semibold hover:underline" href={`/albums/${album.id}`}>
              {album?.name}
            </Link>

            <HStack className="items-center justify-between space-x-2 text-[12px] text-gray-400">
              <div className="flex items-center">
                <IoImages className="w-5" />
                {album.cachedNumberOfPhotos ?? 0}
              </div>

              <div className="flex items-center">
                <IoPersonCircle className="w-5" />
                {album.cachedNumberOfMembers ?? 1}
              </div>

              <div className="flex items-center">
                <IoCreate className="w-5" />
                {new Date(album.created).toLocaleString(undefined, options)}
              </div>
            </HStack>
          </VStack>
        </HStack>

        <HStack className="mt-2 justify-center space-x-2">
          <Logo />

          <HStack className="overflow-scroll">
            <PremiumButton album={album} />
          </HStack>
        </HStack>
      </VStack>
    </div>
  );
}

export function DesktopAlbumPanel({ album }: { album: IdAlbum }) {
  const pathname = usePathname();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-3 px-12 pt-12 md:items-end">
      {pathname.includes('albums') && (
        <Link
          className="mb-6 rounded-md p-1 px-2 text-sm text-gray-400 hover:underline"
          href={`/albums`}
        >
          Your albums
        </Link>
      )}
      <div className="h-24 w-24 content-center rounded-xl bg-slate-700 text-slate-500">
        <div className="relative h-24 w-24 overflow-hidden rounded-xl object-cover">
          <CachedImage imageId={album.image} format={ImageFormat.Thumbnail} />
        </div>
      </div>

      <Link className="text-3xl font-semibold hover:underline" href={`/albums/${album.id}`}>
        {album?.name}
      </Link>

      <div className="flex flex-col items-center font-light text-gray-500 md:items-end">
        <div className="flex items-center">
          {album.cachedNumberOfPhotos ?? 0}
          <IoImages className="w-8" />
        </div>

        <div className="flex items-center">
          {album.cachedNumberOfMembers ?? 1}
          <IoPersonCircle className="w-8" />
        </div>

        <div className="flex items-center">
          {new Date(album.created).toLocaleString(undefined, options)}
          <IoCreate className="w-8" />
        </div>
      </div>

      <PremiumButton album={album} />
    </div>
  );
}
