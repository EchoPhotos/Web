import { IoArrowDownCircleOutline } from "react-icons/io5";
import Head from "next/head";
import Link from "next/link";
import Section from "@/components/Section";

const dictionary = async () =>
  import("../../../public/locales/en/press.json").then((module) => module.default);

export default async function PressPage() {
  const dict = await dictionary();

  return (
    <>
      <Head>
        <title>{dict.head.title}</title>
      </Head>

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
