'use client';

import { AlbumItemListContext } from 'provider/AlbumItemListProvider';
import { useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import AlbumItemGrid from '@components/Album/AlbumItemGrid';
import Spinner from '@components/UI/Spinner';
import AlbumImageOverlay from '@components/Album/AlbumImageOverlay';

export default function Page() {
  const items = useContext(AlbumItemListContext);
  const searchParams = useSearchParams();
  const selectedItemId = searchParams.get('item');

  if (items) {
    if (items.length === 0) {
      return (
        <div className="flex h-full w-full flex-row items-center justify-center text-slate-400 md:-rotate-90 md:flex-col">
          Album is empty
        </div>
      );
    }
    return (
      <>
        <div className='p-4 h-full w-full rounded-2xl '>
          <AlbumItemGrid items={items} />
        </div>
        {selectedItemId && (
          <AlbumImageOverlay
            items={items}
            selectedItemId={selectedItemId}
          />
        )}
      </>
    );
  }
  return <Spinner />;
}
