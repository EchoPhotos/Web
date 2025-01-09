import { ReactNode } from 'react';

interface FeatureSectionProps {
  title: string;
  description: string;
  sectionId: string;
  children: ReactNode;
}

export default function FeatureSection({ title, description, sectionId, children }: FeatureSectionProps) {  
  return (
      <section id={sectionId} className="py-24">
        <div className="m-auto container max-w-6xl lg:p-0 md:px-16">
          <div className="text-center pb-10">
            <h2 className="font-bold mb-4">{title}</h2>

            <p className="text-neutral-500 px-6">
              {description}
            </p>
          </div>
          {children}
        </div>
      </section>
  );
}
