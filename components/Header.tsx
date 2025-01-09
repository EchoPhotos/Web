'use client';

import { IoMenu, IoClose } from 'react-icons/io5';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import SignInWidget from '@components/Authentication/SignInWidget';
import AuthenticationButton from './Authentication/AuthenticationButton';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return (
    <header>
      <nav className="fixed z-[1] flex h-20 w-full items-center justify-between bg-white/70 px-4 py-3 backdrop-blur-md">
        <Link href="/">
          <img src="/images/logo125.png" height="50" width="125" alt="EchoPhotos logo" />
        </Link>

        <button className="md:hidden" onClick={toggleOpen}>
          {isOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
        </button>

        <div
          className={`absolute left-0 top-20 px-6 pb-3 ${
            isOpen ? 'bg-white/70 backdrop-blur-md' : 'hidden'
          } w-full md:relative md:top-0 md:mr-2 md:block md:w-auto md:p-0`}
        >
          <ul className="flex w-full flex-col justify-between gap-3 md:flex-row md:gap-6">
            <li key="home">
              <Link className="text-lg font-bold" href="/albums/new">
                New Album
              </Link>
            </li>
            <li>
              <Link href="/upload">Upload Image</Link>
            </li>
            <li>
              <Link href="/gallery">View Gallery</Link>
            </li>
            <li>
              <div className="-m-1">
                <AuthenticationButton />
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
