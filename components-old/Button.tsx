import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Button({
  icon,
  children,
  className,
  ...other
}: ButtonProps) {
  return (
    <button
      className={`
      text-white rounded-lg font-bold py-3 px-4 uppercase
      flex gap-2 items-center bg-[#0071e3] hover:bg-[#0077ED]
      focus:bg-[#0077ED] ${className}`}
      {...other}
    >
      {icon ?? null}

      {children}
    </button>
  );
}
