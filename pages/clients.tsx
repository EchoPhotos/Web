import * as IoIcons from "react-icons/io5";
import { GetStaticPropsContext } from "next";
import AppStore from "@/components/Badges/AppStore";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import ContentBox from "@/components/ContentBox";
import FeatureSection from "@/components/FeatureSection";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "home"])),
    },
  };
}

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <FeatureSection
        sectionId="desktop"
        title={t("home:desktop.title")}
        description={t("home:desktop.description")}
      >
        <ContentBox
          left={true}
          imageURL="/images/browser.jpg"
          title={t("home:desktop.sections.0.title")}
        >
          <p className="mb-4">{t("home:desktop.sections.0.description")}</p>
        </ContentBox>

        <ContentBox
          left={false}
          imageURL="/images/macOS.jpg"
          title={t("home:desktop.sections.1.title")}
        >
          <p className="mb-4">{t("home:desktop.sections.1.description")}</p>

          <AppStore mac />
        </ContentBox>
      </FeatureSection>
    </>
  );
}
