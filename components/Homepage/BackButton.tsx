'use client';

import { Button } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

export default function BackButton({ children }) {
  const router = useRouter();
  return (
    <Button onClick={router.back} className="btn btn-primary mt-4">
      <IoArrowBack />
      {children}
    </Button>
  );
}
