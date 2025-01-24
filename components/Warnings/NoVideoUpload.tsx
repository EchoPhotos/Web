import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { IoChevronDown, IoInformationCircleOutline } from 'react-icons/io5';

export default function NoVideoUploadAvailable() {
  return (
    <div className="w-full max-w-sm divide-y divide-white/5 rounded-xl bg-white/5">
      <Disclosure as="div" className="rounded-xl bg-slate-200 p-2">
        <DisclosureButton className="group flex w-full items-center justify-between text-gray-800 hover:text-gray-600">
          <span className="flex flex-row text-sm/6 font-medium">
            <IoInformationCircleOutline size={22} className="mr-2 text-yellow-500" />
            Upload videos from app
          </span>
          <IoChevronDown size={22} className="group-data-[open]:rotate-180" />
        </DisclosureButton>
        <DisclosurePanel className="mt-2 text-start text-sm font-light text-gray-700">
          <p>
            Video uploads are currently only from the apps. You can install the app both on iOS and
            Android.
          </p>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
