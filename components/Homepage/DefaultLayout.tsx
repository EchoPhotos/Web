import Header from './Header';
import Footer from './Footer';

export default async function DefaultLayout({ lang, dicts, children }) {
  const dict = dicts.common;

  const headerItems = [
    {
      name: dict.navbar.weddings,
      href: `/wedding`,
    },
    {
      name: dict.navbar.features,
      href: `/#features`,
    },
    {
      name: dict.navbar.albums,
      href: `/#albums`,
    },
    {
      name: dict.navbar.desktop,
      href: `/#desktop`,
    },
    {
      name: dict.navbar.download,
      href: `/`,
    },
  ];
  return (
    <>
      <Header sections={headerItems} lang={lang} />
      <main className="h-auto pt-20">{children}</main>
      <Footer lang={lang} dict={dicts.common} />
    </>
  );
}
