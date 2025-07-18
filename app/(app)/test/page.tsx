'use client';

import PanelView from '@components/UI/PanelView';
import { Album, IdDownloadWithAlbum, Invite } from 'app/Models';
import AlbumPanel from '@components/Album/AlbumPanel';
import { AlbumContext } from 'provider/AlbumProvider';
import { InviteContext } from 'provider/InviteProvider';
import NoLink from '@components/Album/CurrentDownload/NoLink';
import { DownloadContext } from 'provider/DownloadProvider';

export default function TestPage() {
  const download: IdDownloadWithAlbum = {
    id: 'testdownload',
    album: 'Test Album',
    creator: 'me',
    timestamp: 1234567891234,
    downloadCount: 3,
    ready: true,
    isOutdated: false,
    isDisabled: true,
    byteSize: 12333442,
    itemCount: 12,
    albumData: {
      name: '324',
      description: 'tets',
      created: 0,
      lastChange: 0,
      creator: '',
      members: [],
      admins: [],
    },
  };

  const album: Album = {
    id: 'testAlbum',
    name: 'Test Album',
    creator: 'me',
    lastChange: 1234567891234,
    created: 1234567891234,
    description: '',
    members: ['testUser'],
    admins: [],
    createdDownloadLinkCount: 1,
    downloadLinkLimit: 1,
    memberLimit: 1,
  };

  const invite: Invite = {
    id: 'testdownload',
    group: 'testAlbum',
    timestamp: 0,
  };

  return (
    <AlbumContext.Provider value={album}>
      <InviteContext.Provider value={invite}>
        <DownloadContext.Provider value={download}>
          <PanelView panelConent={<AlbumPanel />}>
            {/* <div className="flex h-full w-full flex-col md:flex-row">
              <div className="flex h-full w-24 items-center bg-green-400">
                {' '}
                Env is: "{process.env.MESSAGE}"
              </div>
              <div className="h-full w-full">{<AlbumOverview />}</div>
            </div> */}
            <NoLink album={album} />
          </PanelView>
        </DownloadContext.Provider>
      </InviteContext.Provider>
    </AlbumContext.Provider>
  );
}
