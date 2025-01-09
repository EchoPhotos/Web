'use client';

import { IoChevronDown, IoWarning } from 'react-icons/io5';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';

export default function DownloadLimitWarning({ limit, used }: { limit: number; used?: number }) {
  return (
    <div className="mx-auto w-full max-w-sm divide-y divide-white/5 rounded-xl bg-white/5">
      <Disclosure as="div" className="rounded-xl bg-slate-200 p-2">
        <DisclosureButton className="group flex w-full items-center justify-between text-gray-800 hover:text-gray-600">
          <span className="flex flex-row text-sm/6 font-medium">
            <IoWarning size={22} color="orange" className="mr-2" />
            Limited download links
          </span>
          <IoChevronDown size={22} className="group-data-[open]:rotate-180" />
        </DisclosureButton>
        <DisclosurePanel className="mt-2 text-start text-sm font-light text-gray-700">
          Note: New photo uploads will not be included in existing download links after they are
          created.
          <p>
            {used ?? 0} out of {limit} available download(s) gave been used.
          </p>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
