"use client"

import FullScreenSection from "@/components/FullScreenSection";
import { Download } from "@/utils/types";
import Link from "next/link";
import Image from "next/image";
import * as IoIcons from "react-icons/io5";
import { formatBytes } from "@/utils/formatBytes";

export interface DownloadPreviewData {
  download: Download;
  downloadId: string;
  domain: string;
}

function formattedDate(unixTimestamp: number) {
  let date = new Date(unixTimestamp);
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export default function DownloadPreview(props: {
  data: DownloadPreviewData;
  downloadPreview: any;
  lang: string;
}) {
  if (props.data.download.isDisabled === true) {
    return (
      <>
        <FullScreenSection className="bg-gray-100 md:-mt-20 text-white">
          <div
            className="flex flex-row items-center space-x-5 text-red-600 p-3 bg-red-200 rounded-lg mb-6"
          >
            <IoIcons.IoBan size={33} />
            <div className="pr-2">
              <h5 className="uppercase font-bold">Invalid Download Link</h5>
              <p className="text-xs ">
                This download does either not exist or has been disabled.
              </p>
            </div>
          </div>
        </FullScreenSection>
      </>
    );
  }

  return (
    <>
      <FullScreenSection className="bg-gray-800 md:-mt-20 text-white">
        <div className="flex md:flex-row flex-col justify-center items-center mb-6 md:mb-0">
          <div className="p-6 md:p-10 max-w-lg md:block">
            <h3 className="font-bold mb-6">
              {props.data.download.albumData.name}
            </h3>
            <Image
              alt="Album Image"
              className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              style={{ transform: "translate3d(0, 0, 0)" }}
              src={`${props.data.domain}/api/v1/downloads/${props.data.downloadId}/properties/album-image`}
              width={220}
              height={220}
              unoptimized={true}
            />
          </div>

          <div className="p-6 max-w-lg">
            <h5 className="pt-5 font-semibold">
              {props.downloadPreview.header}
            </h5>

            <p
              className={`pb-4 ${
                props.data.download.byteSize === undefined ? "hidden" : ""
              }`}
            >
              {formatBytes(props.data.download.byteSize ?? 0)}
            </p>

            <p
              className={`pb-1 ${
                props.data.download.itemCount === undefined ? "hidden" : ""
              }`}
            >
              {props.data.download.itemCount ?? "-"}
              {" " + props.downloadPreview.counts}
            </p>

            <p className="text-xs pb-4" suppressHydrationWarning>
              {formattedDate(props.data.download.timestamp)}
            </p>

            <div
              className={`${
                props.data.download.isOutdated === true ? "" : "hidden"
              } flex flex-row items-center space-x-5 text-red-600 p-3 bg-red-200 rounded-lg mb-6`}
            >
              <IoIcons.IoWarning size={33} />
              <div className="pr-2">
                <h5 className="uppercase font-bold">
                  {props.downloadPreview.outdatedBanner.title}
                </h5>
                <p className="text-xs ">
                  {props.downloadPreview.outdatedBanner.message}
                </p>
              </div>
            </div>

            <Link
              href={
                props.data.domain + "/api/v1/downloads/" + props.data.downloadId
              }
            >
              <div className="flex flex-row items-center space-x-3 text-blue-100 text-center p-4 bg-blue-700 hover:bg-blue-200 rounded-lg uppercase text-xl transition hover:text-blue-700 font-bold">
                <IoIcons.IoArrowDownCircle size={33} />
                <p className="pr-3">{props.downloadPreview.downloadButton}</p>
              </div>
            </Link>
          </div>
        </div>
      </FullScreenSection>
    </>
  );
}
