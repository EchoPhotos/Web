/* eslint-disable no-unused-vars */
export interface SharedModalProps {
  index: number;
  domain: string;
  invite: Invite;
  albumItems: AlbumItem[];
  currentPhoto?: string;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  direction?: number;
}

export interface Invite {
  id: string;
  group: string;
  timestamp: number;
  code?: string;
  disabled?: boolean;
  inviter?: string;
  groupName?: string;
  groupDescription?: string;
  groupImage?: string;
  members?: string[];
  photoCount?: number;
}

export interface AlbumItem {
  uploader: string;
  image: string;
  video?: boolean;
  duration?: number; // In seconds
  contentTimeStamp: number;
  likes?: string[];
  hidden?: boolean;
  private?: boolean;
  pinned?: boolean;
  deleted?: boolean;
  hiddenFor?: string[];
  batch?: string;
  firstOf?: number;
  cachedCommentsCount?: number;
  contentLocationHash?: string; // precision of 9!
  timeStamp: number;
  lastChange: number;
  viewCount: { [userId: string]: number };
  unreadItems?: { [userId: string]: number };

  sha1KB?: string;
  imageHash?: string;
  rating?: number;
}
