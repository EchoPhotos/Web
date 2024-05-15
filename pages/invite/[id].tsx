import Head from "next/head";
import { useRouter } from "next/router";
import { Ref, useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import admin from "firebase-admin";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useLastViewedPhoto } from "@/utils/useLastViewedPhoto";
import Modal from "@/components/Modal";
import { AlbumItem } from "@/utils/types";
import GridImage from "@/components/GridImage";
import AlbumCard from "@/components/AlbumCard";

interface PropsData {
  albumImagePreviewURL: string;
  albumName: string;
  albumItems: AlbumItem[];
  inviteId: string;
  domain: string;
}

interface Invite {
  id: string;
  group: string;
  timestamp: number;
  code?: string;
  disabled?: boolean;
  inviter?: string;
  groupName?: string;
  groupDescription?: string;
  groupImage?: string;
  members?: string[];
  photoCount?: number;
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  locale,
}) => {
  if (admin.apps.length == 0) {
    admin.initializeApp();
  }
  const inviteId = params?.id as string;
  const host = req.headers.host;
  const projectId = admin.instanceId().app.options.projectId;

  let domain = `https://${projectId}.web.app`;
  if (host?.includes("localhost") || host?.includes("127.0.0.1")) {
    domain = "https://echo-photos-dev.web.app";
  }

  const reqURL = `${domain}/api/v1/invites/${inviteId}`;
  const itemsURL = `${domain}/api/v1/invites/${inviteId}/items`;

  try {
    const inviteResponse = await fetch(reqURL);
    const itemsResponse = await fetch(itemsURL);
    const invite: Invite = await inviteResponse.json();
    const items: AlbumItem[] = await itemsResponse.json();

    let propsData: PropsData = {
      albumName: invite.groupName ?? "",
      domain: domain,
      albumImagePreviewURL: `${domain}/api/v1/invites/${invite.id}/image`,
      albumItems: items
        .filter((item) => {
          return !item.video && !item.deleted && !item.hidden && !item.private;
        })
        .sort((a, b) => {
          if (a.pinned !== b.pinned) {
            return a.pinned ? -1 : 1; // Pinned items come first
          } else {
            if (a.contentTimeStamp < b.contentTimeStamp) {
              return -1; // Recent items first
            } else if (a.contentTimeStamp > b.contentTimeStamp) {
              return 1; // Older items next
            }
            return 0; // Equal timestamps retain relative order
          }
        }),
      inviteId: inviteId,
      ...(await serverSideTranslations(locale ?? "en", ["common", "invite"])),
    };

    return {
      props: propsData,
    };
  } catch (e) {
    console.error(e);

    let propsData: PropsData = {
      albumName: "New Album Invite",
      domain: domain,
      albumImagePreviewURL: `${domain}/images/AppIcon300.png`,
      albumItems: [],
      inviteId: inviteId,
      ...(await serverSideTranslations(locale ?? "en", ["common", "invite"])),
    };

    return {
      props: propsData,
    };
  }
};

export default function InvitePage(props: PropsData) {
  const router = useRouter();
  const fullInviteId = router.query.id as string;
  const imageId = router.query.imageId as string | undefined;
  const inviteCode = fullInviteId.substring(0, 8);
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef: Ref<HTMLAnchorElement> = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !imageId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [imageId, lastViewedPhoto, setLastViewedPhoto]);

  const { t } = useTranslation();

  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => setQrUrl(window.location.href), []);

  return (
    <>
      <Head>
        <title>
          {"Echo Photos - " + props.albumName ??
            t("invite:albumInvite") ??
            "Album Invite"}
        </title>

        <meta
          property="og:image"
          content={
            props.albumImagePreviewURL ??
            "https://www.echophotos.io/images/AppIcon300.png"
          }
        />
        <meta
          property="og:title"
          content={props.albumName ?? t("invite:albumInvite") ?? "Album Invite"}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Echo Photos" />
        <meta
          property="og:description"
          content={t("invite:social-preview.description") ?? "Join the album!"}
        />
      </Head>

      <div className="bg-black">
        <section className="mx-auto max-w-[1960px] p-4">
          {imageId && (
            <Modal
              inviteId={props.inviteId}
              domain={props.domain}
              items={props.albumItems}
              onClose={() => {
                setLastViewedPhoto(imageId);
              }}
            />
          )}
          <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
            <AlbumCard albumName={props.albumName} inviteCode={inviteCode} qrCodeURL={qrUrl}/>
            {props.albumItems.map((albumItem) => (
              <GridImage
                id={albumItem.image}
                href={`${router.pathname}?id=${props.inviteId}&imageId=${albumItem.image}`}
                src={`${props.domain}/api/v1/invites/${props.inviteId}/images/${albumItem.image}/preview`}
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
