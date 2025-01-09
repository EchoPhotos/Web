'use client';

import { HStack } from '@components/UI/Components';

export default function Banner({ icon, title, text }) {
  return (
    <div className={'rounded-lg bg-slate-100 p-5 text-red-400'}>
      <HStack className="items-center justify-between space-x-2">
        {icon}
        <div className="w-64 pl-4 text-slate-600">
          <h5 className="font-bold">{title}</h5>
          <p className="text-xs">{text}</p>
        </div>
      </HStack>
    </div>
  );
}
