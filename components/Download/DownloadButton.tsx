'use client';

import { getAPIHost } from '@utils/Environment';
import Link from 'next/link';
import { IoArrowDownCircle } from 'react-icons/io5';

export default function DownloadButton({ downloadId }) {
  <Link href={getAPIHost() + '/downloads/' + downloadId} className="btn btn-primary">
    <IoArrowDownCircle size={33} />
    <p className="pr-3">Download</p>
  </Link>;
}
