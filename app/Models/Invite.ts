export interface IdInvite {
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
  previewDisabled?: boolean;
  previewOnlyLiked?: boolean;
}
