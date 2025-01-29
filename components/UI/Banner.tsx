import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Banner({ children, isVisible, onClose }) {
  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-white pointer-events-auto flex items-center gap-4 rounded-b-lg px-6 py-3 text-white shadow-lg"
          >
            {children}
            <button
              onClick={() => {
                onClose?.();
              }}
              className="rounded p-1 transition-colors hover:bg-white/20"
              aria-label="Close banner"
            >
              X
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
