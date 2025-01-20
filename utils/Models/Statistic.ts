export interface Statistic {
  _counterAlbumsCreated?: number;
  _counterCommentsCreated?: number;
  _counterDaysOnline?: number;
  _counterItemsUploaded?: number;
  _counterMembersAdded?: number;

  createdGroupsCount?: number;
  addedMembersCount?: number; // Invited by link or added on create (not tracking manually added users)
  onboardedUsers?: number;
  uploadedItemCount?: number;
  creatorOfFirstAlbum?: string;
  cachedNumberOfOnboardedMembers?: number; // Count of times a user joined first album where creator is this account
}
