'use client';

import * as ReactQRCode from 'react-qr-code';

export default function QRCode({ qrCodeURL }) {
  return (
    <div className="rounded-lg bg-white p-1" id="qrcode">
      <ReactQRCode.default value={qrCodeURL} size={100} />
    </div>
  );
}
