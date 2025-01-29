'use client';

import { Switch } from '@headlessui/react';
import React, { useState } from 'react';
import { ReactNode } from 'react';

export function SizeAdapted({ desktop, mobile, className = '' }) {
  return (
    <>
      <div className={`md:hidden ${className}`}>{mobile}</div>
      <div className={`hidden md:block ${className}`}>{desktop}</div>
    </>
  );
}

export function HStack({ children, className = '' }) {
  return <div className={`flex flex-row ${className}`}>{children}</div>;
}

export function VStack({ children, className = '' }) {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
}

export function VCenter({ children }) {
  return <div className="flex h-full flex-col items-center justify-center">{children}</div>;
}

export function Toggle({
  onChange,
  enable,
}: {
  enable: boolean;
  onChange: (checked: boolean) => void;
}) {
  const [enabled, setEnabled] = useState(enable);

  return (
    <Switch
      checked={enabled}
      onChange={(checked) => {
        setEnabled(checked);
        onChange(checked);
      }}
      className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-gray-400 p-1 transition-colors duration-200 ease-in-out focus:outline-hidden data-checked:bg-green-500 data-focus:outline-1 data-focus:outline-white"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
      />
    </Switch>
  );
}

interface ZStackProps {
  children: ReactNode;
  className?: string; // Allows custom Tailwind classes to be added
}

const ZStack: React.FC<ZStackProps> = ({ children, className }) => {
  return (
    <div className={`relative h-full w-full ${className}`}>
      {React.Children.map(children, (child, index) => (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: index }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default ZStack;
