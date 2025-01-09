import NoHeaderLayout from '@old-components/NoHeaderLayout';
import '@/styles/style.css';
import { getDictionary } from '@old-utils/dictionary';

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
