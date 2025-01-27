'use client';

import AlbumCard from '@components/Homepage/AlbumCard';
import GridImage from '@components/Homepage/GridImage';
import ImageOverlayContainer from '@components/Homepage/ImageOverlayContainer';

import { useEffect, useRef } from 'react';
import { useLastViewedPhoto } from '@utils/old/useLastViewedPhoto';
import ItemMap from '@components/Homepage/ItemMap';
import { CoordinateRegion } from 'mapkit-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IdAlbumItem, IdInvite } from '@Shared/Models';
import AuthStateProvider from 'provider/AuthStateProvider';
import { HStack } from '@components/UI/Components';

export interface InvitePreviewData {
  invite: IdInvite;
  items: IdAlbumItem[];
  domain: string;
  albumMapRegion?: CoordinateRegion;
}

export default function InvitePreview(props: {
  data: InvitePreviewData;
  albumCardDict: any;
  lang: string;
}) {
  const searchParams = useSearchParams();
  const selectedItemId = searchParams.get('itemId');
  const data = props.data;
  const fullInviteId = data.invite.id;
  const itemId = selectedItemId;
  const inviteCode = fullInviteId.substring(0, 8);

  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    const currentRef = lastViewedPhotoRef.current;
    if (lastViewedPhoto && !itemId && currentRef) {
      currentRef.scrollIntoView({ block: 'center' });
      // setLastViewedPhoto(null);
    }
  }, [itemId, lastViewedPhoto, setLastViewedPhoto]);

  const router = useRouter();

  return (
    <AuthStateProvider>
      <div className="bg-black p-1">
        {itemId && (
          <ImageOverlayContainer
            invite={data.invite}
            domain={data.domain}
            items={data.items}
            onClose={(lastViewedItemId) => {
              setLastViewedPhoto(lastViewedItemId);
            }}
          />
        )}

        <div className="grid grid-flow-row grid-cols-3 justify-start gap-1 md:grid-cols-5 md:px-12 md:py-4 lg:px-48 xl:grid-cols-7">
          {!data.invite.viewOnly && (
            <div className="col-span-3 row-span-3 md:col-span-2">
              <AlbumCard
                albumId={data.invite.group}
                albumName={data.invite.groupName}
                inviteCode={inviteCode}
                qrCodeURL={`${data.domain}/invite/${data.invite.id}`}
                albumCardDict={props.albumCardDict}
              />
            </div>
          )}

          {data.invite.viewOnly && (
            <HStack className="col-span-3 aspect-[2] items-center justify-center rounded-lg bg-zinc-800 text-4xl font-semibold text-white md:col-span-2">
              {data.invite.groupName}
            </HStack>
          )}

          {data.albumMapRegion && (
            <div className="col-span-2 aspect-[2] h-full w-full overflow-clip rounded-lg">
              <ItemMap
                items={data.items}
                initialRegion={data.albumMapRegion}
                onItemSelect={(item) => {
                  router.push(`/${props.lang}/invite/${data.invite.id}?itemId=${item.id}`);
                }}
              />
            </div>
          )}

          {data.items.map((albumItem) => {
            const isLastViewedPhoto = albumItem.id === lastViewedPhoto;
            return (
              <div ref={isLastViewedPhoto ? lastViewedPhotoRef : undefined} key={albumItem.id}>
                <GridImage
                  lang={props.lang}
                  domain={data.domain}
                  inviteId={data.invite.id}
                  showLikes={!data.invite.viewOnly}
                  albumItem={albumItem}
                />
              </div>
            );
          })}
        </div>
      </div>
    </AuthStateProvider>
  );
}
