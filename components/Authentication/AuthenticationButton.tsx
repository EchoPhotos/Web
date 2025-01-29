'use client';

import React, { useContext, useState } from 'react';
import { auth } from '@utils/FirebaseConfig';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Button } from '@headlessui/react';
import SignInWidget from './SignInWidget';
import { AuthStateContext } from 'provider/AuthStateProvider';

export default function Page() {
  const [isSignInDialogPresented, setIsSignInDialogPresented] = useState(false);
  const authState = useContext(AuthStateContext);

  return (
    <>
      {authState.userId && (
        <Button
          onClick={async () => {
            await auth.signOut();
          }}
          className="rounded-xl bg-slate-600 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-500"
        >
          Sign out
        </Button>
      )}
      {!authState.loading && !authState.userId && (
        <Button
          onClick={async () => {
            setIsSignInDialogPresented(true);
          }}
          className="rounded-xl bg-slate-600 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-500"
        >
          Sign in
        </Button>
      )}
      {/* {isSignInDialogPresented && (
        <Dialog
          open={state == State.SignedOut}
          as="div"
          className="relative z-10 focus:outline-hidden"
          onClose={() => setState(State.SignedIn)}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogBackdrop
                transition
                className="fixed inset-0 bg-black/5 backdrop-blur-xs "
              />

              <DialogPanel
                transition
                className="text-center flex flex-col items-center w-full max-w-md rounded-xl bg-black bg-opacity-25 p-6 backdrop-blur-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
              >
                <DialogTitle className="text-2xl font-bold text-white m-2">
                  {" "}
                  Sign in
                </DialogTitle>
                <SignInWidget />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )} */}
      {authState.loading && (
        <div className="rounded-xl bg-slate-600 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-500">
          Loading
        </div>
      )}
      {!authState.userId && isSignInDialogPresented && (
        <>
          <Dialog
            open={!authState.userId}
            as="div"
            className="relative z-10 focus:outline-hidden"
            onClose={() => setIsSignInDialogPresented(false)}
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogBackdrop
                  transition
                  className="bg-opacity-20 fixed inset-0 bg-white backdrop-blur-xs"
                />

                <DialogPanel
                  transition
                  className="flex w-full max-w-md flex-col items-center rounded-xl bg-white p-6 text-center ring-1 shadow-lg ring-slate-300 backdrop-blur-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                >
                  <DialogTitle className="m-2 text-2xl font-bold"> Sign in</DialogTitle>
                  <SignInWidget />
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </>
      )}
    </>
  );
}
