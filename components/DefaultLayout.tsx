"use client";

import Header from "./Header";
import Footer from "./Footer";
import { PropsWithChildren } from "react";

const dictionary = async () =>
  import("../public/locales/en/common.json").then((module) => module.default);

export default async function DefaultLayout({ children }: PropsWithChildren) {
  const dict = await dictionary();
  const headerItems = [
    {
      name: dict.navbar.weddings,
      href: "/wedding",
    },
    {
      name: dict.navbar.features,
      href: "/#features",
    },
    {
      name: dict.navbar.albums,
      href: "/#albums",
    },
    {
      name: dict.navbar.desktop,
      href: "/#desktop",
    },
    {
      name: dict.navbar.download,
      href: "/",
    },
  ];
  return (
    <>
      <Header sections={headerItems} />
      <main className="pt-20 h-auto">{children}</main>
      <Footer />
    </>
  );
}
