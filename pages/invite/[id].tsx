import Head from "next/head";
import { useRouter } from "next/router";
import QRCode from "react-qr-code";
import { useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import admin from "firebase-admin";
import Button from "../../components/Button";
import GooglePlay from "../../components/Badges/GooglePlay";
import AppStore from "../../components/Badges/AppStore";
import WebApp from "../../components/Badges/WebApp";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Bridge from "../../components/Icons/Bridge";
import { useLastViewedPhoto } from "../../utils/useLastViewedPhoto";
import Modal from "../../components/Modal";
import { AlbumItem } from "../../utils/types";

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

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !imageId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [imageId, lastViewedPhoto, setLastViewedPhoto]);

  const { t } = useTranslation();

  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => setQrUrl(window.location.href), []);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(inviteCode);
    alert(t("invite:copied"));
  };

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

      <section>
        <div className="container mx-auto max-w-6xl py-8 mt-16">
          <div id="inviteInfo" className="flex mb-20 md:flex-row flex-col">
            <div
              className="md:w-1/2 flex justify-center items-center px-5"
              id="qrcode"
            >
              <QRCode value={qrUrl} />
            </div>

            <div className="md:w-1/2 px-5 my-auto block text-center md:text-left">
              <h4 className="font-bold mb-4 md:mt-0 mt-16" id="title">
                {t("invite:title")}
              </h4>

              <p
                id="inviteCode"
                className="font-mono text-center py-2 px-5 md:mx-0 mx-auto bg-neutral-200 rounded-xl uppercase font-light text-5xl mb-2"
              >
                {inviteCode}
              </p>

              <p className="mb-6">{t("invite:description")}</p>

              <Button onClick={copyToClipboard} className="mx-0">
                {t("invite:copy-code")}
              </Button>
            </div>
          </div>

          <div className="flex md:flex-row flex-col text-center md:text-left">
            <div className="md:w-1/2 px-5 my-auto">
              <div className="block">
                <h1 className="font-bold mb-6" id="title">
                  {t("invite:download.title")}
                </h1>

                <p className="mb-6">{t("invite:download.description")}</p>

                <div className="flex justify-center md:justify-start items-center">
                  <AppStore />
                  <GooglePlay />
                  <WebApp inviteId="{fullInviteId}" />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 px-5 flex items-center justify-center">
              <img src="/images/AppIcon300.png" alt="Echo Photos" />
            </div>
          </div>
        </div>
      </section>

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
            {/*<div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-1 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <span className="flex max-h-full max-w-full items-center justify-center">
                  <Bridge />
                </span>
                <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
              </div>
              <h1 className="text-2xl font-bold uppercase tracking-widest">
                {props.albumName}
              </h1>
              <div
                className="p-5 bg-white aspect-square rounded-lg scale-50"
                id="qrcode"
              >
                <QRCode value={qrUrl} />
              </div>
              <p
                id="inviteCode"
                className="mb-2 font-mono text-slate-700 text-center py-2 px-5 md:mx-0 mx-auto bg-white rounded uppercase text-xl"
              >
                {inviteCode}
              </p>
              <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch] text-sm">
                {t("invite:description")}
              </p>
              <button
                className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
                onClick={copyToClipboard}
              >
                Upload Photos
              </button>
            </div> */}
            {props.albumItems.map((albumItem) => (
              <div
                key={albumItem.image}
                // href={`/?photoId=${imageId}`}
                // as={`/p/${imageId}`}
                // shallow
                className="after:content group relative mb-5 block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
              >
                <Link
                  key={albumItem.image}
                  href={`${router.pathname}?id=${props.inviteId}&imageId=${albumItem.image}`}
                  ref={
                    albumItem.image === lastViewedPhoto
                      ? lastViewedPhotoRef
                      : null
                  }
                  shallow
                  className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                >
                  <Image
                    alt="Album Image"
                    className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    src={`${props.domain}/api/v1/invites/${props.inviteId}/images/${albumItem.image}/preview`}
                    width={720}
                    height={480}
                    unoptimized={true}
                    //   sizes="(max-width: 640px) 100vw,
                    // (max-width: 1280px) 50vw,
                    // (max-width: 1536px) 33vw,
                    // 25vw"
                  />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
