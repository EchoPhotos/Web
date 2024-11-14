import { Metadata } from "next";
import { InvitePreviewData } from "./InvitePreview";
import admin from "firebase-admin";
import { AlbumItem, Invite } from "@/utils/types";
import { CoordinateRegion } from "mapkit-react";
import ngeohash from "ngeohash";

export async function getData(inviteId: string): Promise<InvitePreviewData> {
  const ADMIN_APP_NAME = "firebase-frameworks";
  const adminApp =
    admin.apps.find((app) => app?.name === ADMIN_APP_NAME) ||
    admin.initializeApp(
      {
        credential: admin.credential.applicationDefault(),
      },
      ADMIN_APP_NAME
    );

  const projectId =
    admin.instanceId(adminApp).app.options.projectId ?? "echo-photos-dev";
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
    initialRegion: calculateCoordinateRegion(items),
  };
}

function calculateCoordinateRegion(items: AlbumItem[]): CoordinateRegion | undefined {
  if (items.length === 0) {
    return undefined;
  }

  const firstHash = items.find(item => item.contentLocationHash)?.contentLocationHash;
  if (!firstHash) {
    return undefined;
  }
  const { latitude, longitude } = ngeohash.decode(firstHash);
  let minLat = latitude;
  let maxLat = latitude;
  let minLng = longitude;
  let maxLng = longitude;

  for (const item of items) {
    if (!item.contentLocationHash) {
      continue;
    }
    const { latitude, longitude } = ngeohash.decode(item.contentLocationHash);
    if (latitude < minLat) minLat = latitude;
    if (latitude > maxLat) maxLat = latitude;
    if (longitude < minLng) minLng = longitude;
    if (longitude > maxLng) maxLng = longitude;
  };

  return {
    latitudeDelta: (maxLat == minLat) ? 0.1 : (maxLat - minLat) * 1.2,
    longitudeDelta: (maxLat == minLat) ? 0.1 : (maxLng - minLng) * 1.2,
    centerLatitude: (minLat + maxLat) / 2,
    centerLongitude: (minLng + maxLng) / 2,
  };
}

export type InviteProps = {
  params: { inviteId: string; lang: string };
  searchParams: {
    itemId: string | undefined;
    [key: string]: string | string[] | undefined;
  };
};

export async function generateMetadata({ params }: InviteProps): Promise<Metadata> {
  const id = params.inviteId;
  const product = await getData(id);
  const title = product.invite.groupName;
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
