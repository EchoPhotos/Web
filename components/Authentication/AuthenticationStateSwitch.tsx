'use client';

import React, { useContext } from 'react';
import Spinner from '@components/UI/Spinner';
import { AuthStateContext } from 'provider/AuthStateProvider';

export default function AuthenticationStateSwitch({
  signedInContent,
  signedOutContent,
  showSpinner = true,
}) {
  var authState = useContext(AuthStateContext);
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
