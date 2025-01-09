'use client';

import Spinner from '@components/UI/Spinner';
import { getAlbum, getInvite } from '@utils/API';
import { IdAlbum } from '@utils/Models';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AlbumContext } from './AlbumProvider';

export default function InviteAlbumProvider({ children }) {
  const params = useParams();
  const inviteId: string =
    typeof params.inviteId === 'string' ? params.inviteId : params.inviteId[0];

  const [album, setAlbum] = useState<IdAlbum | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    getInvite(inviteId)
      .then((invite) => {
        getAlbum(invite.group).then((album) => {
          setAlbum(album);
        });
      })
      .catch(setError);
  }, []);

  if (album) {
    return <AlbumContext.Provider value={album}>{children}</AlbumContext.Provider>;
  } else if (error) {
    return <div className="flex h-full flex-col items-center justify-center">{error.message}</div>;
  } else {
    return <Spinner />;
  }
}
