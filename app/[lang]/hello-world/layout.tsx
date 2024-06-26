import Section from "@/components/Section";
import { i18n } from "@/utils/i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((lang) => {
    lang;
  });
}
export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return <Section title="Test">{children}</Section>;
}
