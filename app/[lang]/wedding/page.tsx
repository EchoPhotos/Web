import * as Icons from "react-icons/io5";
import { Cinzel } from "next/font/google";
import { Montserrat } from "next/font/google";
import { Quicksand } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import AppStore from "@/components/Badges/AppStore";
import Featurette from "@/components/Featurette";
import GooglePlay from "@/components/Badges/GooglePlay";
import ContentBox from "@/components/ContentBox";
import FullScreenSection from "@/components/FullScreenSection";
import { i18n } from "@/utils/i18n-config";
import { getDictionary } from "../../../utils/dictionary";
import Button from "@/components/Button";
import Link from "next/link";

const cinzelFont = Cinzel({ subsets: ["latin"] });
const quickSandFont = Quicksand({ subsets: ["latin"] });
const montserratSandFont = Montserrat({ subsets: ["latin"] });
const josefinSansFont = Josefin_Sans({ subsets: ["latin"] });
const playfairFont = Playfair_Display({ subsets: ["latin"] });

const titleFont = playfairFont;
  
export async function generateStaticParams() {
  return i18n.locales.map((lang) => {
    lang;
  });
}

export default async function WeddingPage({params}) {
  const dicts = await getDictionary(params.lang);
  const dict = dicts.wedding;

  return (
    <>
      <FullScreenSection className="bg-rose-50 -mt-20">
        <ContentBox left={false} imageURL="/images/weddingMain.png" title="">
          <h1 className={`${titleFont.className} font-bold mb-6`}>
            {dict.primarySection.title}
          </h1>

          <h4 className="my-4">{dict.primarySection.subtitle}</h4>

          <div className="mt-7 flex flex-row items-center justify-center md:justify-start">
            <AppStore appendix="?ppid=018749c4-f51a-4659-874a-36ce62c57a24" />

            <GooglePlay />
          </div>

          <p className="my-3">{dict.primarySection.availableOn}</p>

          <Link
            href="https://app.echophotos.io/albums/new"
            className="flex min-h-8 min-w-36 max-w-64 flex-row items-center justify-center space-x-1 rounded-md bg-red-400  px-1 py-1 text-sm font-semibold text-white shadow-md shadow-red-500/40 hover:bg-red-600 md:min-h-10 md:min-w-48 md:space-x-3 md:px-3 md:py-2 md:text-base md:shadow-lg"
          >
            {dicts.general.createNewAlbumButton}
          </Link>
        </ContentBox>
      </FullScreenSection>

      <section
        className="pt-10 pb-10 md:pt-24 md:pb-40 bg-red-300"
        id="features"
      >
        <div
          className={`flex flex-col text-stone-50 items-center text-center md:text-left m-auto container max-w-6xl px-4`}
        >
          <h2 className={`${titleFont.className} font-bold mb-10 md:mb-6`}>
            The App
          </h2>

          <div className="md:grid flex flex-col grid-rows-3 grid-cols-3 grid-flow-col gap-10 md:gap-y-4">
            <Featurette
              big={true}
              titleClassName={`${titleFont.className}`}
              icon={<Icons.IoImages />}
              title={dict.features[0].title}
            >
              {dict.features[0].text}
            </Featurette>

            <Featurette
              big={true}
              titleClassName={`${titleFont.className}`}
              icon={<Icons.IoSparkles />}
              title={dict.features[1].title}
            >
              {dict.features[1].text}
            </Featurette>

            <Featurette
              big={true}
              titleClassName={`${titleFont.className}`}
              icon={<Icons.IoHeart />}
              title={dict.features[2].title}
            >
              {dict.features[2].text}
            </Featurette>

            <div className="row-span-3 my-auto mx-auto">
              <img src="/images/weddingSecondary.png" />
            </div>

            <Featurette
              big={true}
              titleClassName={`${titleFont.className}`}
              icon={<Icons.IoQrCode />}
              title={dict.features[3].title}
            >
              {dict.features[3].text}
            </Featurette>

            <Featurette
              big={true}
              titleClassName={`${titleFont.className}`}
              icon={<Icons.IoCloudDownload />}
              title={dict.features[4].title}
            >
              {dict.features[4].text}
            </Featurette>

            <Featurette
              big={true}
              titleClassName={`${titleFont.className}`}
              icon={<Icons.IoLink />}
              title={dict.features[5].title}
            >
              {dict.features[5].text}
            </Featurette>
          </div>
        </div>
      </section>
    </>
  );
}
