import Link from 'next/link';

export default async function Footer({ lang, dict }) {
  return (
    <footer className="mt-auto bg-neutral-100 py-12 text-sm">
      <div className="container mx-auto flex flex-col items-center text-center">
        <Link href={`/${lang}/`} className="mb-4 hover:underline">
          Echo Photos
        </Link>

        <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3 px-10">
          <li key="home">
            <Link className="font-bold hover:underline" href={`/${lang}/`}>
              {dict.footer.home}
            </Link>
          </li>

          <li key="webapp">
            <Link
              className="font-bold hover:underline"
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
              className="font-bold hover:underline"
            >
              {dict.footer.instagram}
            </Link>
          </li>

          <li key="privacy">
            <Link className="font-bold hover:underline" href={`/${lang}/privacy`}>
              {dict.footer.privacy}
            </Link>
          </li>

          <li key="press">
            <Link className="font-bold hover:underline" href={`/${lang}/press`}>
              {dict.footer.press}
            </Link>
          </li>
        </ul>

        <p className="mt-6 mb-8 text-xs leading-5 font-light text-neutral-500">
          {dict.footer.copyright['text-before']} &copy;{' '}
          <Link href="http://www.echolabs.ch" target="_blank" className="text-neutral-800">
            {' '}
            Echo Labs AG
          </Link>{' '}
          | {dict.footer.copyright.rights}
        </p>

        <span className="mb-4 text-neutral-500">{dict.footer['bottom-text']}</span>
      </div>
    </footer>
  );
}
