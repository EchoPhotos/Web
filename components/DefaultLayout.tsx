import Header from './Header';
import Footer from './Footer';
import { PropsWithChildren } from 'react';

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="pt-20 md:pt-0 h-auto">{children}</main>
      <Footer />
    </>
  );
}
