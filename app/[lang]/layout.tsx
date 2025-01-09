import Clarity from "@old-components/Clarity";
import "@/styles/style.css";
import DefaultLayout from "@old-components/DefaultLayout";
import { i18n } from "@old-utils/i18n-config";
import { getDictionary } from "@old-utils/dictionary";

export async function generateStaticParams() {
  return i18n.locales.map((lang) => {
    lang;
  });
}
export default async function Layout({
  children, params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const dicts = await getDictionary(params.lang);
  const dict = dicts.privacy;
  return (
    <html lang={params.lang}>
      <body>
        <DefaultLayout lang={params.lang} dicts={dicts}>
          <Clarity />
          {children}
        </DefaultLayout>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Echo Photos",
  description: "Supreme Photo Sharing",
};
