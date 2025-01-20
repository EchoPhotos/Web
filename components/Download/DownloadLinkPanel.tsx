'use client';

import { ActionStyle } from '@components/UI/ButtonStyles';
import { getAPIHost } from '@utils/Environment';
import { dateString, formatAsBytes } from '@utils/Formatting';
import { IdDownload } from '@utils/Models';
import Link from 'next/link';
import { IoArrowDownCircle, IoBan, IoWarning } from 'react-icons/io5';
import Image from 'next/image';
import { VCenter, VStack } from '@components/UI/Components';
import Spinner from '@components/UI/Spinner';
import Banner from '@components/Banner';
import { Button } from '@headlessui/react';
import { DownloadContext } from 'provider/DownloadProvider';
import { useContext } from 'react';

export default function DownloadLinkPanel() {
  const download = useContext(DownloadContext);

  const disabledDownload = (
    <Banner
      icon={<IoBan size={66} />}
      title="Invalid Link"
      text="This download does either not exist or has been disabled."
    />
  );

  const outdatedWarning = (
    <Banner
      icon={<IoWarning size={66} />}
      title="Outdated Link"
      text="New items have been uploaded to the album since the download link was created. Use the
        app to create a new link."
    />
  );

  const processing = (
    <div className={'rounded-lg bg-slate-100 p-5 text-slate-600'}>
      <VStack className="items-center justify-between space-y-2">
        <Spinner />
        <h5 className="text-lg font-bold">Creating link..</h5>
        <Button
          onClick={() => {
            location.reload();
          }}
        >
          Check again
        </Button>
      </VStack>
    </div>
  );

  const link = (download: IdDownload) => {
    return (
      <Link href={getAPIHost() + '/downloads/' + download.id}>
        <ActionStyle>
          <IoArrowDownCircle size={33} />
          <p className="pr-3">Download</p>
        </ActionStyle>
      </Link>
    );
  };

  const readyLink = (
    <div className="mb-6 flex flex-col items-center justify-center md:mb-0 md:flex-row">
      <div className="max-w-lg p-6 md:block md:p-10">
        {download.albumData?.image && (
          <Image
            alt="Album Image"
            className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
            style={{ transform: 'translate3d(0, 0, 0)' }}
            src={`${getAPIHost()}/downloads/${download.id}/properties/album-image`}
            width={220}
            height={220}
            unoptimized={true}
          />
        )}
      </div>

      <div className="max-w-lg p-6">
        <h3 className="text-3xl font-bold">{download.albumData?.name ?? 'Album'}</h3>
        <h5 className="pt-5 font-semibold">Download Link</h5>
        {download.byteSize && <p className="pb-4">{formatAsBytes(download.byteSize ?? 0)}</p>}
        {download.itemCount && (
          <p className="pb-1">
            {download.itemCount ?? '-'}
            {' items'}
          </p>
        )}
        <p className="pb-4 text-xs" suppressHydrationWarning>
          {dateString(download.timestamp)}
        </p>
        {link(download)}
      </div>
    </div>
  );

  return (
    <div className="h-full w-full p-12">
      <VCenter>
        <VStack className="items-center justify-between space-y-2">
          {download.isDisabled && disabledDownload}
          {download.ready && !download.isDisabled && readyLink}
          {!download.ready && processing}
          {!download.isDisabled && download.isOutdated && outdatedWarning}
        </VStack>
      </VCenter>
    </div>
  );
}
