import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Section from "@/components/Section";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "privacy"])),
    },
  };
}

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("privacy:head.title")}</title>
      </Head>

      <Section title={t("privacy:title")}>
        <p className="mb-4">{t("privacy:sections.0.paragraphs.0")}</p>

        <p className="mb-4">{t("privacy:sections.0.paragraphs.1")}</p>

        <p className="mb-4">{t("privacy:sections.0.paragraphs.2")}</p>

        <p className="mb-4">{t("privacy:sections.0.paragraphs.3")}</p>

        <h3 className="font-bold mb-2">{t("privacy:sections.1.title")}</h3>
        <p className="mb-4">{t("privacy:sections.1.description")}</p>

        <h3 className="font-bold mb-2">{t("privacy:sections.2.title")}</h3>
        <p className="mb-4">{t("privacy:sections.2.paragraphs.0")}</p>

        <p className="mb-4">{t("privacy:sections.2.paragraphs.1")}</p>

        <h3 className="font-bold mb-2">{t("privacy:sections.3.title")}</h3>
        <p className="mb-4">{t("privacy:sections.3.description")}</p>

        <h3 className="font-bold mb-2">{t("privacy:sections.4.title")}</h3>
        <p className="mb-4">{t("privacy:sections.4.description")}</p>

        <h3 className="font-bold mb-2">{t("privacy:sections.5.title")}</h3>
        <p className="mb-4">{t("privacy:sections.5.description")}</p>

        <h3 className="font-bold mb-2">{t("privacy:sections.6.title")}</h3>
        <p className="mb-4">{t("privacy:sections.6.paragraphs.0")}</p>
        <p className="mb-4">{t("privacy:sections.6.paragraphs.1")}</p>

        <h3 className="font-bold mb-2">{t("privacy:sections.7.title")}</h3>
        <p className="mb-4">
          {t("privacy:sections.7.description")}{" "}
          <Link
            href="mailto:info@echolabs.ch"
            className="underline hover:text-blue-500"
          >
            info@echolabs.ch
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
