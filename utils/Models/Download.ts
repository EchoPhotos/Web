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
}

export interface IdDownload extends Download {
  id: string;
}
