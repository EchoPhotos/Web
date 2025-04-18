import * as IoIcons from 'react-icons/io5';
import Link from 'next/link';
import AppStore from '@components/Homepage/Badges/AppStore';
import Featurette from '@components/Homepage/Featurette';
import GooglePlay from '@components/Homepage/Badges/GooglePlay';
import ContentBox from '@components/Homepage/ContentBox';
import FeatureSection from '@components/Homepage/FeatureSection';
import FullScreenSection from '@components/Homepage/FullScreenSection';
import { i18n } from '@utils/old/i18n-config';
import { getDictionary } from '@utils/dictionary';
import Image from 'next/image';
import headerImage from '@images/iphone.png';
import image from '@images/image.png';
import group from '@images/group.png';
import groups from '@images/groups.png';
import wallis from '@images/wallis.jpg';
import title from '@images/title.png';
import browser from '@images/browser.jpg';
import macOS from '@images/macOS.jpg';

export async function generateStaticParams() {
  return i18n.locales;
}

export default async function HomePage({ params }) {
  const { lang } = await params;

  const dicts = await getDictionary(lang);
  const dict = dicts.home;

  return (
    <>
      <FullScreenSection className="-mt-20">
        <ContentBox left={true} image={title} title="">
          <h1 className="mb-6 font-bold">{dict.title}</h1>

          <p className="mb-6">{dict.subtitle}</p>

          <Link
            href="/albums/new"
            className="my-6 flex min-h-8 max-w-64 min-w-36 flex-row items-center justify-center space-x-1 rounded-md bg-blue-500 px-1 py-1 text-sm font-semibold text-white shadow-md shadow-blue-500/40 hover:bg-blue-400 md:min-h-10 md:min-w-48 md:space-x-3 md:px-3 md:py-2 md:text-base md:shadow-lg"
          >
            {dicts.general.createNewAlbumButton}
          </Link>

          <div className="flex items-center justify-center md:justify-start">
            <AppStore />

            <GooglePlay />

            {/* <Link
              className="bg-black hover:bg-slate-400 text-white rounded-md font-semibold px-4 p-2"
              href={"https://buy.stripe.com/eVa3d0dOpgHj7dK8ww"}
            >
              {dict.donate}
            </Link> */}
          </div>
        </ContentBox>
      </FullScreenSection>

      <section className="bg-gray-100 pt-24 pb-40" id="features">
        <div
          className={`container m-auto flex max-w-6xl flex-col items-center px-4 text-center md:text-left`}
        >
          <h2 className="mb-10 font-bold md:mb-6">{dict.featureOverviewSection.title}</h2>

          <div className="flex grid-flow-col grid-cols-3 grid-rows-3 flex-col gap-10 md:grid md:gap-y-4">
            <Featurette
              icon={<IoIcons.IoImages />}
              title={dict.featureOverviewSection.features[0].title}
            >
              {dict.featureOverviewSection.features[0].description}
            </Featurette>

            <Featurette
              icon={<IoIcons.IoLockClosed />}
              title={dict.featureOverviewSection.features[1].title}
            >
              {dict.featureOverviewSection.features[1].description}
            </Featurette>

            <Featurette
              icon={<IoIcons.IoStar />}
              title={dict.featureOverviewSection.features[2].title}
            >
              {dict.featureOverviewSection.features[2].description}
            </Featurette>

            <div className="row-span-3 mx-auto my-auto">
              <Image src={headerImage} alt="Echo Photos" />
            </div>

            <Featurette
              icon={<IoIcons.IoRadioOutline />}
              title={dict.featureOverviewSection.features[3].title}
            >
              {dict.featureOverviewSection.features[3].description}
            </Featurette>

            <Featurette
              icon={<IoIcons.IoSparkles />}
              title={dict.featureOverviewSection.features[4].title}
            >
              {dict.featureOverviewSection.features[4].description}
            </Featurette>

            <Featurette
              icon={<IoIcons.IoPeople />}
              title={dict.featureOverviewSection.features[5].title}
            >
              {dict.featureOverviewSection.features[5].description}
            </Featurette>
          </div>
        </div>
      </section>

      <section className="bg-zinc-800 py-20 text-white">
        <ContentBox left={true} image={groups} title="">
          <h3 className="">{dict.privacy.subtitle}</h3>

          <h2 className="mb-2.5 flex items-center justify-center gap-2 text-[2.25rem] font-bold md:justify-start">
            {dict.privacy.title}
            <IoIcons.IoLockClosed color="white" size={30} />
          </h2>

          <p className="my-2">{dict.privacy.paragraphs[0]}</p>

          <p className="my-2">{dict.privacy.paragraphs[1]}</p>

          <p className="my-2">{dict.privacy.paragraphs[2]}</p>

          <p className="my-2">{dict.privacy.paragraphs[3]}</p>
        </ContentBox>
      </section>

      <section className="py-24">
        <ContentBox left={false} image={wallis} title="">
          <div className="text-right md:text-right">
            <h3 className="text-green-700">{dict.climate.subtitle}</h3>

            <h2 className="mb-4 flex items-center justify-center gap-2 text-[2.25rem] font-bold text-green-700 md:justify-end">
              <IoIcons.IoLeaf className="-z-10 -scale-x-100" size={32} />
              {dict.climate.title}
            </h2>

            <p className="mb-1">{dict.climate.paragraphs[0]}</p>

            <p className="mb-4">{dict.climate.paragraphs[1]}</p>
          </div>
        </ContentBox>
      </section>

      <FeatureSection sectionId="albums" title={dict.albums.title} description="">
        <ContentBox left={true} image={group} title={dict.albums.sections[0].title}>
          <p className="my-1">{(dict.albums.sections[0].paragraphs as string[])[0]}</p>

          <p className="my-1">{(dict.albums.sections[0].paragraphs as string[])[1]}</p>

          <p className="my-1">{(dict.albums.sections[0].paragraphs as string[])[2]}</p>

          <p className="my-1">{(dict.albums.sections[0].paragraphs as string[])[3]}</p>
        </ContentBox>

        <ContentBox left={false} image={image} title={dict.albums.sections[1].title}>
          <p className="my-1">{dict.albums.sections[1].description}</p>
        </ContentBox>
      </FeatureSection>

      <FeatureSection
        sectionId="desktop"
        title={dict.desktop.title}
        description={dict.desktop.description}
      >
        <ContentBox left={true} image={browser} title={dict.desktop.sections[0].title}>
          <p className="mb-4">{dict.desktop.sections[0].description}</p>

          <Link href="https://web.echophotos.io" target="_blank" className="btn btn-primary">
            {dict.desktop.sections[0]['open-web-app']}
          </Link>
        </ContentBox>

        <ContentBox left={false} image={macOS} title={dict.desktop.sections[1].title}>
          <p className="mb-4">{dict.desktop.sections[1].description}</p>

          <AppStore mac />
        </ContentBox>
      </FeatureSection>
    </>
  );
}
