'use client';

import PanelView from '@components/UI/PanelView';
import { SloganResolution } from '@components/UI/Slogans';
import { HStack, VStack } from '@components/UI/Components';
import { IoArrowDownCircle, IoPersonAdd, IoStar } from 'react-icons/io5';
import Link from 'next/link';

export default function Page() {
  return (
    <PanelView panelConent={<SloganResolution />}>
      <VStack className="h-full w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center rounded-full bg-yellow-100 p-4">
          <IoStar size={44} className="text-yellow-400" />
        </div>

        <div className="p-6 text-2xl font-bold">Premium Albums</div>

        <VStack className="max-w-xs space-y-4 text-sm">
          <p className="text-center text-lg">
            For a limited time, you can unlock the premium features of Echo Photos at no cost.
          </p>

          <HStack className="flex items-center space-x-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100">
              <IoStar className="text-purple-400" />
            </div>
            <span>Unlimited storage of original photo and video quality</span>
          </HStack>

          <HStack className="flex items-center space-x-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
              <IoPersonAdd className="text-green-400" />
            </div>
            <span>Unlimited members per album</span>
          </HStack>

          <HStack className="flex items-center space-x-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100">
              <IoArrowDownCircle className="text-yellow-400" />
            </div>
            <span>Unlimited download links</span>
          </HStack>
        </VStack>

        <div className="mt-4 flex justify-end">
          <Link className="btn btn-primary" href="/albums/new">
            Create new album
          </Link>
        </div>
      </VStack>
    </PanelView>
  );
}
