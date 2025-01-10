'use client';

import { useContext } from 'react';
import SignOutButton from './Authentication/SignOutButton';
import { AuthStateContext } from 'provider/AuthStateProvider';

export default function Footer() {
  var authState = useContext(AuthStateContext);
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white p-2 text-xs text-slate-400 grayscale md:bg-transparent">
      {authState.userId && (
        <div className="flex flex-row justify-center space-x-2 overflow-scroll text-center">
          <a href="https://www.echophotos.io">Echo Photos</a>
          <p>|</p>
          <p>Made with ❤️ in 🇨🇭</p>
          <p>|</p>
          <SignOutButton />
        </div>
      )}
      {(authState.loading || !authState.userId) && (
        <div className="flex flex-row justify-center space-x-2 text-center">
          <a href="https://www.echophotos.io">Echo Photos</a>
          <p>|</p>
          <p>Made with ❤️ in 🇨🇭</p>
        </div>
      )}
    </footer>
  );
}
