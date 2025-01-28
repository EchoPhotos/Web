'use client';

import AlbumOverview from '@components/Album/AlbumOverview';
import AlbumItemColumn from '@components/Album/AlbumItemColumn';

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col md:flex-row">
      <AlbumItemColumn />
      <div className="h-full w-full">
        <AlbumOverview />
      </div>
    </div>
  );
}
