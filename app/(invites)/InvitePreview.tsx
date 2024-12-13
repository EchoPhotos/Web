"use client"

import AlbumCard from "@/components/AlbumCard";
import GridImage from "@/components/GridImage";
import ImageOverlayContainer from "@/components/ImageOverlayContainer";
import { AlbumItem, Invite } from "@/utils/types";

import { useEffect, useRef } from "react";
import { useLastViewedPhoto } from "@/utils/useLastViewedPhoto";
import ItemMap from "@/components/ItemMap";
import { CoordinateRegion } from "mapkit-react";
import { useRouter } from "next/navigation";

export interface InvitePreviewData {
  invite: Invite;
  items: AlbumItem[];
  domain: string;
  selectedItemId?: string;
  albumMapRegion?: CoordinateRegion;
}

export default function InvitePreview(props: { data: InvitePreviewData, albumCardDict: any, lang: string }) {
  const data = props.data;
  const fullInviteId = data.invite.id;
  const itemId = data.selectedItemId;
  const inviteCode = fullInviteId.substring(0, 8);
  
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    const currentRef = lastViewedPhotoRef.current;
    if (lastViewedPhoto && !itemId && currentRef) {
      currentRef.scrollIntoView({ block: "center" });
      // setLastViewedPhoto(null);
    }
  }, [itemId, lastViewedPhoto, setLastViewedPhoto]);

  const router = useRouter();

  return (
    <>
      <div className="bg-black">
        <section className="mx-auto max-w-[1960px] p-4">
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
          <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
            {!data.invite.viewOnly && (
              <AlbumCard
                albumId={data.invite.group}
                albumName={data.invite.groupName}
                inviteCode={inviteCode}
                qrCodeURL={`${data.domain}/invite/${data.invite.id}`}
                albumCardDict={props.albumCardDict}
              />
            )}
            {data.albumMapRegion && (
              <div className="h-48 w-full mb-5 rounded-lg overflow-clip">
                <ItemMap
                  items={data.items}
                  initialRegion={data.albumMapRegion}
                  onItemSelect={(item) => {
                    router.push(
                      `/${props.lang}/invite/${data.invite.id}?itemId=${item.id}`
                    );
                  }}
                />
              </div>
            )}

            {data.invite.viewOnly && (
              <a className="bg-stone-800 rounded-lg text-white font-semibold text-3xl flex flex-row my-4 p-4 justify-center">
                {data.invite.groupName}
              </a>
            )}
            {data.items.map((albumItem) => {
              const isLastViewedPhoto = albumItem.id === lastViewedPhoto;
              return (
                <div
                  ref={isLastViewedPhoto ? lastViewedPhotoRef : undefined}
                  key={albumItem.id}
                >
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
        </section>
      </div>
    </>
  );
}
