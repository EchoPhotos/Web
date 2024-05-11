"use client";

import Header from "./Header";
import Footer from "./Footer";
import { PropsWithChildren } from "react";

const dictionary = async () =>
  import("../public/locales/en/common.json").then(
    (module) => module.default
  );

export default async function DefaultLayout({ children }: PropsWithChildren) {
  const dict = await dictionary();
  return (
    <>
      <Header
        sections={[
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
        ]}
      />
      <main className="pt-20 md:pt-0 h-auto">{children}</main>
      <Footer />
    </>
  );
}
