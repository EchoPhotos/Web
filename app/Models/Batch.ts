export interface Batch {
  album: string;
  created: number;
  author: string;
  uploadedItemsCount: number;
  didCompleteUpload?: boolean;
  targetItemsCount?: number;
}

export interface IdBatch extends Batch {
  id: string;
}
