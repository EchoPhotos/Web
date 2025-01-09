'use client';

import AlbumRow from '@components/Album/AlbumRow';
import Spinner from '@components/UI/Spinner';
import { AlbumListContext } from 'provider/AlbumListProvider';
import { useContext } from 'react';

export default function AlbumList() {
  var albums = useContext(AlbumListContext);
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
    </div>
  );
}
