'use client';

import RequireAuthentication from '@components/Authentication/RequireAuthentication';
import PanelView from '@components/UI/PanelView';
import DownloadProvider from 'provider/DownloadProvider';
import DownloadLinkPanel from '@components/Download/DownloadLinkPanel';
import { SloganMemories } from '@components/UI/Slogans';

export default function Page() {
  return (
    <DownloadProvider>
      <PanelView panelConent={<SloganMemories />}>
        <DownloadLinkPanel />
      </PanelView>
    </DownloadProvider>
  );
}
