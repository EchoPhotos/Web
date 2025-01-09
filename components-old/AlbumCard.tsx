import React from "react";
import QRCode from "./QRCode";
import Link from "next/link";

interface AlbumCardProps {
  albumName?: string;
  inviteCode: string;
  qrCodeURL: string;
  albumId: string;
  albumCardDict: any;
}

export default async function AlbumCard({
  albumName,
  inviteCode,
  qrCodeURL,
  albumId,
  albumCardDict,
}: AlbumCardProps) {
  const dict = albumCardDict;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(inviteCode);
    alert(dict.copied ?? "Copied!");
  };

  const getApp = async () => {
    if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
      window.open(
        "https://play.google.com/store/apps/details?id=ch.echolabs.echo"
      );
    } else if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) {
      window.open("https://apps.apple.com/app/id1499073049");
    } else if (navigator.userAgent.toLowerCase().indexOf("macintosh") > -1) {
      window.open("https://apps.apple.com/app/id1499073049");
    } else {
      window.open(`https://web.echophotos.io/invite/${inviteCode}`, "_blank");
    }
  };

  return (
    <div className="flex flex-col items-center mb-5 p-5 rounded-lg break-inside-avoid bg-zinc-800 text-white space-y-5">
      <h1 className="text-4xl font-black text-center mt-2">{albumName}</h1>

      <div
        className="flex flex-col items-center space-y-2 p-3 bg-white rounded-lg"
        id="qrcode"
      >
        <QRCode qrCodeURL={qrCodeURL} />

        <div className="text-xs font-light text-gray-700 text-center break-words w-44 max-w-1/2">
          {dict.enterCode ??
            "Enter the code or scan the QR-Code to join via app."}
        </div>

        <button
          id="inviteCode"
          onClick={copyToClipboard}
          className="font-mono text-slate-700 text-center py-2 px-5 bg-zinc-200 rounded-lg uppercase text-xl transition hover:bg-slate-600 hover:text-white hover:font-bold"
        >
          {inviteCode}
        </button>
      </div>

      {/* <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch] text-sm">
        {dict.description ?? "test description"}
      </p> */}

      <div className="flex flex-row items-center space-x-5">
        {dict.hostedOn}
        <img
          src="/images/AppIcon300.png"
          height="50"
          width="50"
          alt="EchoPhotos logo"
        />
        Echo Photos
      </div>

      <div className="flex flex-col items-center text-xs text-center">
        <div className="w-52">
          {dict.app.description ??
            "With the app, you can upload your photos and add likes and comments."}
        </div>

        <button
          id="inviteCode"
          onClick={getApp}
          className="text-white text-center py-3.5 px-6 mt-2 bg-blue-600 hover:bg-zinc-100 rounded-lg text-xl transition hover:text-blue-500 font-bold"
        >
          {dict.app.installButton ?? "Get the App"}
        </button>

        <Link
          id="upload"
          href={`https://app.echophotos.io/albums/${albumId}/upload`}
          className="text-blue-500 text-center py-2 px-5 mt-2 bg-zinc-300 hover:bg-blue-400 rounded-lg text-lg transition hover:text-white font-bold"
        >
          {dict.uploadPhotosButton ?? "Upload photos"}
        </Link>
      </div>
    </div>
  );
}
