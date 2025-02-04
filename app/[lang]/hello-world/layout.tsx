import { i18n } from '@utils/old/i18n-config';

export async function generateStaticParams() {
  return i18n.locales.map((lang) => {
    return lang;
  });
}
export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-8 text-gray-800 md:px-12">
      {children}
    </article>
  );
}
