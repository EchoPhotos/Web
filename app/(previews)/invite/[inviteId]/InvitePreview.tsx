"use client"

import { MutableRefObject } from "react";
import AlbumCard from "@/components/AlbumCard";
import GridImage from "@/components/GridImage";
import Modal from "@/components/Modal";
import { AlbumItem, Invite } from "../../../utils/types";

import { useEffect, useRef } from "react";
import { useLastViewedPhoto } from "../../../utils/useLastViewedPhoto";

export interface InvitePreviewData {
  invite: Invite;
  items: AlbumItem[];
  inviteId: string;
  domain: string;
  imageId?: string;
  pathname: string;
  qrUrl: string;
}

export default function InvitePreview(props: { data: InvitePreviewData }) {
  const data = props.data;
  const fullInviteId = data.inviteId as string;
  const imageId = data.imageId;
  const inviteCode = fullInviteId.substring(0, 8);
  
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !imageId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [imageId, lastViewedPhoto, setLastViewedPhoto]);


  return (
    <>
      {/* <Head>
        <title>{"Echo Photos - " + data.albumName ?? dict.albumInvite}</title>

        <meta
          property="og:image"
          content={
            data.albumImagePreviewURL ??
            "https://www.echophotos.io/images/AppIcon300.png"
          }
        />
        <meta
          property="og:title"
          content={data.albumName ?? dict.albumInvite}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Echo Photos" />
        <meta
          property="og:description"
          content={dict["social-preview"].description}
        />
      </Head> */}

      <div className="bg-black">
        <section className="mx-auto max-w-[1960px] p-4">
          {imageId && (
            <Modal
              inviteId={data.inviteId}
              domain={data.domain}
              items={data.items}
              onClose={() => {
                // setLastViewedPhoto(imageId);
              }}
            />
          )}
          <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
            <AlbumCard
              albumName={data.invite.groupName}
              inviteCode={inviteCode}
              qrCodeURL={data.qrUrl}
            />
            {data.items.map((albumItem) => (
              <GridImage
                id={albumItem.image}
                href={`${data.pathname}?id=${data.inviteId}&imageId=${albumItem.image}`}
                src={`${data.domain}/api/v1/invites/${data.inviteId}/images/${albumItem.image}/preview`}
                ref={
                  albumItem.image === lastViewedPhoto
                    ? lastViewedPhotoRef
                    : null
                }
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
