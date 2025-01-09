'use client';

import { formatAsBytes, dateString } from '@utils/Formatting';
import { IdDownload } from '@utils/Models';
import * as Icons from 'react-icons/io5';

export default function DownloadRow({ download }: { download: IdDownload }) {
  return (
    <div key={download.id}>
      <div className="m-3 flex flex-row justify-between rounded-xl bg-slate-100 p-2">
        <div className="flex flex-row space-x-3">
          <div>
            <p>{dateString(download.timestamp)}</p>
            <p className="text-sm text-slate-400">
              <div className="flex items-center">
                {download.downloadCount ?? 0}
                <Icons.IoCodeDownload className="w-8" />
              </div>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end font-light text-gray-500">
          <div className="flex items-center">
            {formatAsBytes(download.byteSize ?? 0)}
            <Icons.IoServer className="w-8" />
          </div>
          <div className="flex items-center">
            {download.itemCount ?? 0}
            <Icons.IoImages className="w-8" />
          </div>
        </div>

        {download.isOutdated && (
          <div className="h-12 w-12 overflow-clip rounded-md">
            <Icons.IoAlertCircle size={44} className="text-red-400" />
          </div>
        )}
        {download.isDisabled && !download.isOutdated && (
          <div className="h-12 w-12 overflow-clip rounded-md">
            <Icons.IoBan size={44} className="text-red-400" />
          </div>
        )}
        {!download.isOutdated && !download.isDisabled && (
          <div className="h-12 w-12 overflow-clip rounded-md">
            <Icons.IoShareOutline size={44} className="text-green-400" />
          </div>
        )}
      </div>
    </div>
  );
}
