'use client';

import React from 'react';

import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { AnimatePresence } from 'framer-motion';

export default function ModalDialog({
  children,
  onClose,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: (value: boolean) => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={onClose}
        >
          <div className="fixed inset-0 z-10 m-12 flex items-center justify-center overflow-y-auto">
            <DialogBackdrop transition className="fixed inset-0 bg-black/5 backdrop-blur-sm" />

            <DialogPanel
              transition
              className="data-[closed]:transform-[scale(95%)] h-full max-h-96  flex w-full max-w-xl flex-col items-center rounded-xl bg-white bg-opacity-70 p-6 text-center backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
            >
              {children}
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
