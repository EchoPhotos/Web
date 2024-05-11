import { IoArrowDownCircleOutline } from "react-icons/io5";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Section from "@/components/Section";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "press"])),
    },
  };
}

export default function PressPage() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("press:head.title")}</title>
      </Head>

      <Section title={t("press:title")}>
        <p className="mb-4">{t("press:description")}</p>

        <Link
          href="https://drive.google.com/file/d/1PBWO5sMAmvOZXWJRvTqc7jXGNEVen-vp/view?usp=sharing"
          className="underline hover:text-blue-500 flex gap-2 items-center mb-4"
          target="_blank"
        >
          <IoArrowDownCircleOutline size={20} />
          {t("press:kit")}
        </Link>

        <Link
          href="https://drive.google.com/file/d/1QHwwimtBLHvvvqouhTmqMmy6Kn_ejor8/view?usp=sharing"
          className="underline hover:text-blue-500 flex gap-2 items-center mb-4"
          target="_blank"
        >
          <IoArrowDownCircleOutline size={20} />
          {t("press:flyer")}
        </Link>
      </Section>
    </>
  );
}
