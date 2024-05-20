import Head from "next/head";
import Link from "next/link";

import Section from "@/components/Section";
import { i18n } from "@/utils/i18n-config";

const dictionary = async (lang: string) =>
  import(`/locales/${lang}/privacy.json`).then(
    (module) => module.default
  );

export async function generateStaticParams() {
  return i18n.locales.map((lang) => {
    lang;
  });
}
export default async function PrivacyPage({ params: { lang } }) {
  const dict = await dictionary(lang);

  return (
    <>
      <Head>
        <title>{dict.head.title}</title>
      </Head>

      <Section title={dict.title}>
        <p className="mb-4">{dict.sections[0].paragraphs?.[0]}</p>

        <p className="mb-4">{dict.sections[0].paragraphs?.[1]}</p>

        <p className="mb-4">{dict.sections[0].paragraphs?.[2]}</p>

        <p className="mb-4">{dict.sections[0].paragraphs?.[3]}</p>

        <h3 className="font-bold mb-2">{dict.sections[1].title}</h3>
        <p className="mb-4">{dict.sections[1].description}</p>

        <h3 className="font-bold mb-2">{dict.sections[2].title}</h3>
        <p className="mb-4">{dict.sections[2].paragraphs?.[0]}</p>

        <p className="mb-4">{dict.sections[2].paragraphs?.[1]}</p>

        <h3 className="font-bold mb-2">{dict.sections[3].title}</h3>
        <p className="mb-4">{dict.sections[3].description}</p>

        <h3 className="font-bold mb-2">{dict.sections[4].title}</h3>
        <p className="mb-4">{dict.sections[4].description}</p>

        <h3 className="font-bold mb-2">{dict.sections[5].title}</h3>
        <p className="mb-4">{dict.sections[5].description}</p>

        <h3 className="font-bold mb-2">{dict.sections[6].title}</h3>
        <p className="mb-4">{dict.sections[6].paragraphs?.[0]}</p>
        <p className="mb-4">{dict.sections[6].paragraphs?.[1]}</p>

        <h3 className="font-bold mb-2">{dict.sections[7].title}</h3>
        <p className="mb-4">
          {dict.sections[7].description}{" "}
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
