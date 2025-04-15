import { IoArrowDownCircleOutline } from 'react-icons/io5';
import Link from 'next/link';
import Section from '@components/Homepage/Section';
import { i18n } from '@utils/old/i18n-config';
import { getDictionary } from '@utils/dictionary';

export async function generateStaticParams() {
  return i18n.locales;
}

export default async function PressPage(props) {
  const params = await props.params;
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
