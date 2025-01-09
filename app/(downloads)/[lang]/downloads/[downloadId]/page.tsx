import { Metadata } from "next";
import DownloadPreview, { DownloadPreviewData } from "./DownloadPreview";
import { Download } from "@old-utils/types";
import { getDictionary } from "@old-utils/dictionary";

async function getData(downloadId: string): Promise<DownloadPreviewData> {
  const config = process.env.FIREBASE_CONFIG;
  if (!config) {
    throw Error(config);
  }
  const projectId = JSON.parse(config).projectId;

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
    itemId: string | undefined;
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
