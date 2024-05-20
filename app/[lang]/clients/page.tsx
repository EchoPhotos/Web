import AppStore from "@/components/Badges/AppStore";
import ContentBox from "@/components/ContentBox";
import FeatureSection from "@/components/FeatureSection";
import { i18n } from "@/utils/i18n-config";

const dictionary = async (lang) => import(`/locales/${lang}/home.json`).then((module) => module.default);

export async function generateStaticParams() {
  return i18n.locales.map((lang) => {
    lang;
  });
}
export default async function HomePage({params}) {
  const dict = await dictionary(params.lang);

  return (
    <>
      <FeatureSection
        sectionId="desktop"
        title={dict.desktop.title}
        description={dict.desktop.description}
      >
        <ContentBox
          left={true}
          imageURL="/images/browser.jpg"
          title={dict.desktop.sections[0].title}
        >
          <p className="mb-4">{dict.desktop.sections[0].description}</p>
        </ContentBox>

        <ContentBox
          left={false}
          imageURL="/images/macOS.jpg"
          title={dict.desktop.sections[1].title}
        >
          <p className="mb-4">{dict.desktop.sections[1].description}</p>

          <AppStore mac />
        </ContentBox>
      </FeatureSection>
    </>
  );
}
