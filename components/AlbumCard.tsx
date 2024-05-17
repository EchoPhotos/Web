import React from "react";
import { t } from "i18next";
import QRCode from "./QRCode";

interface AlbumCardProps {
  albumName: string;
  inviteCode: string;
  qrCodeURL: string;
}

export default function AlbumCard({albumName, inviteCode, qrCodeURL}: AlbumCardProps) {

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(inviteCode);
    alert(t("album-card:copied") ?? "Copied!");
  };
  
  const getApp = async () => {
     if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
       window.open("https://play.google.com/store/apps/details?id=ch.echolabs.echo", "_blank");
     } else if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) {
       window.open("https://apps.apple.com/app/id1499073049", "_blank");
     } else if (navigator.userAgent.toLowerCase().indexOf("macintosh") > -1) {
       window.open("https://apps.apple.com/app/id1499073049", "_blank");
     } else {
       window.open(`https://web.echophotos.io/invite/${inviteCode}`, "_blank");
     }
  };

  return (
    <div className="flex flex-col items-center mb-5 p-5 rounded-lg break-inside-avoid bg-zinc-800 text-white space-y-9">
      <h1 className="text-4xl font-black text-center mt-2">{albumName}</h1>

      <div className="flex flex-row items-center space-x-5">
        Hosted on
        <img
          src="/images/AppIcon300.png"
          height="50"
          width="50"
          alt="EchoPhotos logo"
        />
        Echo Photos
      </div>

      <div className="flex flex-col items-center space-y-2">
        <div className="p-3 bg-white rounded-lg" id="qrcode">
          <QRCode qrCodeURL={qrCodeURL} />
        </div>

        <button
          id="inviteCode"
          onClick={copyToClipboard}
          className="font-mono text-slate-700 text-center py-2 px-5 bg-zinc-200 rounded-lg uppercase text-xl transition hover:bg-white/10 hover:text-white hover:font-bold"
        >
          {inviteCode}
        </button>

        <div className="text-xs font-light">
          {t("album-card:enterCode") ??
            "Enter the code or scan the QR-Code to join via app."}
        </div>
      </div>

      {/* <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch] text-sm">
        {t("album-card:description") ?? "test description"}
      </p> */}

      {/* <button
        className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
        onClick={copyToClipboard}
      >
        Upload Photos
      </button> */}

      <div className="flex flex-col items-center text-xs">
        <button
          id="inviteCode"
          onClick={getApp}
          className="text-white text-center py-3.5 px-6 mb-2 bg-gradient-to-br from-blue-600 to-blue-900 hover:bg-gradient-to-tl hover:from-zinc-400 hover:to-gray-300 rounded-lg uppercase text-xl transition hover:text-black font-bold"
        >
          {t("album-card:app.installButton") ?? "Get the App"}
        </button>

        {t("album-card:app.description") ??
          "With the app, you can upload your photos and add likes and comments."}
      </div>
    </div>
  );
};
