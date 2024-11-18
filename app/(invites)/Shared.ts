import { Metadata } from "next";
import { InvitePreviewData } from "./InvitePreview";
import { AlbumItem } from "@/utils/types";
import { CoordinateRegion } from "mapkit-react";
import ngeohash from "ngeohash";
import * as API from "@/utils/API";

export async function getData(inviteId: string): Promise<InvitePreviewData> {
  const invite = await API.fetchInvite(inviteId);
  const items = await API.fetchItemsForInvite(inviteId);
  const domain = await API.getDomain();

  const sortedItems = items
    .sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1;
      } else {
        if (a.contentTimeStamp < b.contentTimeStamp) {
          return -1;
        } else if (a.contentTimeStamp > b.contentTimeStamp) {
          return 1;
        }
        return 0;
      }
    })
    .filter((item) => !item.hidden);

  return {
    invite: invite,
    items: sortedItems,
    domain: domain,
    albumMapRegion: calculateCoordinateRegion(sortedItems),
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
    `${product.domain}/api/v1/invites/${id}/image`;

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
