'use client';

import Spinner from '@components/UI/Spinner';
import { getInvite } from '@utils/API';
import { IdInvite } from '@utils/Models';

import { useParams } from 'next/navigation';
import React from 'react';
import { useEffect, useState } from 'react';

export const InviteContext = React.createContext<IdInvite | undefined>(undefined);

export default function InviteProvider({ children }) {
  const params = useParams();
  const inviteId: string = params.inviteId as string;

  const [invite, setInvite] = useState<IdInvite | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    fetchInvite().catch(setError);
  }, []);

  const fetchInvite = async () => {
    const invite = await getInvite(inviteId);
    setInvite(invite);
  };

  if (error) {
    return <div className="flex h-full flex-col items-center justify-center">{error.message}</div>;
  } else if (invite) {
    return <InviteContext.Provider value={invite}>{children}</InviteContext.Provider>;
  } else {
    return <Spinner />;
  }
}
