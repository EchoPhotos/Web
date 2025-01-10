'use client';

import { IoMenu, IoClose } from 'react-icons/io5';
import Link from 'next/link';
import { useCallback, useState } from 'react';

interface HeaderSection {
  name: string;
  href: string;
}

interface HeaderSections {
  sections: HeaderSection[];
  lang: string;
}

export default ({ sections, lang }: HeaderSections) => {
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
            {sections.map((section) => (
              <li key={section.name}>
                <Link
                  className="text-lg font-bold hover:underline"
                  href={`/${lang}/` + section.href}
                >
                  {section.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};
