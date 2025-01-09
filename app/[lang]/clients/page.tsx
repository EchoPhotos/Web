import AppStore from "@old-components/Badges/AppStore";
import ContentBox from "@old-components/ContentBox";
import FeatureSection from "@old-components/FeatureSection";
import { getDictionary } from "@old-utils/dictionary";
import { i18n } from "@old-utils/i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((lang) => {
    lang;
  });
}
export default async function HomePage({params}) {
  const dicts = await getDictionary(params.lang);
  const dict = dicts.home;

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
