import NoHeaderLayout from '@components/Homepage/NoHeaderLayout';
import '@/styles/style.css';
import '@/styles/globals.css';
import { getDictionary } from '@utils/dictionary';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const lang = params.lang;
  const dicts = await getDictionary(params.lang);
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
