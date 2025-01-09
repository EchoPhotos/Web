'use client';

import { IdDownload } from '@utils/Models';
import DownloadRow from './DownloadRow';
import Link from 'next/link';

export default function DownloadList({ downloads }: { downloads: IdDownload[] }) {
  return (
    <div className="h-full w-full overflow-scroll">
      {downloads.map((download) => (
        <Link key={download.id} href={`/downloads/${download.id}`}>
          <DownloadRow download={download} />
        </Link>
      ))}
    </div>
  );
}
