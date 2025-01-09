import { PropsWithChildren } from 'react';

export default function Section({ children, title }: PropsWithChildren<{ title: string }>) {
  return (
    <section>
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-4 font-bold">{title}</h1>
        {children}
      </div>
    </section>
  );
}
