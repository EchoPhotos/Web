import { AlbumItem, Invite } from './types';

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

export async function fetchItemsForInvite(inviteId: string): Promise<AlbumItem[]> {
  const domain = await getDomain();

  const itemsURL = `${domain}/api/v1/invites/${inviteId}/items`;
  const itemsResponse: Response = await fetch(itemsURL, {
    next: { revalidate: 60 },
  });
  if (!itemsResponse.ok) {
    throw new Error('Failed to fetch items data');
  }
  let items: AlbumItem[] = await itemsResponse.json();
  return items;
}

export async function fetchInvite(inviteId: string): Promise<Invite> {
  const domain = await getDomain();
  const inviteURL = `${domain}/api/v1/invites/${inviteId}`;
  const inviteResponse: Response = await fetch(inviteURL, { next: { revalidate: 60 } });
  if (!inviteResponse.ok) {
    throw new Error('Failed to fetch invite data');
  }
  return await inviteResponse.json();
}
