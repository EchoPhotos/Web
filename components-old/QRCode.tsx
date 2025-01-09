"use client";
import { useEffect, useState } from "react";
import * as ReactQRCode from "react-qr-code";

export default function QRCode({
  qrCodeURL,
}) {
  const [qrUrl, setQrUrl] = useState(qrCodeURL);

  useEffect(() => {
    setQrUrl(window.location.href);
  }, []);

  return (
    <div className="p-3 bg-white rounded-lg" id="qrcode">
      <ReactQRCode.default value={qrCodeURL} size={120} />
    </div>
  );
}
