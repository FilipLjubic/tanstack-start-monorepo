import { cn } from '@starter/ui/utils';
import type { ComponentProps } from 'react';

export const LogoIcon = ({ className, ...props }: ComponentProps<'svg'>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-8', className)}
      aria-label="Logo"
      role="img"
      {...props}
    >
      <title>Logo</title>
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        className="fill-primary"
      />
      <path
        d="M2 17L12 22L22 17"
        className="stroke-primary"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12L12 17L22 12"
        className="stroke-primary"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
