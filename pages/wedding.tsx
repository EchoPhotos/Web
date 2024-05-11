import * as Icons from "react-icons/io5";
import { GetStaticPropsContext } from "next";
import { Cinzel } from "next/font/google";
import { Montserrat } from "next/font/google";
import { Quicksand } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import AppStore from "@/components/Badges/AppStore";
import Featurette from "@/components/Featurette";
import GooglePlay from "@/components/Badges/GooglePlay";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import ContentBox from "@/components/ContentBox";
import FullScreenSection from "@/components/FullScreenSection";

const cinzelFont = Cinzel({ subsets: ["latin"] });
const quickSandFont = Quicksand({ subsets: ["latin"] });
const montserratSandFont = Montserrat({ subsets: ["latin"] });
const josefinSansFont = Josefin_Sans({ subsets: ["latin"] });
const playfairFont = Playfair_Display({ subsets: ["latin"] });

const titleFont = playfairFont;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "wedding"])),
    },
  };
}

export default function WeddingPage() {
  const { t } = useTranslation();

  return (
    <>
      <FullScreenSection className="bg-rose-50">
        <ContentBox left={false} imageURL="/images/weddingMain.png" title="">
          <h1 className={`${titleFont.className} font-bold mb-6`}>
            {t("wedding:primarySection.title")}
          </h1>

          <h4 className="my-4">{t("wedding:primarySection.subtitle")}</h4>

          <div className="mt-7 flex flex-row items-center justify-center md:justify-start">
            <AppStore appendix="?ppid=018749c4-f51a-4659-874a-36ce62c57a24" />

            <GooglePlay />
          </div>

          <p className="my-3">{t("wedding:primarySection.availableOn")}</p>
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
              title={t("wedding:features.0.title")}
            >
              {t("wedding:features.0.text")}
            </Featurette>

            <Featurette
              big={true}
              titleClassName={`${titleFont.className}`}
              icon={<Icons.IoSparkles />}
              title={t("wedding:features.1.title")}
            >
              {t("wedding:features.1.text")}
            </Featurette>

            <Featurette
              big={true}
              titleClassName={`${titleFont.className}`}
              icon={<Icons.IoHeart />}
              title={t("wedding:features.2.title")}
            >
              {t("wedding:features.2.text")}
            </Featurette>

            <div className="row-span-3 my-auto mx-auto">
              <img src="/images/weddingSecondary.png" />
            </div>

            <Featurette
              big={true}
              titleClassName={`${titleFont.className}`}
              icon={<Icons.IoQrCode />}
              title={t("wedding:features.3.title")}
            >
              {t("wedding:features.3.text")}
            </Featurette>

            <Featurette
              big={true}
              titleClassName={`${titleFont.className}`}
              icon={<Icons.IoCloudDownload />}
              title={t("wedding:features.4.title")}
            >
              {t("wedding:features.4.text")}
            </Featurette>

            <Featurette
              big={true}
              titleClassName={`${titleFont.className}`}
              icon={<Icons.IoLink />}
              title={t("wedding:features.5.title")}
            >
              {t("wedding:features.5.text")}
            </Featurette>
          </div>
        </div>
      </section>
    </>
  );
}
