'use client';

import { dateString, formatAsBytes } from '@utils/Formatting';
import {
  IoArrowDownCircleOutline,
  IoCalendarClearOutline,
  IoImagesOutline,
  IoServerOutline,
} from 'react-icons/io5';
import { HStack, VCenter, VStack } from '@components/UI/Components';
import { DownloadContext } from 'provider/DownloadProvider';
import { useContext } from 'react';

export default function InfoBox() {
  var download = useContext(DownloadContext);
  if (!download) {
    return;
  }
  return (
    <VCenter>
      <div className="rounded-3xl bg-gray-200 px-16 py-6">
        <HStack className="items-center justify-between space-x-2">
          <IoArrowDownCircleOutline size={144} className="h-auto w-full text-slate-400" />

          <div className="m-4 w-44">
            <VStack className="items-start justify-between space-y-2">
              <div className="font-light text-gray-500">
                <>Zip Archive</>

                <div className="bt-2 mb-4 text-3xl font-bold">
                  {download.albumData?.name ?? 'Album'}
                </div>

                <VStack className="items-start justify-between space-y-2">
                  <HStack className="items-center justify-between space-x-2">
                    <IoServerOutline className="mr-2 w-4" />
                    {formatAsBytes(download.byteSize ?? 0)}
                  </HStack>

                  <HStack className="items-center justify-between space-x-2">
                    <IoImagesOutline className="mr-2 w-4" />
                    {download.itemCount ?? 0}
                  </HStack>

                  <HStack className="items-center justify-between space-x-2">
                    <IoCalendarClearOutline className="mr-2 w-4" />
                    {dateString(download.timestamp)}
                  </HStack>
                </VStack>
              </div>
            </VStack>
          </div>
        </HStack>
      </div>
    </VCenter>
  );
}
