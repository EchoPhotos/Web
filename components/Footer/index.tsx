import Link from "next/link";
import styles from "./Footer.module.css";

const dictionary = () =>
  import("../../public/locales/en/common.json").then(
    (module) => module.default
  );

export default async function Footer() {
  const dict = await dictionary();

  return (
    <footer className="bg-neutral-100 py-12 text-sm mt-auto">
      <div className="container mx-auto text-center flex flex-col items-center">
        <Link href="/" className="hover:underline mb-4">
          Echo Photos
        </Link>

        <ul className="flex gap-x-6 gap-y-3 mt-4 flex-wrap justify-center px-10">
          <li>
            <Link className={styles.footerLink} href="/">
              {dict.footer.home}
            </Link>
          </li>

          <li>
            <Link
              className={styles.footerLink}
              href="https://web.echophotos.io"
              target="_blank"
            >
              {dict.footer.webapp}
            </Link>
          </li>

          <li>
            <Link
              href="http://instagram.com/echophotos.io"
              target="_blank"
              rel="noreferrer noopener"
              className={styles.footerLink}
            >
              {dict.footer.instagram}
            </Link>
          </li>

          <li>
            <Link className={styles.footerLink} href="/privacy">
              {dict.footer.privacy}
            </Link>
          </li>

          <li>
            <Link className={styles.footerLink} href="/press">
              {dict.footer.press}
            </Link>
          </li>
        </ul>

        <p className="text-neutral-500 font-light text-xs leading-5 mt-6 mb-8">
          {dict.footer.copyright["text-before"]} &copy;{" "}
          <Link
            href="http://www.echolabs.ch"
            target="_blank"
            className="text-neutral-800"
          >
            {" "}
            Echo Labs AG
          </Link>{" "}
          | {dict.footer.copyright.rights}
        </p>

        <span className="text-neutral-500 mb-4">{dict.footer["bottom-text"]}</span>
      </div>
    </footer>
  );
}
