'use client';

import React, { useEffect, useState } from 'react';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  ConfirmationResult,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@utils/FirebaseConfig';
import SignOutButton from './SignOutButton';
import { Button } from '@headlessui/react';

enum State {
  SignedOut,
  Loading,
  VerificationSent,
  SignedIn,
}

export default function SignInWidget() {
  const [userPhone, setUserPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [state, setState] = useState(State.Loading);
  const [verificationId, setVid] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setState(State.SignedIn);
      } else {
        setState(State.SignedOut);
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePhoneChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserPhone(event.target.value);
  };

  const handleOtpChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setOtp(event.target.value);
  };

  const handlePhone = async () => {
    if (userPhone === '') {
      alert('Please enter a valid phone number');
    } else {
      const phoneNumber = userPhone;

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
      } catch (error) {
        alert(`${error}. Please try again!`);
      }
    }
  };

  const handleOtp = async () => {
    if (otp === '') {
      alert('Please enter a valid code');
    } else {
      const phoneCredential = PhoneAuthProvider.credential(verificationId, otp);

      try {
        await signInWithCredential(auth, phoneCredential);
        setState(State.SignedIn);
      } catch (error) {
        if (error instanceof Error && error.message === 'INVALID_CODE') {
          alert('Invalid code. Check you are entering the correct code.');
        } else {
          const message = error instanceof Error ? error.message : 'Unknown error';
          alert(`${message} - Please try again later.`);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-start justify-center rounded-lg">
      <div id="recaptcha"></div>

      {state === State.Loading && <div>Loading..</div>}
      {state === State.SignedOut && (
        <>
          <p className="py-1 text-xs">Phone number</p>
          <input
            type="tel"
            placeholder="+1 (XXX) XXX XX XX"
            className="mb-3 w-56 rounded-xs px-2 py-1 text-center text-sm ring-1"
            onChange={handlePhoneChange}
          />
          <Button onClick={handlePhone} className="btn btn-primary">
            Sign In
          </Button>
        </>
      )}
      {state === State.VerificationSent && (
        <>
          <p className="py-1 text-xs">SMS code</p>

          <input
            type="text"
            autoComplete="one-time-code"
            placeholder="123456"
            className="mb-3 w-56 rounded-xs px-2 py-1 text-center text-sm ring-1"
            onChange={handleOtpChange}
          />

          <Button onClick={handleOtp} className="btn btn-primary">
            Verify
          </Button>
        </>
      )}

      {state === State.SignedIn && (
        <div className="w-full space-y-2" id="success">
          <div className="flex w-full justify-center">
            <p>Signed in successfully!</p>
            <SignOutButton />
          </div>
        </div>
      )}
    </div>
  );
}
