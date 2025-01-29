import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { IoChevronDown } from 'react-icons/io5';

export default function Discolosure({ title, children }) {
  return (
    <Disclosure as="div" className="w-full max-w-64 rounded-xl bg-slate-200 p-2">
      <DisclosureButton className="group flex w-full items-center justify-between text-gray-800 hover:text-gray-600">
        {title}

        <IoChevronDown
          size={22}
          className="transform transition-transform duration-200 group-data-open:rotate-180"
        />
      </DisclosureButton>

      <DisclosurePanel className="mt-2 text-start text-sm font-light text-gray-700">
        {children}
      </DisclosurePanel>
    </Disclosure>
  );
}
