"use client"

import { IoMenu, IoClose } from "react-icons/io5";
import Link from "next/link";
import { useCallback, useState } from "react";

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
      <nav className="z-[1] h-20 py-3 px-4 flex items-center justify-between w-full fixed backdrop-blur-md bg-white/70">
        <Link href="/">
          <img
            src="/images/logo125.png"
            height="50"
            width="125"
            alt="EchoPhotos logo"
          />
        </Link>

        <button className="md:hidden" onClick={toggleOpen}>
          {isOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
        </button>

        <div
          className={`absolute top-20 left-0 px-6 pb-3 ${
            isOpen ? "bg-white/70 backdrop-blur-md" : "hidden"
          } w-full md:p-0 md:w-auto md:mr-2 md:top-0 md:relative md:block`}
        >
          <ul className="flex justify-between flex-col w-full gap-3 md:flex-row md:gap-6">
            {sections.map((section) => (
              <li key={section.name}>
                <Link
                  className="hover:underline text-lg font-bold"
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
