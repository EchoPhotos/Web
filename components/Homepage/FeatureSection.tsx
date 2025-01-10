import { ReactNode } from 'react';

interface FeatureSectionProps {
  title: string;
  description: string;
  sectionId: string;
  children: ReactNode;
}

export default function FeatureSection({
  title,
  description,
  sectionId,
  children,
}: FeatureSectionProps) {
  return (
    <section id={sectionId} className="py-24">
      <div className="container m-auto max-w-6xl md:px-16 lg:p-0">
        <div className="pb-10 text-center">
          <h2 className="mb-4 font-bold">{title}</h2>

          <p className="px-6 text-neutral-500">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
