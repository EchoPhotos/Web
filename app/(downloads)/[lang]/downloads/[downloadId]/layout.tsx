import Footer from "@old-components/Footer";
import "@/styles/style.css";
import { getDictionary } from "@old-utils/dictionary";
import Link from "next/link";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const dicts = await getDictionary(params.lang);
  return (
    <html lang={params.lang}>
      <body>
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
          </nav>
        </header>
        <main className="pt-20 h-auto">{children}</main>
        <Footer lang={params.lang} dict={dicts.common} />
      </body>
    </html>
  );
}
