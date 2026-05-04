'use client';

import CachedImage from '@components/UI/CachedImage';
import { ImageFormat } from '@utils/ImageCache';
import { AlbumItem } from 'app/Models';
import Link from 'next/link';

export default function AlbumItemGrid({ items }: { items: AlbumItem[] }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-lg">
      <div className="h-full w-full overflow-scroll">
        <div
          className="grid gap-0"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gridAutoRows: 'minmax(120px, 1fr)',
          }}
        >
          {items.map((item, index) => (
            <Link
              href={`?item=${item.id}`}
              key={item.id}
              className="aspect-square cursor-pointer overflow-hidden bg-gray-100 transition-opacity duration-200 hover:opacity-90"
            >
              <CachedImage
                imageId={item.image}
                format={ImageFormat.Thumbnail}
                eager={index < 24}
                rootMargin="600px"
                className="h-full w-full object-cover"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
