'use client';

import Spinner from '@components/UI/Spinner';
import { getActiveAlbumInvite } from '@utils/API';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import React from 'react';
import { InviteContext } from './InviteProvider';
import { IdInvite } from '@utils/Models';

export default function ActiveInviteProvider({ children }) {
  const params = useParams();
  const albumId: string = params.albumId as string;

  const [invite, setInvite] = useState<IdInvite | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const fetchInvite = async () => {
    const invite = await getActiveAlbumInvite(albumId);
    setInvite(invite);
  };

  useEffect(() => {
    fetchInvite().catch(setError);
  }, []);

  if (error) {
    return <div className="flex h-full flex-col items-center justify-center">{error.message}</div>;
  } else if (invite) {
    return <InviteContext.Provider value={invite}>{children}</InviteContext.Provider>;
  } else {
    return <Spinner />;
  }
}
