import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes safely: `cn('p-4 bg-card', isActive && 'bg-primary', className)`. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
