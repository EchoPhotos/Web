import Clarity from "@/components/Clarity";
import "@/styles/style.css";
import DefaultLayout from "@/components/DefaultLayout";
import { getDictionary } from "@/utils/dictionary";


export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dict = await getDictionary("en");
  return (
    <html lang="en">
      <body>
        <DefaultLayout lang="en" dicts={dict}>
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
