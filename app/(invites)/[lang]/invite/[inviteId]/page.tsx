import { Metadata } from "next";
import InvitePreview, { InvitePreviewData } from "./InvitePreview";
import admin from "firebase-admin";
import { AlbumItem, Invite } from "@/utils/types";

async function getData(inviteId: string): Promise<InvitePreviewData> {
  if (admin.apps.length == 0) {
    admin.initializeApp();
  }
  const projectId =
    admin.instanceId().app.options.projectId ?? "echo-photos-dev";
  let domain = `https://${projectId}.web.app`;

  const itemsURL = `${domain}/api/v1/invites/${inviteId}/items`;
  const itemsResponse: Response = await fetch(itemsURL);
  if (!itemsResponse.ok) {
    throw new Error("Failed to fetch items data");
  }
  let items: [AlbumItem] = await itemsResponse.json();

  const inviteURL = `${domain}/api/v1/invites/${inviteId}`;
  const inviteResponse: Response = await fetch(inviteURL);
  if (!inviteResponse.ok) {
    throw new Error("Failed to fetch invite data");
  }
  let invite: Invite = await inviteResponse.json();

  return {
    invite: invite,
    items: items,
    domain: domain,
    qrUrl: `${domain}/invite/${inviteId}`,
    inviteId: inviteId,
    albumPreviewImageUrl: `${domain}/api/v1/invites/${invite.id}/image`,
  };
}

type Props = {
  params: { inviteId: string; lang: string };
  searchParams: {
    imageId: string | undefined;
    [key: string]: string | string[] | undefined;
  };
};

export default async function Page(props: Props) {
  const fetchedData = await getData(props.params.inviteId);
  return (
    <InvitePreview
      data={{ ...fetchedData, imageId: props.searchParams.imageId }}
      lang = {props.params.lang}
    ></InvitePreview>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.inviteId;
  const product = await getData(id);
  const title = product.invite.groupName + " | Echo Photos";
  const imageUrl =
    product.albumPreviewImageUrl ??
    "https://www.echophotos.io/images/AppIcon300.png";

  return {
    title: title,
    twitter: {
      title: title,
      images: imageUrl,
    },
    openGraph: {
      title: title,
      images: imageUrl,
      siteName: "Echo Photos",
      type: "website",
    },
  };
}
