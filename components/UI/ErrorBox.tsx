'use client';

export default function ErrorBox({ error }: { error: Error }) {
  return <div className="flex h-full flex-col items-center justify-center">{error.message}</div>;
}
