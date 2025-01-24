'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { IoChevronDown, IoWarning } from 'react-icons/io5';

export default function NoLinksAvailable() {
  return (
    <div className="mx-auto w-full max-w-sm divide-y divide-white/5 rounded-xl bg-white/5">
      <Disclosure as="div" className="rounded-xl bg-slate-200 p-2">
        <DisclosureButton className="group flex w-full items-center justify-between text-gray-800 hover:text-gray-600">
          <span className="flex flex-row text-sm/6 font-medium">
            <IoWarning size={22} className="mr-2 text-red-500" />
            No download links available
          </span>
          <IoChevronDown size={22} className="group-data-[open]:rotate-180" />
        </DisclosureButton>
        <DisclosurePanel className="mt-2 text-start text-sm font-light text-gray-700">
          <p>This album has used all available download links.</p>
          <p className="mt-2">
            To create an updated download link, you will need to upgrade the album to premium.
          </p>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
