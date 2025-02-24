import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

const variantClasses = {
  default: 'text-muted-foreground',
  primary: 'text-primary',
  secondary: 'text-secondary',
};

export function LoadingSpinner({
  size = 'md',
  variant = 'default',
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      className={cn('flex items-center justify-center', className)}
    >
      <Loader2
        className={cn(
          'animate-spin',
          sizeClasses[size],
          variantClasses[variant]
        )}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
} 