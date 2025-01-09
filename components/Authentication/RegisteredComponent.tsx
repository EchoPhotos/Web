import React, { useContext, useEffect, useState } from 'react';
import { getUser } from '@utils/API';
import Spinner from '@components/UI/Spinner';
import { AuthStateContext } from 'provider/AuthStateProvider';

function RegisteredComponent({
  authenticated,
  unauthenticated,
}: {
  authenticated: React.ReactNode;
  unauthenticated: React.ReactNode;
}) {
  const [didRegister, setDidRegister] = useState<boolean | undefined>(undefined);
  const authState = useContext(AuthStateContext);

  useEffect(() => {
    if (authState.userId) {
      getUser().then(() => setDidRegister(true));
    }
  }, [authState]);

  if (didRegister === false) return unauthenticated;
  if (didRegister === true) return authenticated;
  return <Spinner />;
}

export default RegisteredComponent;
