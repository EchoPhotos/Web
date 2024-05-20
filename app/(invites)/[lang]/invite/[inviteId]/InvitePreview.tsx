"use client"

import AlbumCard from "@/components/AlbumCard";
import GridImage from "@/components/GridImage";
import Modal from "@/components/Modal";
import { AlbumItem, Invite } from "@/utils/types";

import { useEffect, useRef } from "react";
import { useLastViewedPhoto } from "@/utils/useLastViewedPhoto";

export interface InvitePreviewData {
  invite: Invite;
  items: AlbumItem[];
  inviteId: string;
  domain: string;
  imageId?: string;
  qrUrl: string;
  albumPreviewImageUrl: string;
}

export default function InvitePreview(props: { data: InvitePreviewData, lang: string }) {
  const data = props.data;
  const fullInviteId = data.inviteId as string;
  const imageId = data.imageId;
  const inviteCode = fullInviteId.substring(0, 8);
  
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    // TODO: Should work without checking if lastViewedPhotoRef.current is not null
    // TODO: seems to be broken
    if (lastViewedPhoto && !imageId && lastViewedPhotoRef.current) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [imageId, lastViewedPhoto, setLastViewedPhoto]);


  return (
    <>
      <div className="bg-black">
        <section className="mx-auto max-w-[1960px] p-4">
          {imageId && (
            <Modal
              invite={data.invite}
              domain={data.domain}
              items={data.items}
              onClose={() => {
                setLastViewedPhoto(imageId);
              }}
            />
          )}
          <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
            <AlbumCard
              albumName={data.invite.groupName}
              inviteCode={inviteCode}
              qrCodeURL={data.qrUrl}
              lang={props.lang}
            />
            {data.items.map((albumItem) => (
              <GridImage
                id={albumItem.image}
                href={`/invite/${data.inviteId}?imageId=${albumItem.image}`}
                src={`${data.domain}/api/v1/invites/${data.inviteId}/images/${albumItem.image}/preview`}
                ref={
                  albumItem.image === lastViewedPhoto
                    ? lastViewedPhotoRef
                    : undefined
                }
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
