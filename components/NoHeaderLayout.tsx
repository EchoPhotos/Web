import Footer from './Footer';

export default function NoHeaderLayout({ lang, dicts, children }) {
  return (
    <>
      <main className="h-auto">{children}</main>
      <Footer lang={lang} dict={dicts.common}/>
    </>
  );
}
