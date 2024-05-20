import Clarity from "@/components/Clarity";
import "@/styles/style.css";
import DefaultLayout from "@/components/DefaultLayout";
import { i18n } from "@/utils/i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((lang) => {
    lang;
  });
}
export default function Layout({
  children, params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang={params.lang}>
      <body>
        <DefaultLayout lang={params.lang}>
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
