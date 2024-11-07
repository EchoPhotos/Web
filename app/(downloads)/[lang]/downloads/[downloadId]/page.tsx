import { Metadata } from "next";
import DownloadPreview, { DownloadPreviewData } from "./DownloadPreview";
import admin from "firebase-admin";
import { Download } from "@/utils/types";
import { getDictionary } from "@/utils/dictionary";

async function getData(downloadId: string): Promise<DownloadPreviewData> {
  const ADMIN_APP_NAME = "firebase-frameworks";
  const adminApp =
    admin.apps.find((app) => app?.name === ADMIN_APP_NAME) ||
    admin.initializeApp(
      {
        credential: admin.credential.applicationDefault(),
      },
      ADMIN_APP_NAME
    );

  const projectId = admin.instanceId(adminApp).app.options.projectId ?? 'echo-photos-dev';
  let domain = `https://${projectId}.web.app`;
  if (projectId === "echo-photos") {
    domain = "https://www.echophotos.io";
  }

  const downloadURL = `${domain}/api/v1/downloads/${downloadId}/properties`;
  const downloadResponse: Response = await fetch(downloadURL, {
    next: { revalidate: 60 },
  });
  if (!downloadResponse.ok) {
    console.log(downloadURL);
    throw new Error("Failed to fetch download data");
  }
  let download: Download = await downloadResponse.json();

  return {
    download: download,
    domain: domain,
    downloadId: downloadId,
  };
}

type Props = {
  params: { downloadId: string; lang: string };
  searchParams: {
    imageId: string | undefined;
    [key: string]: string | string[] | undefined;
  };
};

export default async function Page(props: Props) {
  const fetchedData = await getData(props.params.downloadId);
  const dicts = await getDictionary(props.params.lang);
  return (
    <DownloadPreview
      data={{ ...fetchedData }}
      downloadPreview={dicts.downloadPreview}
      lang={props.params.lang}
    />
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.downloadId;
  const product = await getData(id);
  const title = (product.download.albumData.name ?? "Test") + " | Echo Photos";
  const imageUrl = product.domain + "/images/" + (product.download.albumData.image ?? "https://www.echophotos.io/images/AppIcon300.png");

  return {
    title: title,
    twitter: {
      title: title,
      images: imageUrl,
    },
    openGraph: {
      title: title,
      images: imageUrl,
      siteName: "Echo Photos",
      type: "website",
    },
  };
}
