'use client';

import ErrorBox from '@components/UI/ErrorBox';
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
    return <ErrorBox error={error}/>;
  } else if (invite) {
    return <InviteContext.Provider value={invite}>{children}</InviteContext.Provider>;
  } else {
    return <Spinner />;
  }
}
