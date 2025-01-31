import Image, { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

interface ContentBoxProps {
  left: boolean;
  image: StaticImageData;
  title: ReactNode;
  children: ReactNode;
}

export default function ContentBox({ left, image, title, children }: ContentBoxProps) {
  return (
    <div
      className={`flex ${
        left ? 'md:flex-row-reverse' : 'md:flex-row'
      } mb-6 flex-col items-center justify-center md:mb-0`}
    >
      <div className="max-w-lg p-6 md:block md:p-10">
        <h4 className="font-semibold">{title}</h4>
        {children}
      </div>

      <div className="max-w-lg p-6">
        <Image src={image} alt="Content image" />
      </div>
    </div>
  );
}
