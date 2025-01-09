import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

export default function PhoneExplanationPopover() {
  return (
    <Popover>
      <PopoverButton className="text-xs font-semibold text-slate-400 focus:outline-none data-[active]:text-black data-[hover]:text-slate-500 data-[focus]:outline-1 data-[focus]:outline-white">
        Why is your number needed?
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="z-10 divide-y divide-white/5 rounded-xl bg-white bg-opacity-80 text-sm/6 shadow-lg backdrop-blur-xl transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        <div className="p-3">
          <a className="block rounded-lg px-3 py-2 transition hover:bg-white/5" href="#">
            <p className="font-semibold text-black">Identification</p>
            <p className="text-black/50">We can verify its really you.</p>
          </a>
          <a className="block rounded-lg px-3 py-2 transition hover:bg-white/5" href="#">
            <p className="font-semibold text-black">Simplicity</p>
            <p className="text-black/50">You do not need to remember another password.</p>
          </a>
          <a className="block rounded-lg px-3 py-2 transition hover:bg-white/5" href="#">
            <p className="font-semibold text-black">Reports</p>
            <p className="text-black/50">Keep track of your growth</p>
          </a>
        </div>
        <div className="p-3">
          <a className="block rounded-lg px-3 py-2 transition hover:bg-white/5" href="#">
            <p className="font-semibold text-black">Privacy</p>
            <p className="w-72 text-black/50">
              At Echo Photos, we value privacy extremely. Using a phone number helps to improve the
              experience a lot, but it comes with a huge responsibility.
            </p>
            <p className="w-72 text-black/50">
              Your number is never shared with any third party and not used for anything except for
              identifying you.
            </p>
            <p className="w-72 text-black/50">
              We will also never share it with users that do not have your number already in their
              contacts.
            </p>
          </a>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
