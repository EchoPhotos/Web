import axios from 'axios';
import { getToken } from './Auth';
import { getAPIHost } from './Environment';
import {
  IdAlbum,
  IdAlbumItem,
  IdDownload,
  IdInvite,
  NewAlbum,
  UploadMetadata,
  User,
} from '@Shared/Models';
import { ImageFormat } from './ImageCache';
import debugBeep from './Beep';
import { notFound } from 'next/navigation';

// Server-side
export async function getDomain() {
  const config = process.env.FIREBASE_CONFIG;
  if (!config) {
    throw Error(config);
  }
  const projectId = JSON.parse(config).projectId;
  let domain = `https://${projectId}.web.app`;
  if (projectId === 'echo-photos') {
    domain = 'https://www.echophotos.io';
  }
  return domain;
}

// Server-side
export async function fetchItemsForInvite(inviteId: string): Promise<IdAlbumItem[]> {
  const domain = await getDomain();

  const itemsURL = `${domain}/api/v1/invites/${inviteId}/items`;
  const itemsResponse: Response = await fetch(itemsURL, {
    next: { revalidate: 60 },
  });
  if (!itemsResponse.ok) {
    throw new Error('Failed to fetch items data');
  }
  const items: IdAlbumItem[] = await itemsResponse.json();
  return items;
}

// Server-side
export async function fetchInvite(inviteId: string): Promise<IdInvite> {
  const domain = await getDomain();
  const inviteURL = `${domain}/api/v1/invites/${inviteId}`;
  const inviteResponse: Response = await fetch(inviteURL, { next: { revalidate: 60 } });
  if (!inviteResponse.ok) {
    notFound();
    throw new Error('Failed to fetch invite data');
  }
  return await inviteResponse.json();
}

export async function getOrRegisterUser(nameForRegistering: string) {
  const token = await getToken();
  try {
    debugBeep();

    const response = await axios.get(getAPIHost() + '/users/current', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as User;
  } catch (error) {
    if (error.response.status === 404) {
      await registerUser({ name: nameForRegistering });
    } else {
      throw Error('Could not fetch user');
    }
  }
}

export async function registerUser(data: { name: string }): Promise<User> {
  const token = await getToken();
  if (!token) {
    console.warn('User not authenticated');
  }
  try {
    const response = await axios.post(getAPIHost() + '/users', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status > 299) {
      throw Error('Creating Album failed');
    }
    return response.data as User;
  } catch (error) {
    console.error('Failed to fetch current user!', error);
    throw error;
  }
}

export async function addUploadToAlbum(
  metadata: UploadMetadata,
  albumId: string,
): Promise<IdAlbumItem> {
  const item: IdAlbumItem = await postAuthorized(`/albums/${albumId}/items`, metadata);
  return item;
}

export async function createDownloadLink(albumId: string): Promise<IdDownload> {
  const token = await getToken();
  if (!token) {
    console.warn('User not authenticated');
  }

  const response = await axios.post(
    getAPIHost() + `/albums/${albumId}/downloads`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data as IdDownload;
}

export async function getUser(): Promise<User> {
  // Do not cache as it returns cached 404 after registering.
  return await getAuthorized<User>('/users/current?', { time: new Date().toISOString() });
}

export function imageURL(
  id: string | undefined,
  format: ImageFormat,
  inviteId: string | undefined,
): string {
  const invitePath = inviteId ? `/invites/${inviteId}` : '';
  switch (format) {
    case ImageFormat.Preview:
      return getAPIHost() + `${invitePath}/images/${id}/preview`;
    case ImageFormat.Thumbnail:
      return getAPIHost() + `${invitePath}/images/${id}/thumbnail-squared`;
    case ImageFormat.Original:
      return getAPIHost() + `${invitePath}/images/${id}/original`;
  }
}

export function imagUrlForId(id: string): string {
  return getAPIHost() + `/images/${id}/preview`;
}

export function thumbnailUrlForId(id: string): string {
  return getAPIHost() + `/images/${id}/thumbnail-squared`;
}

export function invitePreviewUrlForId(id: string): string {
  return getAPIHost() + `/invites/${id}/image`;
}

async function get<T>(path: string): Promise<T> {
  debugBeep();
  const response = await axios.get(getAPIHost() + path);
  return response.data as T;
}

async function postAuthorized<R, D>(path: string, data: D, params?): Promise<R> {
  const token = await getToken();
  const response = await axios.post(getAPIHost() + path, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: params,
  });
  return response.data as R;
}

async function getAuthorized<T>(path: string, params?): Promise<T> {
  debugBeep();
  const token = await getToken();
  const response = await axios.get(getAPIHost() + path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: params,
  });
  return response.data as T;
}

