'use client';

import Link from 'next/link';
import AlbumList from './AlbumList';
import AlbumListProvider from '../../provider/AlbumListProvider';

export default function AlbumListPanel() {
  return (
    <div className="h-full w-full">
      <div className="flex h-24 flex-row items-center justify-between p-3">
        <p className="p-4 text-3xl font-semibold">Your albums</p>
        <Link
          className="rounded-xl bg-blue-500 px-3 py-1 text-center text-white"
          href="/albums/new"
        >
          New album
        </Link>
      </div>
      <div className="mb-2 h-5/6 rounded-xl">
        <AlbumListProvider>
          <AlbumList />
        </AlbumListProvider>
      </div>
    </div>
  );
}
