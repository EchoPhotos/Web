'use client';

import { auth } from '@utils/FirebaseConfig';

export default function SignOutButton() {
  const handleClick = () => {
    auth.signOut();
  };
  return (
    <>
      <button onClick={handleClick}>Sign Out</button>
    </>
  );
}
