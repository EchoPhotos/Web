'use client';

import React, { useContext, useState } from 'react';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  ConfirmationResult,
  UserCredential,
} from 'firebase/auth';
import { auth } from '@utils/FirebaseConfig';
import { getOrRegisterUser } from '@utils/API';
import {
  Button,
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Input,
} from '@headlessui/react';
import validator from 'validator';
import { AuthStateContext } from 'provider/AuthStateProvider';
import { ProfileContext } from 'provider/ProfileProvider';
import Spinner from '@components/UI/Spinner';

export default function RegisterActionButton({
  children,
  name,
  phoneNumber,
  action,
}: {
  children: React.ReactNode;
  name: string;
  phoneNumber: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  action: () => Promise<any>;
}) {
  const [otp, setOtp] = useState("");
  const [verificationId, setVid] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const authState = useContext(AuthStateContext);
  const profile = useContext(ProfileContext);

  const handleOtpChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setOtp(event.target.value);
  };

  const triggerAction = async () => {
    setLoading(true);
    if (profile) {
      await action();
    } else if (authState.userId !== undefined) {
      await getOrRegisterUser(name);
      await action();
    } else {
      await registerPhone();
    }
    setLoading(false);
  };

  const registerPhone = async () => {
    if (!validator.isMobilePhone(phoneNumber)) {
      alert("Invalid mobile phone number. Please try again!");
      return;
    }
    const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
      size: "invisible",
    });

    try {
      const confirmationResult: ConfirmationResult =
        await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);

      setVid(confirmationResult.verificationId);
    } catch (error) {
      alert(`${error}. Please try again!`);
    }
  };

  const verifyOTP = async () => {
    if (otp == "" || otp.length !== 6) {
      alert("Please enter a valid verification code!");
    } else if (!verificationId) {
      alert("Error.. Please try again!");
    } else {
      const phoneCredential = PhoneAuthProvider.credential(verificationId, otp);

      try {
        const userCredentials: UserCredential = await signInWithCredential(
          auth,
          phoneCredential
        );
        console.log(userCredentials.user.uid);

        await getOrRegisterUser(name);
        action();
      } catch (error) {
        console.log(error);
        if (error.message == "INVALID_CODE") {
          alert(
            "This code is invalid.  Check you are entering the correct code."
          );
        } else {
          alert(error.message);
        }
      }
    }
  };

  return (
    <div>
      <div id="recaptcha"></div>

      {verificationId === undefined && (
        <Button onClick={triggerAction} className="btn btn-primary mt-4">
          {loading && (
            <div className="h-5">
              <Spinner className="scale-50" />
            </div>
          )}
          {!loading && children}
        </Button>
      )}

      <Dialog
        open={verificationId !== undefined}
        as="div"
        className="relative z-10 focus:outline-hidden"
        onClose={() => setVid(undefined)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-black/5 backdrop-blur-xs"
            />

            <DialogPanel
              transition
              className="bg-opacity-25 flex w-full max-w-md flex-col items-center rounded-xl bg-gray-800/80 p-6 text-center backdrop-blur-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle className="m-2 text-2xl font-bold text-white">
                Verify you phone number
              </DialogTitle>
              <Description className="my-2 w-1/2 text-sm text-gray-100">
                In order to prevent spam, we have sent you a verification code
                to the number {phoneNumber}.
              </Description>
              <Input
                type="text"
                autoFocus
                autoComplete="one-time-code"
                placeholder="123456"
                className="m-2 w-1/4 rounded-md bg-white p-2 text-center text-xl"
                onChange={handleOtpChange}
              />
              <div className="mt-4">
                <Button className="btn btn-secondary" onClick={verifyOTP}>
                  Verify
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
