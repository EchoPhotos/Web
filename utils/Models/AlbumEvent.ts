export enum AlbumEventType {
  newComment = 'newComment',
  newImages = 'newImages',
  newMembers = 'newMembers',
  message = 'message',
}

export interface AlbumEvent {
  group: string;
  timeStamp: number;
  type: string;
  user?: string;

  // new comment
  commentedImage?: string;
  commentedItem?: string;
  comment?: string;
  commentText?: string;
  replyOf?: string;
  replyingToText?: string;

  // new batch
  batch?: string;
  batchImages?: string[];

  // new member
  newMembers?: string[];

  // message
  message?: string;
  replying?: string;
}

export class NewCommentEvent implements AlbumEvent {
  timeStamp: number;
  type: AlbumEventType;

  constructor(
    public group: string,
    public user: string,
    public comment: string,
    public commentText: string,
    public commentedImage?: string,
    public commentedItem?: string,
    public replyOf?: string,
  ) {
    this.timeStamp = (new Date()).getTime();
    this.type = AlbumEventType.newComment;
  }
}

export class NewImagesEvent implements AlbumEvent {
  timeStamp: number;
  type: AlbumEventType;

  constructor(
    public group: string,
    public user: string,
    public batch: string,
    public batchImages: string[],
  ) {
    this.timeStamp = (new Date()).getTime();
    this.type = AlbumEventType.newImages;
  }
}

export class NewMessageEvent implements AlbumEvent {
  timeStamp: number;
  type: AlbumEventType;

  constructor(
    public message: string,
    public group: string,
    public user: string,
  ) {
    this.timeStamp = (new Date()).getTime();
    this.type = AlbumEventType.message;
  }
}

export class NewMembersEvent implements AlbumEvent {
  timeStamp: number;
  type: AlbumEventType;

  constructor(
    public group: string,
    public newMembers: string[],
  ) {
    this.timeStamp = (new Date()).getTime();
    this.type = AlbumEventType.newMembers;
  }
}

export interface IdAlbumEvent extends AlbumEvent {
  id: string;
}
