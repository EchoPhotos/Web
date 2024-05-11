import "../globals.css";
import "../../styles/style.css";
import DefaultLayout from "@/components/DefaultLayout";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DefaultLayout>
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
