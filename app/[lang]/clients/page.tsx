import AppStore from '@components/Homepage/Badges/AppStore';
import ContentBox from '@components/Homepage/ContentBox';
import FeatureSection from '@components/Homepage/FeatureSection';
import { getDictionary } from '@utils/dictionary';
import { i18n } from '@utils/old/i18n-config';
import browser from '@images/browser.jpg';
import macOS from '@images/macOS.jpg';

export async function generateStaticParams() {
  return i18n.locales;
}

export default async function HomePage(props) {
  const params = await props.params;
  const dicts = await getDictionary(params.lang);
  const dict = dicts.home;

  return (
    <>
      <FeatureSection
        sectionId="desktop"
        title={dict.desktop.title}
        description={dict.desktop.description}
      >
        <ContentBox left={true} image={browser} title={dict.desktop.sections[0].title}>
          <p className="mb-4">{dict.desktop.sections[0].description}</p>
        </ContentBox>

        <ContentBox left={false} image={macOS} title={dict.desktop.sections[1].title}>
          <p className="mb-4">{dict.desktop.sections[1].description}</p>

          <AppStore mac />
        </ContentBox>
      </FeatureSection>
    </>
  );
}
