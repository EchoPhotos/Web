'use client';

import PanelView from '@components/UI/PanelView';
import { IdAlbum, IdInvite } from '@Shared/Models';
import AlbumPanel from '@components/Album/AlbumPanel';
import AlbumOverview from '@components/Album/AlbumOverview';
import { AlbumContext } from 'provider/AlbumProvider';
import { InviteContext } from 'provider/InviteProvider';
import Panel from '@components/Album/CurrentDownload/Panel';
import NoLink from '@components/Album/CurrentDownload/NoLink';

export default () => {
  const download = {
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
      itemNumber: 234,
    },
  };

  const album: IdAlbum = {
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

  const invite: IdInvite = {
    id: 'testdownload',
    group: 'testAlbum',
    timestamp: 0,
  };

  return (
    <AlbumContext.Provider value={album}>
      <InviteContext.Provider value={invite}>
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
      </InviteContext.Provider>
    </AlbumContext.Provider>
  );
};
