export interface Invite {
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
  previewDisabled?: boolean;
  previewOnlyLiked?: boolean;
}

export interface IdInvite extends Invite {
  id: string;
}
