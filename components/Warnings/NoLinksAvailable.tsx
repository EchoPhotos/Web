'use client';

import { HStack, VStack } from '@components/UI/Components';
import Disclosure from '@components/UI/Disclosure';
import { IoWarning } from 'react-icons/io5';

export default function NoLinksAvailable() {
  return (
    <Disclosure
      title={
        <HStack className="text-sm/6 font-medium">
          <IoWarning size={22} className="mr-2 text-red-500" />
          No download links available
        </HStack>
      }
    >
      <VStack>
        <p>This album has used all available download links.</p>
        <p className="mt-2">
          To create an updated download link, you will need to upgrade the album to premium.
        </p>
      </VStack>
    </Disclosure>
  );
}
