'use client';

import CachedImage from '@components/UI/CachedImage';
import { dateString } from '@utils/Formatting';
import { ImageFormat } from '@utils/ImageCache';
import { IdAlbum } from '@Shared/Models';
import { IoImages, IoPersonCircle } from 'react-icons/io5';

export default function AlbumRow({ album }: { album: IdAlbum }) {
  return (
    <div key={album.id}>
      <div className="m-3 flex flex-row justify-between rounded bg-slate-100 p-2">
        <div className="flex flex-row space-x-3">
          <div className="h-12 w-12 overflow-clip rounded-md">
            <CachedImage imageId={album.image} format={ImageFormat.Thumbnail} />
          </div>

          <div>
            <p>{album.name}</p>
            <p className="text-sm text-slate-400">{dateString(album.lastChange)}</p>
          </div>
        </div>

        <div className="flex flex-col items-end font-light text-gray-500">
          <div className="flex items-center">
            {album.cachedNumberOfPhotos ?? 0}
            <IoImages className="w-8" />
          </div>
          <div className="flex items-center">
            {album.cachedNumberOfMembers ?? 1}
            <IoPersonCircle className="w-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
