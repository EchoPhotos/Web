export interface UploadMetadata {
  id?: string;
  batch: string;
  batchSize: number;
  lastOfBatch: boolean;
  originalFileName?: string;
  originIdentifier?: string;
  uploadingDeviceUTCZimeZoneName?: string; // Time zone of uploading device
  uploadingDeviceUTCOffset?: number; // (seconds) Offset from GMT in seconds
  isVideo?: boolean;
  videoDuration?: number;
  assetMediaSubtype?: number;
  sha1KB?: string;
  imageHash?: string;
  rating?: number;

  systemTimeOfCapture?: number; // UTC, not read from Exif but from Origin database
  systemLongitude?: number;
  systemLatitude?: number;
  systemAltitude?: number;
  systemTimeZoneOffset?: number; // (seconds) Inferred from system time and location
  systemTimeZoneName?: string; // Inferred from system time and location
}
