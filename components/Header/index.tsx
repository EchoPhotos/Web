import { IoMenu, IoClose } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import styles from "./header.module.css";
import { clarity } from "react-microsoft-clarity";

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const domain = window.location.hostname;
    if (domain.includes('echophotos.io')) {
      clarity.init("l9xrwqeki0");
    }
    setIsOpen(false);
  }, [router.asPath]);

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return (
    <header>
      <nav className="z-[1] h-20 py-3 px-4 flex items-center justify-between w-full fixed backdrop-blur-md bg-white/70">
        <Link className="nav-brand" href="/">
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
            <li>
              <Link className={styles.navLink} href="/wedding">
                {t("navbar.weddings")}
              </Link>
            </li>

            <li>
              <Link className={styles.navLink} href="/#features">
                {t("navbar.features")}
              </Link>
            </li>

            <li>
              <Link className={styles.navLink} href="/#albums">
                {t("navbar.albums")}
              </Link>
            </li>

            <li>
              <Link className={styles.navLink} href="/#desktop">
                {t("navbar.desktop")}
              </Link>
            </li>

            <li>
              <Link className={styles.navLink} href="/">
                {t("navbar.download")}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
