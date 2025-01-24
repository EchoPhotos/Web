'use client';

import Logo from './Logo';

export default function PanelView({ panelConent, children }) {
  return (
    <div className="flex w-full flex-col md:h-full md:flex-row">
      <div className="w-full md:h-full md:w-2/5">
        <div className="h-full bg-black text-white md:rounded-l-3xl">
          <div className="flex h-full flex-col items-center justify-between md:items-end">
            <div className="flex h-full flex-col items-end justify-between overflow-scroll md:overflow-auto">
              {panelConent}
            </div>

            <div className="hidden px-9 py-4 md:block">
              <Logo />
            </div>
          </div>
        </div>
      </div>

      {/* This is a HStack in small screens and a VStack in large ones */}
      <div className="flex h-full w-full flex-col items-center md:h-full md:w-3/5 md:flex-row">
        {children}
      </div>
    </div>
  );
}
