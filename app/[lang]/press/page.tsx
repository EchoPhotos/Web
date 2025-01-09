import { IoArrowDownCircleOutline } from 'react-icons/io5';
import Link from 'next/link';
import Section from '@old-components/Section';
import { i18n } from '@old-utils/i18n-config';
import { getDictionary } from '@old-utils/dictionary';

export async function generateStaticParams() {
  return i18n.locales.map((lang) => {
    lang;
  });
}
export default async function PressPage({ params }) {
  const dicts = await getDictionary(params.lang);
  const dict = dicts.press;

  return (
    <>
      <Section title={dict.title}>
        <p className="mb-4">{dict.description}</p>

        <Link
          href="https://drive.google.com/file/d/1PBWO5sMAmvOZXWJRvTqc7jXGNEVen-vp/view?usp=sharing"
          className="mb-4 flex items-center gap-2 underline hover:text-blue-500"
          target="_blank"
        >
          <IoArrowDownCircleOutline size={20} />
          {dict.kit}
        </Link>

        <Link
          href="https://drive.google.com/file/d/1QHwwimtBLHvvvqouhTmqMmy6Kn_ejor8/view?usp=sharing"
          className="mb-4 flex items-center gap-2 underline hover:text-blue-500"
          target="_blank"
        >
          <IoArrowDownCircleOutline size={20} />
          {dict.flyer}
        </Link>
      </Section>
    </>
  );
}
