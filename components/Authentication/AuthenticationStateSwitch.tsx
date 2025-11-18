'use client';

import React from 'react';
import Spinner from '@components/UI/Spinner';
import { useAuthStore } from '@stores';

export default function AuthenticationStateSwitch({
  signedInContent,
  signedOutContent,
  showSpinner = true,
}: {
  signedInContent: React.ReactNode;
  signedOutContent: React.ReactNode;
  showSpinner?: boolean;
}) {
  const authState = useAuthStore();
  if (authState.loading) {
    return showSpinner ? <Spinner /> : <></>;
  } else {
    if (authState.userId) {
      return signedInContent;
    } else {
      return signedOutContent;
    }
  }
}
