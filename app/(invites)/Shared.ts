import { Metadata } from 'next';
import { AlbumPreviewData } from './AlbumPreview';
import { CoordinateRegion } from 'mapkit-react';
import ngeohash from 'ngeohash';
import * as API from '@utils/API';
import { AlbumItem } from 'app/Models';

export async function getData(inviteId: string): Promise<AlbumPreviewData> {
  const invite = await API.fetchInvite(inviteId);
  const items = await API.fetchItemsForInvite(inviteId);
  const domain = await API.getDomain();

  const sortedItems = items.filter((item) => !item.hidden);

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

  const firstHash = items.find((item) => item.contentLocationHash)?.contentLocationHash;
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
  }

  return {
    latitudeDelta: maxLat == minLat ? 0.1 : (maxLat - minLat) * 1.2,
    longitudeDelta: maxLat == minLat ? 0.1 : (maxLng - minLng) * 1.2,
    centerLatitude: (minLat + maxLat) / 2,
    centerLongitude: (minLng + maxLng) / 2,
  };
}

export type InviteProps = {
  params: Promise<{ inviteId: string; lang: string }>;
  searchParams: Promise<{
    itemId: string | undefined;
    [key: string]: string | string[] | undefined;
  }>;
};

type MetadataLocale = 'en' | 'de' | 'fr';

const metadataText: Record<
  MetadataLocale,
  {
    photoSingular: string;
    photoPlural: string;
    withPhotosDescription: (albumName: string, photoCount: number, photoLabel: string) => string;
    emptyDescription: (albumName: string) => string;
  }
> = {
  en: {
    photoSingular: 'photo',
    photoPlural: 'photos',
    withPhotosDescription: (albumName, photoCount, photoLabel) =>
      `See all ${photoCount} ${photoLabel} of "${albumName}" on Echo Photos.`,
    emptyDescription: (albumName) => `See "${albumName}" on Echo Photos.`,
  },
  de: {
    photoSingular: 'Foto',
    photoPlural: 'Fotos',
    withPhotosDescription: (albumName, photoCount, photoLabel) =>
      `Sieh dir alle ${photoCount} ${photoLabel} von "${albumName}" auf Echo Photos an.`,
    emptyDescription: (albumName) => `Album "${albumName}" auf Echo Photos ansehen.`,
  },
  fr: {
    photoSingular: 'photo',
    photoPlural: 'photos',
    withPhotosDescription: (albumName, photoCount, photoLabel) =>
      `Voir les ${photoCount} ${photoLabel} de "${albumName}" sur Echo Photos.`,
    emptyDescription: (albumName) => `Voir "${albumName}" sur Echo Photos.`,
  },
};

export async function generateMetadata({ params }: InviteProps): Promise<Metadata> {
  const p = await params;
  const id = p.inviteId;
  const albumPreviewData = await getData(id);
  const locale: MetadataLocale = p.lang === 'de' || p.lang === 'fr' ? p.lang : 'en';
  const text = metadataText[locale];
  const albumName = albumPreviewData.invite.groupName?.trim() || 'Shared album';
  const photoCount = albumPreviewData.items.length;
  const photoLabel = photoCount === 1 ? text.photoSingular : text.photoPlural;
  const title = `${albumName} | ${photoCount} ${photoLabel}`;
  const description =
    photoCount > 0
      ? text.withPhotosDescription(albumName, photoCount, photoLabel)
      : text.emptyDescription(albumName);
  const imageUrl = `${albumPreviewData.domain}/api/v1/invites/${id}/image`;

  return {
    title: title,
    description: description,
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: imageUrl,
    },
    openGraph: {
      title: title,
      description: description,
      images: imageUrl,
      siteName: 'Echo Photos',
      type: 'website',
    },
  };
}