async function deleteAuthorized<T>(path: string): Promise<T> {
  const token = await getToken();
  const response = await axios.delete(getAPIHost() + path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status > 299) {
    console.error(path);
    throw Error('Deleting failed');
  }
  return response.data as T;
}

export async function getAlbum(id: string): Promise<IdAlbum> {
  return getAuthorized<IdAlbum>(`/albums/${id}`);
}

export async function getNewestAlbum(): Promise<IdAlbum | undefined> {
  const albums: IdAlbum[] = await getAuthorized<IdAlbum[]>(`/albums?limit=1`);
  if (albums.length > 0) {
    return albums[0];
  } else {
    return;
  }
}

export async function getDownload(id: string): Promise<IdDownload> {
  return get<IdDownload>(`/downloads/${id}/properties`);
}

export async function getCurrentAlbumDownload(albumId: string): Promise<IdDownload | undefined> {
  const download = await getAuthorized<IdDownload>(`/albums/${albumId}/downloads/current`);
  if (download && !download.isDisabled) {
    return download;
  }
  return undefined;
}

export async function getCheckoutURL(
  albumId: string,
  promoCode: string | undefined,
  redirectPath: string | undefined,
): Promise<string> {
  return getAuthorized<string>(`/purchases/albums/${albumId}/checkout`, {
    promoCode: promoCode,
    redirectPath: redirectPath,
  });
}

export async function getDownloads(albumId: string): Promise<IdDownload[]> {
  return getAuthorized<IdDownload[]>(`/albums/${albumId}/downloads`);
}

export async function getAlbumItems(albumId: string): Promise<IdAlbumItem[]> {
  return getAuthorized<IdAlbumItem[]>(`/albums/${albumId}/items`);
}

export async function getAlbums(limit: number | undefined = undefined): Promise<IdAlbum[]> {
  const albums = await getAuthorized<IdAlbum[]>('/albums', limit ? { limit: limit } : undefined);

  return albums.sort((a, b) => {
    if (a.lastChange < b.lastChange) {
      return 1;
    } else if (a.lastChange > b.lastChange) {
      return -1;
    }
    return 0;
  });
}

export async function getTokenForCode(code: string): Promise<string> {
  const body = await get<{ token: string }>(`/auth/codes/${code}/token`);
  return body.token;
}

export async function joinAlbum(inviteId: string): Promise<IdAlbum> {
  return postAuthorized(`/invites/${inviteId}/join`, undefined);
}

export async function getActiveAlbumInvite(id: string): Promise<IdInvite> {
  return getAuthorized<IdInvite>(`/albums/${id}/invites/active`);
}

export async function getViewOnlyInvite(id: string): Promise<IdInvite> {
  return getAuthorized<IdInvite>(`/albums/${id}/invites/public-code`);
}

export async function getInvite(id: string): Promise<IdInvite> {
  return get<IdInvite>(`/invites/${id}`);
}

export async function createAlbum(data: NewAlbum): Promise<IdAlbum> {
  const token = await getToken();
  if (!token) {
    console.warn('User not authenticated');
  }
  try {
    const response = await axios.post(getAPIHost() + '/albums', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status > 299) {
      throw Error('Creating Album failed');
    }
    return response.data as IdAlbum;
  } catch (error) {
    console.error('Failed to fetch current user!', error);
    throw error;
  }
}

export async function enableLikedOnlyPreview(inviteId: string): Promise<void> {
  return getAuthorized<void>(`/invites/${inviteId}/preview-only-liked`);
}

export async function disableLikedOnlyPreview(inviteId: string): Promise<void> {
  return deleteAuthorized<void>(`/invites/${inviteId}/preview-only-liked`);
}

export async function enableViewOnly(inviteId: string): Promise<void> {
  return getAuthorized<void>(`/invites/${inviteId}/view-only`);
}

export async function disableViewOnly(inviteId: string): Promise<void> {
  return deleteAuthorized<void>(`/invites/${inviteId}/view-only`);
}
