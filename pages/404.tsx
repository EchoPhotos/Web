import { IoArrowBack } from "react-icons/io5";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Button from "@/components/Button";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "404"])),
    },
  };
}

export default function ErrorPage() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center text-center h-96 flex-col">
      <h1 className="font-bold mb-4 text-5xl">{t("404:error-message")}</h1>

      <Button onClick={router.back} className="mt-4">
        <IoArrowBack />
        {t("404:go-back")}
      </Button>
    </div>
  );
}
