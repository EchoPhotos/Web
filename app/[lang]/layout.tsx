import Clarity from '@components/Homepage/Clarity';
import '@/styles/style.css';
import '@/styles/globals.css';
import DefaultLayout from '@components/Homepage/DefaultLayout';
import { i18n } from '@utils/old/i18n-config';
import { getDictionary } from '@utils/dictionary';

export async function generateStaticParams() {
  return i18n.locales;
}

export default async function Layout({ children, params }) {
  const p = await params;

  const dicts = await getDictionary(p.lang);
  return (
    <html lang={p.lang}>
      <body>
        <DefaultLayout lang={p.lang} dicts={dicts}>
          <Clarity />
          {children}
        </DefaultLayout>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Echo Photos',
  description: 'Supreme Photo Sharing',
};
