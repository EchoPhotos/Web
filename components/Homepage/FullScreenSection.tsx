import { ReactNode } from 'react';

interface FullscreenSectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export default function FullscreenSection({ id, children, className }: FullscreenSectionProps) {
  return (
    <section id={id} className={`flex min-h-screen items-center justify-center ${className}`}>
      {children}
    </section>
  );
}
