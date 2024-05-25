import { IoArrowDownCircleOutline } from "react-icons/io5";
import Link from "next/link";
import Section from "@/components/Section";
import { i18n } from "@/utils/i18n-config";
import { getDictionary } from "@/utils/dictionary";

export async function generateStaticParams() {
  return i18n.locales.map((lang) => {
    lang;
  });
}
export default async function PressPage({params}) {
  const dicts = await getDictionary(params.lang);
  const dict = dicts.press;

  return (
    <>
      <Section title={dict.title}>
        <p className="mb-4">{dict.description}</p>

        <Link
          href="https://drive.google.com/file/d/1PBWO5sMAmvOZXWJRvTqc7jXGNEVen-vp/view?usp=sharing"
          className="underline hover:text-blue-500 flex gap-2 items-center mb-4"
          target="_blank"
        >
          <IoArrowDownCircleOutline size={20} />
          {dict.kit}
        </Link>

        <Link
          href="https://drive.google.com/file/d/1QHwwimtBLHvvvqouhTmqMmy6Kn_ejor8/view?usp=sharing"
          className="underline hover:text-blue-500 flex gap-2 items-center mb-4"
          target="_blank"
        >
          <IoArrowDownCircleOutline size={20} />
          {dict.flyer}
        </Link>
      </Section>
    </>
  );
}
