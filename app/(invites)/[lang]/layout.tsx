import NoHeaderLayout from '@components/Homepage/NoHeaderLayout';
import '@/styles/style.css';
import '@/styles/globals.css';
import { getDictionary } from '@utils/dictionary';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  params: any;
}) {
  const { lang } = await params;
  const dicts = await getDictionary(lang);
  return (
    <html lang={lang}>
      <body>
        <NoHeaderLayout lang={lang} dicts={dicts}>
          {children}
        </NoHeaderLayout>
      </body>
    </html>
  );
}
