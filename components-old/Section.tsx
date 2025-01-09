import { PropsWithChildren } from 'react';

export default function Section({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  return (
    <section>
      <div className="container max-w-6xl mx-auto py-10 px-4">
        <h1 className="font-bold mb-4">{title}</h1>
        {children}
      </div>
    </section>
  );
}
