'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Button,
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { IoCheckmarkCircle } from 'react-icons/io5';

export function SuccessfullPurchaseDialog() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const checkoutParam = searchParams.get('checkout');

  useEffect(() => {
    if (checkoutParam === 'purchased-premium') {
      setOpen(true);
    }
  }, [checkoutParam]);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      as="div"
      className="relative z-10 focus:outline-hidden"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogBackdrop transition className="fixed inset-0 bg-black/5 backdrop-blur-xs" />

          <DialogPanel
            transition
            className="bg-opacity-75 flex w-full max-w-md flex-col items-center rounded-xl bg-white p-6 text-center backdrop-blur-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle className="m-2 text-2xl font-bold">
              <div className="flex flex-col items-center gap-4">
                <IoCheckmarkCircle size={88} className="text-green-500" />
                <DialogTitle>Purchase Successful!</DialogTitle>
              </div>
            </DialogTitle>
            <Description className="my-2 w-1/2 text-sm text-gray-800">
              <p>This album is now a premium album!</p>
            </Description>
            <Button className="btn btn-secondary sm:justify-start" onClick={() => setOpen(false)}>
              OK
            </Button>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
