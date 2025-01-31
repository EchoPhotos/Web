'use client';

import { IoClipboardOutline, IoCheckmarkOutline } from 'react-icons/io5';
import { useState } from 'react';

export default function Code(params: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(params.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div
      className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-slate-100 px-4 py-2 font-mono text-lg font-extralight transition-all duration-300 hover:bg-slate-800 hover:text-white"
      onClick={handleCopy}
    >
      <div className="relative flex items-center justify-center">
        <p className="flex items-center text-center">
          {params.code}
          <span className="ml-2">
            {copied ? (
              <IoCheckmarkOutline className="text-green-500" />
            ) : (
              <IoClipboardOutline className="text-gray-500" />
            )}
          </span>
        </p>
      </div>
    </div>
  );
}
