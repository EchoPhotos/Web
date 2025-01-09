import { Album, IdDownload } from '../../functions/src/Models';

export * from '../../functions/src/Models';

export interface IdDownloadWithAlbum extends IdDownload {
  albumData?: Album;
}
