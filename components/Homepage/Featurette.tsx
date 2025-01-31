import { ReactNode } from 'react';

interface FeatureProps {
  icon: ReactNode;
  title: string;
  big?: boolean;
  titleClassName?: string;
  children: ReactNode;
}

export default function Featurette({ icon, title, children, big, titleClassName }: FeatureProps) {
  return big ? (
    <div className="flex items-center justify-center gap-4 p-6 md:justify-start">
      <h3>{icon}</h3>
      <div>
        <h5 className={`font-semibold ${titleClassName}`}>{title}</h5>
        {children}
      </div>
    </div>
  ) : (
    <div>
      <h5
        className={`flex items-center justify-center gap-2 font-semibold md:justify-start ${titleClassName}`}
      >
        <div className="text-2xl">{icon}</div>

        {title}
      </h5>

      <p className="font-xs">{children}</p>
    </div>
  );
}
