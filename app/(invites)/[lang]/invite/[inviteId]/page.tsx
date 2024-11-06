import { Metadata } from "next";
import InvitePreview, { InvitePreviewData } from "./InvitePreview";
import admin from "firebase-admin";
import { AlbumItem, Invite } from "@/utils/types";
import { getDictionary } from "@/utils/dictionary";

async function getData(inviteId: string): Promise<InvitePreviewData> {
  const ADMIN_APP_NAME = "firebase-frameworks";
  const adminApp =
    admin.apps.find((app) => app?.name === ADMIN_APP_NAME) ||
    admin.initializeApp(
      {
        credential: admin.credential.applicationDefault(),
      },
      ADMIN_APP_NAME
    );

  const projectId = admin.instanceId(adminApp).app.options.projectId;
  let domain = `https://${projectId}.web.app`;
  if (projectId === "echo-photos") {
    domain = "https://www.echophotos.io";
  }

  const itemsURL = `${domain}/api/v1/invites/${inviteId}/items`;
  const itemsResponse: Response = await fetch(itemsURL, {
    next: { revalidate: 60 },
  });
  if (!itemsResponse.ok) {
    throw new Error("Failed to fetch items data");
  }
  let items: AlbumItem[] = await itemsResponse.json();

  const inviteURL = `${domain}/api/v1/invites/${inviteId}`;
  const inviteResponse: Response = await fetch(inviteURL, { next: { revalidate: 60 } });
  if (!inviteResponse.ok) {
    throw new Error("Failed to fetch invite data");
  }
  let invite: Invite = await inviteResponse.json();

  items = items.sort((a, b) => {
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
    });
    
  items = items.filter((item) => !item.hidden);

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
  const dicts = await getDictionary(props.params.lang);
  return (
    <InvitePreview
      data = {{ ...fetchedData, imageId: props.searchParams.imageId }}
      albumCardDict = {dicts.albumCard}
      lang = {props.params.lang}
    />
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
