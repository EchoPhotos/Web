'use client';

import CachedImage from '@components/UI/CachedImage';
import { ImageFormat } from '@utils/ImageCache';
import { AlbumItem } from 'app/Models';
import Link from 'next/link';

export default function AlbumItemGrid({items} : {items: AlbumItem[]}) {
  return (
    <div className="overflow-hidden rounded-lg h-full w-full">
      <div className="overflow-scroll h-full w-full">
        <div 
        className="grid gap-0" 
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gridAutoRows: 'minmax(120px, 1fr)'
        }}
      >
        {items.map((item) => (
          <Link href={`?item=${item.id}`} key={item.id} className="cursor-pointer aspect-square overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity duration-200">
            <CachedImage 
              imageId={item.image} 
              format={ImageFormat.Thumbnail}
              className="h-full w-full object-cover"
            />
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
}
