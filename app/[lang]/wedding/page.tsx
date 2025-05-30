import * as Icons from 'react-icons/io5';
import { Playfair_Display } from 'next/font/google';
import AppStore from '@components/Homepage/Badges/AppStore';
import Featurette from '@components/Homepage/Featurette';
import GooglePlay from '@components/Homepage/Badges/GooglePlay';
import ContentBox from '@components/Homepage/ContentBox';
import FullScreenSection from '@components/Homepage/FullScreenSection';
import { i18n } from '@utils/old/i18n-config';
import { getDictionary } from '@utils/dictionary';
import Link from 'next/link';
import Image from 'next/image';
import wedding from '@images/weddingSecondary.png';
import main from '@images/weddingMain.png';

// const cinzelFont = Cinzel({ subsets: ['latin'] });
// const quickSandFont = Quicksand({ subsets: ['latin'] });
// const montserratSandFont = Montserrat({ subsets: ['latin'] });
// const josefinSansFont = Josefin_Sans({ subsets: ['latin'] });
const playfairFont = Playfair_Display({ subsets: ['latin'] });

const titleFont = playfairFont;

export async function generateStaticParams() {
  return i18n.locales;
}

export default async function WeddingPage(props) {
  const params = await props.params;
  const dicts = await getDictionary(params.lang);
  const dict = dicts.wedding;

  return (
    <>
      <FullScreenSection className="-mt-20 bg-rose-50">
        <ContentBox left={false} image={main} title="">
          <h1 className={`${titleFont.className} mb-6 font-bold`}>{dict.primarySection.title}</h1>

          <h4 className="my-4">{dict.primarySection.subtitle}</h4>

          <div className="mt-7 flex flex-row items-center justify-center md:justify-start">
            <AppStore appendix="?ppid=018749c4-f51a-4659-874a-36ce62c57a24" />

            <GooglePlay />
          </div>

          <p className="my-3">{dict.primarySection.availableOn}</p>

          <Link
            href="/albums/new"
            className="flex min-h-8 max-w-64 min-w-36 flex-row items-center justify-center space-x-1 rounded-md bg-red-400 px-1 py-1 text-sm font-semibold text-white shadow-md shadow-red-500/40 hover:bg-red-600 md:min-h-10 md:min-w-48 md:space-x-3 md:px-3 md:py-2 md:text-base md:shadow-lg"
          >
            {dicts.general.createNewAlbumButton}
          </Link>
        </ContentBox>
      </FullScreenSection>

      <section className="bg-red-300 pt-10 pb-10 md:pt-24 md:pb-40" id="features">
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
              <Image src={wedding} alt="wedding" />
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
