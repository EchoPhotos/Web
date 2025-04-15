'use client';

import { VStack } from '@components/UI/Components';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <VStack className="h-full w-full items-center justify-center space-y-3">
      <h1 className="text-4xl font-black">Oops 😵‍💫</h1>
      <h2 className="text-lg">Something went wrong!</h2>
      <button className="btn btn-primary" onClick={() => reset()}>
        Try again
      </button>
    </VStack>
  );
}
