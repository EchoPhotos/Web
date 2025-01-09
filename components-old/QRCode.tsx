'use client';
import { useEffect, useState } from 'react';
import * as ReactQRCode from 'react-qr-code';

export default function QRCode({ qrCodeURL }) {
  const [qrUrl, setQrUrl] = useState(qrCodeURL);

  useEffect(() => {
    setQrUrl(window.location.href);
  }, []);

  return (
    <div className="rounded-lg bg-white p-3" id="qrcode">
      <ReactQRCode.default value={qrCodeURL} size={120} />
    </div>
  );
}
