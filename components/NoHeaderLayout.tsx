import Footer from './Footer';
import { PropsWithChildren } from 'react';

export default function NoHeaderLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main className="h-auto">{children}</main>
      <Footer />
    </>
  );
}
