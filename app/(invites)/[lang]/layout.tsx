import NoHeaderLayout from '@components/Homepage/NoHeaderLayout';
import '@/styles/style.css';
import { getDictionary } from '@utils//dictionary';

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
        <NoHeaderLayout lang={params.lang} dicts={dicts}>
          {children}
        </NoHeaderLayout>
      </body>
    </html>
  );
}
