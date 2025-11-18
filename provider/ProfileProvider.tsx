'use client';

import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogBackdrop, DialogPanel, Input } from '@headlessui/react';
import { VStack } from '@components/UI/Components';
import Logo from '@components/UI/Logo';
import { AnimatePresence } from 'framer-motion';
import { useAuthStore, useProfileStore } from '@stores';

export default function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = useState('');

  const authState = useAuthStore();
  const { profile, loading, showRegistration, fetchProfile, registerProfile } = useProfileStore();

  useEffect(() => {
    if (authState.userId && !authState.loading) {
      fetchProfile();
    }
  }, [authState.userId, authState.loading, fetchProfile]);

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserName(event.target.value);
  };

  async function handleRegister() {
    try {
      await registerProfile(userName);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      alert(message);
    }
  }

  const shouldShowRegistration =
    !loading && !authState.loading && authState.userId !== undefined && !profile && showRegistration;

  return (
    <>
      <AnimatePresence>
        {shouldShowRegistration && (
          <Dialog
            open={shouldShowRegistration}
            onClose={() => {}}
            as="div"
            className="relative z-10 focus:outline-none"
          >
            <div className="fixed inset-0 z-10 m-12 flex items-center justify-center overflow-y-auto">
              <DialogBackdrop transition className="fixed inset-0 bg-black/5 backdrop-blur-sm" />

              <DialogPanel
                transition
                className="bg-opacity-70 flex h-full max-h-96 w-full max-w-xl flex-col items-center rounded-xl bg-white p-6 text-center backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <VStack className="h-full w-full items-center justify-center space-y-2">
                  <Logo />
                  <h2 className="max-w-64 text-start font-bold">Welcome to Echo Photos!</h2>
                  <p className="px-12 text-sm text-gray-800">
                    You have successfully signed in. In order to continue, create your profile with
                    your name. This will help your friends see who liked their pictures and tell
                    them who uploaded what pictures.
                  </p>
                  <Input
                    placeholder="Name"
                    className="max-w-64 min-w-36 rounded-lg p-1 text-center ring-1 md:min-h-10 md:min-w-48 md:p-2"
                    onChange={handleNameChange}
                  />
                  <Button onClick={handleRegister} className="btn btn-primary">
                    Save
                  </Button>
                </VStack>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
