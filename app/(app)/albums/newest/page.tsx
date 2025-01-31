'use client';

import RequireAuthentication from '@components/Authentication/RequireAuthentication';
import Spinner from '@components/UI/Spinner';
import { getNewestAlbum } from '@utils/API';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function NewestAlbumPage() {
  return (
    <RequireAuthentication>
      <Content />
    </RequireAuthentication>
  );
}

function Content() {
  useEffect(() => {
    getNewestAlbum().then((album) => {
      if (album) {
        redirect(`/albums/${album.id}`);
      }
    });
  }, []);

  return <Spinner />;
}
