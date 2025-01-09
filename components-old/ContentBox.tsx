import { ReactNode } from "react";

interface ContentBoxProps {
  left: boolean;
  imageURL: string;
  title: ReactNode;
  children: ReactNode;
}

export default function ContentBox({
  left,
  imageURL,
  title,
  children,
}: ContentBoxProps) {
  return (
    <div
      className={`flex ${
        left ? "md:flex-row-reverse" : "md:flex-row"
      } flex-col justify-center items-center mb-6 md:mb-0 `}
    >
      <div className="p-6 md:p-10 max-w-lg md:block">
        <h4 className="font-semibold">{title}</h4>
        {children}
      </div>

      <div className="p-6 max-w-lg">
        <img src={imageURL} />
      </div>
    </div>
  );
}
