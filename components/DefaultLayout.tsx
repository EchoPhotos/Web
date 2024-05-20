"use client";

import Header from "./Header";
import Footer from "./Footer";

const dictionary = async (lang) =>
  import(`/locales/${lang}/common.json`).then((module) => module.default);

export default async function DefaultLayout({ lang, children}) {
  const dict = await dictionary(lang);
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
      <main className="pt-20 h-auto">{children}</main>
      <Footer lang={lang} />
    </>
  );
}
