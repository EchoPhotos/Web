export interface Image {
  // Upload-time provided
  uploader?: string;
  originalFileName?: string;
  originIdentifier?: string;
  uploadDate?: number;
  uploadingDeviceUTCZimeZoneName?: string; // Time zone of uploading device
  uploadingDeviceUTCOffset?: number; // (seconds) Offset from GMT in seconds

  systemTimeOfCapture?: number; // UTC, not read from Exif but from Origin database
  systemLongitude?: number;
  systemLatitude?: number;
  systemAltitude?: number;
  systemTimeZoneOffset?: number; // (seconds) Inferred from system time and location
  systemTimeZoneName?: string; // Inferred from system time and location

  // Storage state cache
  hasThumbnailSquared?: boolean;
  hasPreview?: boolean;
  isVideo?: boolean;

  // Image properties (Not based on exif)
  bytes?: number;
  duration?: number;
  resolutionWidth?: number;
  resolutionHeight?: number;
  sha1KB?: string;
  imageHash?: string;
  rating?: number;

  // Custom overrides
  customTimeOfCapture?: number; // UTC Epoch
  customTimeZoneOffset?: number; // Seconds from GMT
  customTimeZoneName?: string;
  customLatitude?: number;
  customLongitude?: number;
  customAltitude?: number;

  // Synthesized purely on Exif Data
  gpsUTCTime?: number; // Epoch from GPSTimeStamp and GPSDateStamp
  estimatedUTCOffset?: number; // seconds difference from UTC, calculated by diffing GPS Time and Exif Time
  locationBasedUTCOffset?: number; // -1 etc., estimated based on GPS Coords from a database.
  latitude?: number;
  longitude?: number;
  altitude?: number;
  timeOfCapture?: number; // TimeOriginal using Date, Offset and SubSec (Old images did not use offset)
  timeOfCaptureUTCOffset?: number; // OffsetTimeOriginal in seconds

  /// Exif parsing
  ////////////////////////////////////////////////////
  GPSTimeStamp?: number[];
  GPSDateStamp?: string;
  GPSAltitude?: number;
  GPSAltitudeRef?: number;
  GPSLatitude?: number;
  GPSLatitudeRef?: string;
  GPSLongitude?: number;
  GPSLongitudeRef?: string;
  GPSVersionID?: number[];

  ExifDateTime?: string;
  ExifSubSecTime?: string;
  ExifOffsetTime?: string; // Time zone for DateTimeOriginal
  ExifDateTimeOriginal?: string;
  ExifSubSecTimeOriginal?: string;
  ExifOffsetTimeOriginal?: string; // Time zone for DateTimeOriginal
  ExifISOSpeedRatings?: number[];
  ExifFlash?: number;
  ExifFocalLength?: number;
  ExifApertureValue?: number;
  ExifShutterSpeedValue?: number;
  ExifWhiteBalance?: number;
  ExifLensMake?: string;
  ExifLensModel?: string;
  ExifMake?: string;
  ExifModel?: string;
  ExifOrientation?: number;

  ////////////////////////////////////////////////////////////////
  // Deprecated or unused:
  // Location
  speed?: number;
  speedHeading?: number;
  azimuth?: number; // Static Heading (unrelated to speed arrow);
  rotation?: number;

  // Exif data
  orientation?: number;
  orientationExif?: number;
  camera?: string;
  manufacturer?: string;
  aperture?: number;
  iso?: number;
  shutter?: number;
  flash?: number;
  whiteBalance?: number;
  focalLength?: number;
}

export interface IdImage extends Image {
  id: string;
}
