'use client';

import AlbumRow from '@components/Album/AlbumRow';
import { VStack } from '@components/UI/Components';
import Spinner from '@components/UI/Spinner';
import Link from 'next/link';
import { useAlbumListStore } from '@stores';

export default function AlbumList() {
  const albums = useAlbumListStore((state) => state.albums);
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
        <VStack className="m-3 items-center rounded-xs px-12 py-2 text-center text-sm text-slate-400">
          <p>Only the 20 most recent albums are shown on the web.</p>
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
