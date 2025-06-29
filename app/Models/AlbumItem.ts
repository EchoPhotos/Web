export interface IdAlbumItem {
  id: string;
  uploader: string;
  group: string;
  image: string;
  video?: boolean;
  duration?: number; // In seconds
  livePhoto?: boolean;
  contentTimeStamp?: number;
  originIdentifier?: string;
  likes?: string[];
  involved?: string[];
  hidden?: boolean;
  deleted?: boolean;
  hiddenFor?: string[];
  batch?: string;
  copyOf?: string;
  firstOf?: number;
  cachedCommentsCount?: number;
  contentLocationHash?: string; // precision of 9!
  timeStamp: number;
  lastChange: number;
  viewCount: { [userId: string]: number };
  unreadItems?: { [userId: string]: number };
  downloaded?: string[];

  sha1KB?: string;
  imageHash?: string;
  rating?: number;
  caption?: string;
  pinned?: boolean;
}
