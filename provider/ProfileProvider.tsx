'use client';

import React, { useContext, useEffect, useState } from 'react';
import { getUser, registerUser } from '@utils/API';
import { User } from '@Shared/Models';
import { Button, Dialog, DialogBackdrop, DialogPanel, Input } from '@headlessui/react';
import { VStack } from '@components/UI/Components';
import Logo from '@components/UI/Logo';
import { AnimatePresence } from 'framer-motion';
import { AuthStateContext } from 'provider/AuthStateProvider';

export const ProfileContext = React.createContext<User | undefined>(undefined);

export default function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const authState = useContext(AuthStateContext);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (!profile && authState.userId) {
      const userId = authState.userId;
      const cachedProfileString = localStorage.getItem(userId);
      if (cachedProfileString) {
        const cachedProfile = JSON.parse(cachedProfileString) as User;
        setProfile(cachedProfile);
        setLoading(false);
      }

      getUser()
        .then((profile) => {
          localStorage.setItem(userId, JSON.stringify(profile));
          setProfile(profile);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [authState, profile]);

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserName(event.target.value);
  };

  function registerName() {
    registerUser({ name: userName })
      .then((user) => {
        setProfile(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function showRegistrationPanel(): boolean {
    return !loading && !authState.loading && authState.userId !== undefined && !profile;
  }

  return (
    <ProfileContext.Provider value={profile}>
      <AnimatePresence>
        {showRegistrationPanel() && (
          <Dialog
            open={showRegistrationPanel()}
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
                  <Button onClick={registerName} className="btn btn-primary">
                    Save
                  </Button>
                </VStack>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      {children}
    </ProfileContext.Provider>
  );
}
