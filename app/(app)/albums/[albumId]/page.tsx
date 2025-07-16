'use client';

import AlbumOverview from '@components/Album/AlbumOverview';
import AlbumItemColumn from '@components/Album/AlbumItemColumn';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const albumId: string = params.albumId as string;
  return (
    <div className="flex h-full w-full flex-col md:flex-row">
      <Link href={`${albumId}/items`}>
        <AlbumItemColumn />
      </Link>
      <div className="h-full w-full">
        <AlbumOverview />
      </div>
    </div>
  );
}
