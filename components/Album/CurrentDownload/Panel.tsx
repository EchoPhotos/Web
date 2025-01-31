'use client';

import {
  IoArrowDownCircleOutline,
  IoCopyOutline,
  IoShareOutline,
  IoWarning,
} from 'react-icons/io5';
import Link from 'next/link';
import { Button } from '@headlessui/react';
import { HStack, VStack } from '@components/UI/Components';
import { getAPIHost } from '@utils/Environment';
import Banner from '@components/Banner';
import InfoBox from '@components/Download/InfoBox';
import Spinner from '@components/UI/Spinner';
import { AlbumContext } from 'provider/AlbumProvider';
import { DownloadContext } from 'provider/DownloadProvider';
import { useContext } from 'react';

export default function Panel() {
  const download = useContext(DownloadContext);
  const album = useContext(AlbumContext);

  const link = getAPIHost() + '/downloads/' + download.id;

  function shareLink() {
    const linkPage = window.location.origin + '/downloads/' + download.id;
    navigator.share({
      title: `Download link for ${album.name}`,
      url: linkPage,
    });
  }

  function copyLink() {
    const linkPage = window.location.origin + '/downloads/' + download.id;
    navigator.clipboard.writeText(linkPage);
    alert('Copied to clipboard!');
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-3 overflow-scroll px-2 py-16">
      {download.isOutdated && (
        <Banner
          icon={<IoWarning size={66} />}
          title="Outdated Link"
          text="New items have been uploaded to the album since the download link was created. Use the
        app to create a new link."
        />
      )}

      {/* {stringify(download)} */}
      <InfoBox />

      {!download.ready && (
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
      )}

      {download.ready && (
        <div className="w-5/6">
          <HStack className="items-center justify-between space-x-2">
            <Button onClick={shareLink} className="btn btn-secondary hstack space-x-2">
              <IoShareOutline size={22} />
              <p className="pr-3">Share</p>
            </Button>

            <Button onClick={copyLink} className="btn btn-secondary hstack space-x-2">
              <IoCopyOutline size={22} />
              <p className="pr-3">Copy</p>
            </Button>

            <Link href={link} className="btn btn-primary hstack space-x-2">
              <IoArrowDownCircleOutline size={33} />
              <p className="pr-3">Download</p>
            </Link>
          </HStack>
        </div>
      )}
    </div>
  );
}
