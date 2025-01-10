import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Button({ icon, children, className, ...other }: ButtonProps) {
  return (
    <button
      className={`flex items-center gap-2 rounded-lg bg-[#0071e3] px-4 py-3 font-bold uppercase text-white hover:bg-[#0077ED] focus:bg-[#0077ED] ${className}`}
      {...other}
    >
      {icon ?? null}

      {children}
    </button>
  );
}
