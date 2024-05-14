import { Metadata, ResolvingMetadata } from "next";
import InvitePreview, { InvitePreviewData } from "./InvitePreview";
import { AlbumItem, Invite } from "../../../../utils/types";


async function getData(inviteId: string): Promise<InvitePreviewData> {
const { credential } = await import("firebase-admin");
  const { initializeApp: initializeAdminApp, getApps: getAdminApps } =
    await import("firebase-admin/app");

  const adminAppName = "echo-photos-app";
  const adminApp =
    getAdminApps().find((it) => it.name === adminAppName) ||
    initializeAdminApp(
      {
        credential: credential.applicationDefault(),
      },
      adminAppName
    );
  if (admin.apps.length == 0) {
    admin.initializeApp(undefined, "echo-photos")
  }
  const projectId =
    adminApp.instanceId().app.options.projectId ?? "echo-photos-dev";
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
  params: { inviteId: string };
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
