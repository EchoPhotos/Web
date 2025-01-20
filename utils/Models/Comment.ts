export interface Comment {
  creator: string;
  group: string;
  content: string;
  timeStamp: number;
  item: string;
  replyOf?: string;
  likes?: string[];
}

export interface IdComment extends Comment {
  id: string;
}
