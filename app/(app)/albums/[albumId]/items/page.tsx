'use client';

import { AlbumItemListContext } from 'provider/AlbumItemListProvider';
import { useContext } from 'react';
import AlbumItemGrid from '@components/Album/AlbumItemGrid';
import Spinner from '@components/UI/Spinner';

export default function Page() {
  const items = useContext(AlbumItemListContext);
  if (items) {
    if (items.length === 0) {
      return (
        <div className="flex h-full w-full flex-row items-center justify-center text-slate-400 md:-rotate-90 md:flex-col">
          Album is empty
        </div>
      );
    }
    return (
      <div className='p-4 h-full w-full rounded-2xl '>
        <AlbumItemGrid items={items} />
      </div>
    );
  }
  return <Spinner />;
}
