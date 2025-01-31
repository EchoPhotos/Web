'use client';

import { HStack, VStack } from '@components/UI/Components';
import Disclosure from '@components/UI/Disclosure';
import { IoWarning } from 'react-icons/io5';

export default function DownloadLimit({ limit, used }: { limit: number; used?: number }) {
  return (
    <Disclosure
      title={
        <HStack className="text-sm/6 font-medium">
          <IoWarning size={22} color="orange" className="mr-2" />
          Limited download links
        </HStack>
      }
    >
      <VStack>
        Note: New photo uploads will not be included in existing download links after they are
        created.
        <p>
          {used ?? 0} out of {limit} available download(s) gave been used.
        </p>
      </VStack>
    </Disclosure>
  );
}
