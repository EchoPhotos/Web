import Link from "next/link";

export default async function Footer({ lang, dict }) {
  return (
    <footer className="bg-neutral-100 py-12 text-sm mt-auto">
      <div className="container mx-auto text-center flex flex-col items-center">
        <Link href={`/${lang}/`} className="hover:underline mb-4">
          Echo Photos
        </Link>

        <ul className="flex gap-x-6 gap-y-3 mt-4 flex-wrap justify-center px-10">
          <li key="home">
            <Link className="hover:underline font-bold" href={`/${lang}/`}>
              {dict.footer.home}
            </Link>
          </li>

          <li key="webapp">
            <Link
              className="hover:underline font-bold"
              href="https://web.echophotos.io"
              target="_blank"
            >
              {dict.footer.webapp}
            </Link>
          </li>

          <li key="insta">
            <Link
              href="http://instagram.com/echophotos.io"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:underline font-bold"
            >
              {dict.footer.instagram}
            </Link>
          </li>

          <li key="privacy">
            <Link className="hover:underline font-bold" href={`/${lang}/privacy`}>
              {dict.footer.privacy}
            </Link>
          </li>

          <li key="press">
            <Link className="hover:underline font-bold" href={`/${lang}/press`}>
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

        <span className="text-neutral-500 mb-4">
          {dict.footer["bottom-text"]}
        </span>
      </div>
    </footer>
  );
}
