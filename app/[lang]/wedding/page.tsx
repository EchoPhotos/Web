import * as Icons from 'react-icons/io5';
import { Cinzel } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import { Quicksand } from 'next/font/google';
import { Josefin_Sans } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';
import AppStore from '@old-components/Badges/AppStore';
import Featurette from '@old-components/Featurette';
import GooglePlay from '@old-components/Badges/GooglePlay';
import ContentBox from '@old-components/ContentBox';
import FullScreenSection from '@old-components/FullScreenSection';
import { i18n } from '@old-utils/i18n-config';
import { getDictionary } from '../../../utils-old/dictionary';
import Button from '@old-components/Button';
import Link from 'next/link';

const cinzelFont = Cinzel({ subsets: ['latin'] });
const quickSandFont = Quicksand({ subsets: ['latin'] });
const montserratSandFont = Montserrat({ subsets: ['latin'] });
const josefinSansFont = Josefin_Sans({ subsets: ['latin'] });
const playfairFont = Playfair_Display({ subsets: ['latin'] });

const titleFont = playfairFont;

export async function generateStaticParams() {
  return i18n.locales.map((lang) => {
    lang;
  });
}

export default async function WeddingPage({ params }) {
  const dicts = await getDictionary(params.lang);
  const dict = dicts.wedding;

  return (
    <>
      <FullScreenSection className="-mt-20 bg-rose-50">
        <ContentBox left={false} imageURL="/images/weddingMain.png" title="">
          <h1 className={`${titleFont.className} mb-6 font-bold`}>{dict.primarySection.title}</h1>

          <h4 className="my-4">{dict.primarySection.subtitle}</h4>

          <div className="mt-7 flex flex-row items-center justify-center md:justify-start">
            <AppStore appendix="?ppid=018749c4-f51a-4659-874a-36ce62c57a24" />

            <GooglePlay />
          </div>

          <p className="my-3">{dict.primarySection.availableOn}</p>

          <Link
            href="https://www.echophotos.io/albums/new"
            className="flex min-h-8 min-w-36 max-w-64 flex-row items-center justify-center space-x-1 rounded-md bg-red-400 px-1 py-1 text-sm font-semibold text-white shadow-md shadow-red-500/40 hover:bg-red-600 md:min-h-10 md:min-w-48 md:space-x-3 md:px-3 md:py-2 md:text-base md:shadow-lg"
          >
            {dicts.general.createNewAlbumButton}
          </Link>
        </ContentBox>
      </FullScreenSection>

      <section className="bg-red-300 pb-10 pt-10 md:pb-40 md:pt-24" id="features">
        <div
          className={`container m-auto flex max-w-6xl flex-col items-center px-4 text-center text-stone-50 md:text-left`}
        >
          <h2 className={`${titleFont.className} mb-10 font-bold md:mb-6`}>The App</h2>

          <div className="flex grid-flow-col grid-cols-3 grid-rows-3 flex-col gap-10 md:grid md:gap-y-4">
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

            <div className="row-span-3 mx-auto my-auto">
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
