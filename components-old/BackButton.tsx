'use client';

import Button from './Button';
import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

export default function BackButton({ children }) {
  const router = useRouter();
  return (
    <Button onClick={router.back} className="mt-4">
      <IoArrowBack />
      {children}
    </Button>
  );
}
