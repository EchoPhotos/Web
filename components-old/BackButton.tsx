'use client';

import { ActionStyle } from '@components/UI/ButtonStyles';
import { Button } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

export default function BackButton({ children }) {
  const router = useRouter();
  return (
    <Button onClick={router.back} className="mt-4">
      <ActionStyle>
        <IoArrowBack />
        {children}
      </ActionStyle>
    </Button>
  );
}
