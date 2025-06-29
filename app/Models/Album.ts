export interface IdAlbum {
  id: string;
  name: string;
  description: string;
  created: number;
  lastChange: number;
  lastViewed?: number;
  creator: string;
  members: string[];
  formerMembers?: string[];
  admins: string[];
  lockedFor?: string[];
  viewers?: string[];
  uploadRequests?: string[];
  waitlist?: string[];
  adminOnlyInvite?: boolean;

  // Premium features
  features?: string[];
  premium?: boolean;
  memberLimit?: number;
  downloadLinkLimit?: number;

  // Optional
  image?: string;
  unreadItems?: { [userId: string]: number };
  eventStart?: number;
  eventEnd?: number;
  allDay?: boolean;
  locationHash?: string;
  isFragmented?: boolean;
  journal?: boolean;

  // Lock State
  lockedForAll?: boolean;
  lockedForNonAdmins?: boolean;

  // Muted State
  muted?: string[];
  mutedUploads?: boolean;
  limitedNotificationOnComment?: boolean;

  // Chached stats
  cachedNumberOfMembers?: number;
  cachedNumberOfPhotos?: number;
  cachedNumberOfComments?: number;
  cachedContentLocationHash?: string;
  cachedEarliestTimestamp?: number;
  cachedLatestTimestamp?: number;
  cachedContributors?: string[];
  cachedContributorsCount?: number;

  // Counters
  createdDownloadLinkCount?: number;
}

export function hasAvailableDownloadLink(album: Omit<IdAlbum, 'id'>): boolean {
  return (album.createdDownloadLinkCount ?? 0) < (album.downloadLinkLimit ?? 100);
}

export function getUsersNotifiedOnItemUpload(album: Omit<IdAlbum, 'id'>, eventAuthor: string) {
  const members = album.members;
  const muted = album.muted ?? [];
  return members.filter((member: string) => {
    return eventAuthor !== member && !muted.includes(member) && !album.mutedUploads;
  });
}

export interface NewAlbum {
  name: string;
  members: string[];
  admins?: string[];
  eventStart?: number;
  eventEnd?: number;
  allDay?: boolean;
  description?: string;
}
