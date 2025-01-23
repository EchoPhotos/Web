'use client';

import { createDownloadLink } from '@utils/API';
import { IdAlbum } from '@Shared/Models';
import { IoArrowDownCircleOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import DownloadLimitWarning from './DownloadLimitWarning';
import NoLinksAvailableWarning from './NoLinksAvailableWarning';
import { ActionStyle } from '@components/UI/ButtonStyles';
import { Button } from '@headlessui/react';
import { SizeAdapted, VStack } from '@components/UI/Components';
import { PremiumButton } from '../PremiumButton';

export default function NnpoLink({ album }: { album: IdAlbum }) {
  const router = useRouter();

  async function createLink(albumId: string) {
    const downloadLink = await createDownloadLink(albumId);
    router.push(`/albums/${album.id}/downloads/${downloadLink.id}`);
  }

  const linkAvailable =
    !album.downloadLinkLimit ||
    !album.createdDownloadLinkCount ||
    album.createdDownloadLinkCount < album.downloadLinkLimit;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-3 overflow-scroll p-4 text-center md:p-12">
      {!album.premium &&
        album.downloadLinkLimit &&
        album.downloadLinkLimit !== album.createdDownloadLinkCount && (
          <DownloadLimitWarning
            limit={album.downloadLinkLimit}
            used={album.createdDownloadLinkCount}
          />
        )}

      <VStack className="items-center justify-between space-y-2">
        <SizeAdapted
          className="h-full w-full"
          desktop={<IoArrowDownCircleOutline size={166} className="w-full text-slate-400" />}
          mobile={<IoArrowDownCircleOutline size={44} className="w-full text-slate-400" />}
        />
        <h1 className="text-2xl font-semibold">Download Link</h1>
        This album has no download link.
      </VStack>

      {linkAvailable && (
        <ActionStyle>
          <Button
            onClick={() => {
              createLink(album.id);
            }}
          >
            Create Download Link
          </Button>
        </ActionStyle>
      )}
      {!album.premium && !linkAvailable && <PremiumButton album={album} />}
      {!album.premium && !linkAvailable && <NoLinksAvailableWarning />}
    </div>
  );
}
