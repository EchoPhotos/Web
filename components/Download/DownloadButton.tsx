'use client';

import { ActionStyle } from '@components/UI/ButtonStyles';
import { getAPIHost } from '@utils/Environment';
import Link from 'next/link';
import { IoArrowDownCircle } from 'react-icons/io5';

export default function DownloadButton({ downloadId }) {
  <Link href={getAPIHost() + '/downloads/' + downloadId}>
    <ActionStyle>
      <IoArrowDownCircle size={33} />
      <p className="pr-3">Download</p>
    </ActionStyle>
  </Link>;
}
