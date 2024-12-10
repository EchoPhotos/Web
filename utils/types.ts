/* eslint-disable no-unused-vars */
export interface SharedModalProps {
  index: number;
  domain: string;
  invite: Invite;
  albumItems: AlbumItem[];
  currentPhoto?: string;
  goTo: (itemIdx: number) => void;
  closeModal: () => void;
  direction?: number;
  goToNext: () => void;
  goToPrevious: () => void;
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
  viewOnly?: boolean;
  previewOnlyLiked?: boolean;
}

export interface Download {
  album: string;
  creator?: string;
  timestamp: number;
  downloadCount?: number;
  ready?: boolean; // If false it represents a failed download creation
  isOutdated?: boolean;
  isDisabled?: boolean;
  byteSize?: number;
  itemCount?: number;
  albumData: { 
    name: string,
    image?: string,
    itemNumber: number 
  }
}

export interface AlbumItem {
  id: string;
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
