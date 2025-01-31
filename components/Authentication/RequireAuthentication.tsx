'use client';

import React, { useContext, useEffect } from 'react';
import { auth } from '@utils/FirebaseConfig';
import Spinner from '@components/UI/Spinner';
import SignInWidget from './SignInWidget';
import { SloganMemories } from '@components/UI/Slogans';
import PanelView from '@components/UI/PanelView';
import { useSearchParams, useRouter } from 'next/navigation';
import { getTokenForCode } from '@utils/API';
import { signInWithCustomToken } from 'firebase/auth';
import { AuthStateContext } from 'provider/AuthStateProvider';

export default function RequireAuthentication({ children }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const authCodeQueryParameter = searchParams.get('auth-code');

  const authState = useContext(AuthStateContext);

  useEffect(() => {
    if (!authState.userId && authCodeQueryParameter) {
      getTokenForCode(authCodeQueryParameter).then((customToken) => {
        if (!authState.userId) {
          signInWithCustomToken(auth, customToken);
        }
      });
    } else if (authState.userId && authCodeQueryParameter) {
      const params = new URLSearchParams(searchParams);
      params.delete('auth-code');
      router.replace(`?${params.toString()}`);
    }
  }, [authState, authCodeQueryParameter, searchParams, router]);

  if (authState.userId) {
    return children;
  }

  if (authState.loading) {
    return (
      <div className="h-full w-full">
        <Spinner />
      </div>
    );
  }

  return (
    <PanelView panelConent={<SloganMemories />}>
      <div className="flex h-full flex-col items-center justify-center space-y-8 p-12 md:items-start">
        <p className="text-3xl font-semibold">Sign in</p>
        <p className="text-smfont-light">
          In order to access this page you need to sign in with your phone number.
        </p>
        <SignInWidget />
      </div>
    </PanelView>
  );
}
