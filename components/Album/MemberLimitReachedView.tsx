'use client';

import { SizeAdapted, VStack } from '@components/UI/Components';
import React, { useContext } from 'react';
import { IoPersonAddOutline } from 'react-icons/io5';
import { PremiumButton } from './PremiumButton';
import { AlbumContext } from 'provider/AlbumProvider';

export default function MemberLimitReachedView() {
  var album = useContext(AlbumContext);

  return (
    <VStack className="h-full items-center justify-center p-4 text-center">
      <VStack className="items-center justify-between space-y-2 p-8">
        <SizeAdapted
          className="h-full w-full"
          desktop={<IoPersonAddOutline size={166} className="w-full text-slate-400" />}
          mobile={<IoPersonAddOutline size={44} className="w-full text-slate-400" />}
        />
        <h1 className="text-2xl font-semibold">Member limit reached</h1>
        <div className="pt-4">This album has reached the limit of members.</div>
        <div>Upgrade to premium in order to increase the member limit.</div>
      </VStack>
      <PremiumButton album={album} />
    </VStack>
  );
}
