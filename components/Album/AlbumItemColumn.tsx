'use client';

import CachedImage from '@components/UI/CachedImage';
import AlbumItemListProvider, { AlbumItemListContext } from '../../provider/AlbumItemListProvider';
import { useContext } from 'react';
import Spinner from '@components/UI/Spinner';
import { ImageFormat } from '@utils/ImageCache';

export default function AlbumItemColumn() {
  return (
    <div className="h-24 w-full bg-slate-200 md:h-full md:w-24">
      <div className="h-full w-full overflow-scroll overscroll-none">
        <AlbumItemListProvider>
          <Content />
        </AlbumItemListProvider>
      </div>
    </div>
  );
}

function Content() {
  var items = useContext(AlbumItemListContext);
  if (items) {
    if (items.length === 0) {
      return (
        <div className="flex h-full w-full flex-row items-center justify-center text-slate-400 md:-rotate-90 md:flex-col">
          No Photos
        </div>
      );
    }
    return (
      <div className="flex flex-row md:flex-col">
        {items.map((item) => (
          <div key={item.id} className="h-24 w-24 flex-shrink-0">
            <CachedImage imageId={item.image} format={ImageFormat.Thumbnail} />
          </div>
        ))}
      </div>
    );
  }
  return <Spinner />;
}
