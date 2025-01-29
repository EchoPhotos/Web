'use client';

import React, { useEffect, useState } from 'react';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  ConfirmationResult,
  UserCredential,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@utils/FirebaseConfig';
import { getOrRegisterUser, getUser } from '@utils/API';
import {
  Button,
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import validator from 'validator';

enum State {
  SignedOut,
  SignedIn,
  Unregistered,
  Loading,
  VerificationSent,
  Error,
}

const RegisterActionButton = ({
  children,
  name,
  phoneNumber,
  action,
}: {
  children: React.ReactNode;
  name: string;
  phoneNumber: string;
  action: () => {};
}) => {
  const [otp, setOtp] = useState('');
  const [state, setState] = useState(State.Loading);
  const [verificationId, setVid] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const user = await getUser();
        if (user) {
          setState(State.SignedIn);
        } else {
          setState(State.Unregistered);
        }
      } else {
        setState(State.SignedOut);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleOtpChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setOtp(event.target.value);
  };

  const triggerAction = async () => {
    if (state === State.SignedIn) {
      action();
    } else if (state === State.Unregistered) {
      const _ = await getOrRegisterUser(name);
      action();
    } else {
      registerPhone();
    }
  };

  const registerPhone = async () => {
    if (!validator.isMobilePhone(phoneNumber)) {
      alert('Invalid mobile phone number. Please try again!');
      return;
    }
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {
      size: 'invisible',
    });

    try {
      const confirmationResult: ConfirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier,
      );

      setVid(confirmationResult.verificationId);
      setState(State.VerificationSent);
    } catch (error: any) {
      alert(`${error}. Please try again!`);
    }
  };

  const verifyOTP = async () => {
    if (otp == '' || otp.length !== 6) {
      alert('Please enter a valid verification code!');
    } else {
      const phoneCredential = PhoneAuthProvider.credential(verificationId, otp);

      try {
        const userCredentials: UserCredential = await signInWithCredential(auth, phoneCredential);
        console.log(userCredentials.user.uid);

        const _ = await getOrRegisterUser(name);
        setState(State.SignedIn);
        action();
      } catch (error: any) {
        console.log(error);
        if (error.message == 'INVALID_CODE') {
          alert('This code is invalid.  Check you are entering the correct code.');
        } else {
          alert(error.message);
        }
      }
    }
  };

  return (
    <div>
      <div id="recaptcha"></div>

      <div id="file-and-profile-input">
        <div className="flex w-full justify-center"></div>
        {state !== State.VerificationSent && state !== State.Error && (
          <div>
            <div className="mt-4 flex w-full justify-center">
              <Button onClick={triggerAction} className="btn btn-primary">
                {children}
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog
        open={state == State.VerificationSent}
        as="div"
        className="relative z-10 focus:outline-hidden"
        onClose={() => setState(State.SignedOut)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogBackdrop transition className="fixed inset-0 bg-black/5 backdrop-blur-xs" />

            <DialogPanel
              transition
              className="data-closed:transform-[scale(95%)] flex w-full max-w-md flex-col items-center rounded-xl bg-black bg-opacity-25 p-6 text-center backdrop-blur-xl duration-300 ease-out data-closed:opacity-0"
            >
              <DialogTitle className="m-2 text-2xl font-bold text-white">
                {' '}
                Verify you phone number
              </DialogTitle>
              <Description className="my-2 w-1/2 text-sm text-gray-100">
                In order to prevent spam, we have sent you a verification code to the number{' '}
                {phoneNumber}.
              </Description>
              <input
                type="text"
                autoFocus
                autoComplete="one-time-code"
                placeholder="123456"
                className="m-2 w-1/4 rounded-md p-2 text-center text-xl"
                onChange={handleOtpChange}
              />
              <div className="mt-4">
                <button
                  className="flex gap-4 rounded-lg bg-slate-600 p-2 px-5 text-white transition hover:bg-slate-500"
                  onClick={verifyOTP}
                >
                  Verify
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default RegisterActionButton;
