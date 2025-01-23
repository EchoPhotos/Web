'use client';

import AlbumRow from '@components/Album/AlbumRow';
import { VStack } from '@components/UI/Components';
import Spinner from '@components/UI/Spinner';
import Link from 'next/link';
import { AlbumListContext } from 'provider/AlbumListProvider';
import { useContext } from 'react';

export default function AlbumList() {
  var albums = useContext(AlbumListContext);
  if (!albums) {
    return <Spinner />;
  }
  return (
    <div className="h-full w-full overflow-scroll">
      {albums.map((album) => (
        <a key={album.id} href={`/albums/${album.id}`}>
          <AlbumRow album={album} />
        </a>
      ))}

      {albums.length > 19 && (
        <VStack className="m-3 items-center rounded px-12 py-2 text-center text-sm text-slate-400">
          <p>Only the 20 recent alubms are shown on the web.</p>
          <p>
            Use the{' '}
            <Link className="inline-block underline" href="/">
              mobile app
            </Link>{' '}
            to see all your albums.{' '}
          </p>
        </VStack>
      )}
    </div>
  );
}
