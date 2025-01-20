import { Album } from './Album';
import { IdDownload } from './Download';

export * from './Account';
export * from './Album';
export * from './AlbumEvent';
export * from './AlbumItem';
export * from './Batch';
export * from './Comment';
export * from './Contact';
export * from './Count';
export * from './Download';
export * from './Feedback';
export * from './Image';
export * from './Invite';
export * from './Purchase';
export * from './Statistic';
export * from './Upload';
export * from './UploadMetadata';
export * from './User';

export interface IdDownloadWithAlbum extends IdDownload {
  albumData?: Album;
}
