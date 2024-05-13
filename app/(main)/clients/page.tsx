import AppStore from "@/components/Badges/AppStore";
import ContentBox from "@/components/ContentBox";
import FeatureSection from "@/components/FeatureSection";

const dictionary = async () => import("../../../public/locales/en/home.json").then((module) => module.default);

export default async function HomePage() {
  const dict = await dictionary();

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
