import { Metadata, ResolvingMetadata } from "next";
import InvitePreview, { InvitePreviewData } from "./InvitePreview";
import admin from "firebase-admin";
import { AlbumItem, Invite } from "../../../utils/types";

async function getData(inviteId: string) {
  if (admin.apps.length == 0) {
    admin.initializeApp();
  }
  const projectId =
    admin.instanceId().app.options.projectId ??
    "echo-photos-dev"; ;
  let domain = `https://${projectId}.web.app`;

  const inviteURL = `${domain}/api/v1/invites/${inviteId}`;
  const itemsURL = `${domain}/api/v1/invites/${inviteId}/items`;

  const itemsResponse: Response = await fetch(itemsURL);
  if (!itemsResponse.ok) {
    throw new Error("Failed to fetch items data");
  }
  let invite: Invite = await itemsResponse.json();
  console.log(`Successfully fetched invite from ${inviteURL}`);
  
  const inviteResponse: Response = await fetch(itemsURL);
  if (!inviteResponse.ok) {
    throw new Error("Failed to fetch invite data");
  }
  let items: [AlbumItem] = await inviteResponse.json();
  console.log(`Successfully fetched items from ${itemsURL}`);
  return {
    invite: invite,
    items: items,
    domain: domain,
    qrURL: `${domain}/invite/${inviteId}`,
    inviteId: inviteId,
  };
}

type Props = {
  params: { inviteId: string };
  searchParams: { 
    imageId: string | undefined,
    [key: string]: string | string[] | undefined 
  };
};

export default async function Page(props: Props) {
  const data = await getData(props.params.inviteId);

  const fetchedData: InvitePreviewData = {
    invite: data.invite,
    items: data.items,
    inviteId: data.inviteId,
    domain: data.domain,
    pathname: "",
    qrUrl: data.qrURL,
  };

  return <InvitePreview data={{ ...fetchedData, imageId: props.searchParams.imageId }}></InvitePreview>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.inviteId;
  const product = await getData(id);
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: product.invite.groupName,
    openGraph: {
      images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}
