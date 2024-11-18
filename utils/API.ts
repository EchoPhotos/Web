import { AlbumItem, Invite } from "./types";
import admin from "firebase-admin";

export async function getDomain() {
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
  return domain;
}

export async function fetchItemsForInvite(inviteId: string): Promise<AlbumItem[]> {
  const domain = await getDomain();

  const itemsURL = `${domain}/api/v1/invites/${inviteId}/items`;
  const itemsResponse: Response = await fetch(itemsURL, {
    next: { revalidate: 60 },
  });
  if (!itemsResponse.ok) {
    throw new Error("Failed to fetch items data");
  }
  let items: AlbumItem[] = await itemsResponse.json();
  return items;
}

export async function fetchInvite(inviteId: string): Promise<Invite> {
  const domain = await getDomain();

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
  return await inviteResponse.json();
}
