import * as IoIcons from "react-icons/io5";
import Link from "next/link";
import AppStore from "@/components/Badges/AppStore";
import Button from "@/components/Button";
import Featurette from "@/components/Featurette";
import GooglePlay from "@/components/Badges/GooglePlay";
import ContentBox from "@/components/ContentBox";
import FeatureSection from "@/components/FeatureSection";
import FullScreenSection from "@/components/FullScreenSection";
import { i18n } from "@/utils/i18n-config";
import { getDictionary } from "@/utils/dictionary";

export async function generateStaticParams() {
  return i18n.locales.map(lang => { lang });
}

export default async function HomePage({ params: { lang } }) {
  const dicts = await getDictionary(lang);
  const dict = dicts.home;

  return (
    <>
      <FullScreenSection className="-mt-16">
        <ContentBox left={true} imageURL="/../images/title.png" title="">
          <h1 className="font-bold mb-6">{dict.title}</h1>

          <p className="mb-6">{dict.subtitle}</p>

          <div className="flex items-center justify-center md:justify-start">
            <AppStore />

            <GooglePlay />
          </div>
        </ContentBox>
      </FullScreenSection>

      <section className="pt-24 pb-40 bg-gray-100" id="features">
        <div
          className={`flex flex-col items-center text-center md:text-left m-auto container max-w-6xl px-4`}
        >
          <h2 className="font-bold mb-10 md:mb-6">
            {dict.featureOverviewSection.title}
          </h2>

          <div className="md:grid flex flex-col grid-rows-3 grid-cols-3 grid-flow-col gap-10 md:gap-y-4">
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

            <div className="row-span-3 my-auto mx-auto">
              <img src="../images/iphone.png" />
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

      <section className="bg-zinc-800 text-white py-20">
        <ContentBox left={true} imageURL="/../images/groups.png" title="">
          <h3 className="">{dict.privacy.subtitle}</h3>

          <h2 className="font-bold mb-2.5 flex text-[2.25rem] gap-2 items-center justify-center md:justify-start">
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
        <ContentBox
          left={false}
          imageURL="/images/wallis.jpg"
          title=""
        >
          <div className="text-right md:text-right">
            <h3 className="text-green-700">{dict.climate.subtitle}</h3>

            <h2 className="font-bold mb-4 flex items-center gap-2 text-[2.25rem] text-green-700 justify-center md:justify-end">
              <IoIcons.IoLeaf className="-scale-x-100 -z-10" size={32} />
              {dict.climate.title}
            </h2>

            <p className="mb-1">{dict.climate.paragraphs[0]}</p>

            <p className="mb-4">{dict.climate.paragraphs[1]}</p>
          </div>
        </ContentBox>
      </section>

      <FeatureSection
        sectionId="albums"
        title={dict.albums.title}
        description=""
      >
        <ContentBox
          left={true}
          imageURL="/../images/group.png"
          title={dict.albums.sections[0].title}
        >
          <p className="my-1">
            {(dict.albums.sections[0].paragraphs as string[])[0]}
          </p>

          <p className="my-1">
            {(dict.albums.sections[0].paragraphs as string[])[1]}
          </p>

          <p className="my-1">
            {(dict.albums.sections[0].paragraphs as string[])[2]}
          </p>

          <p className="my-1">
            {(dict.albums.sections[0].paragraphs as string[])[3]}
          </p>
        </ContentBox>

        <ContentBox
          left={false}
          imageURL="/../images/image.png"
          title={dict.albums.sections[1].title}
        >
          <p className="my-1">{dict.albums.sections[1].description}</p>
        </ContentBox>
      </FeatureSection>

      <FeatureSection
        sectionId="desktop"
        title={dict.desktop.title}
        description={dict.desktop.description}
      >
        <ContentBox
          left={true}
          imageURL="/../images/browser.jpg"
          title={dict.desktop.sections[0].title}
        >
          <p className="mb-4">{dict.desktop.sections[0].description}</p>

          <Link href="https://web.echophotos.io" target="_blank">
            <Button>{dict.desktop.sections[0]["open-web-app"]}</Button>
          </Link>
        </ContentBox>

        <ContentBox
          left={false}
          imageURL="/../images/macOS.jpg"
          title={dict.desktop.sections[1].title}
        >
          <p className="mb-4">{dict.desktop.sections[1].description}</p>

          <AppStore mac />
        </ContentBox>
      </FeatureSection>
    </>
  );
}
