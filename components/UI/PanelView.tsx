'use client';

import Logo from './Logo';

export default function PanelView({ panelConent, children }) {
  return (
    <div className="flex w-full flex-col md:h-full md:flex-row">
      <div className="flex w-full flex-row-reverse items-end justify-center bg-black pb-2 text-white md:h-full md:w-2/5 md:flex-col md:items-end md:rounded-l-3xl">
        {panelConent}
        <div className="px-2 md:px-9 md:py-4">
          <Logo />
        </div>
      </div>

      <div className="flex h-full w-full flex-col items-center md:h-full md:w-3/5 md:flex-row">
        {children}
      </div>
    </div>
  );
}
