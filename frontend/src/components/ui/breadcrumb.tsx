'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbProps {
  className?: string;
  separator?: React.ReactNode;
  homeHref?: string;
}

export function Breadcrumb({
  className,
  separator = <ChevronRight className="h-4 w-4" />,
  homeHref = '/',
}: BreadcrumbProps) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center space-x-2 text-sm', className)}
    >
      <Link
        href={homeHref}
        className="flex items-center text-muted-foreground hover:text-foreground"
      >
        <Home className="h-4 w-4" />
      </Link>

      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}`;
        const isLast = index === segments.length - 1;
        const label = segment
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        return (
          <Fragment key={href}>
            <span
              className="flex items-center text-muted-foreground"
              aria-hidden="true"
            >
              {separator}
            </span>
            <Link
              href={href}
              aria-current={isLast ? 'page' : undefined}
              className={cn(
                'transition-colors hover:text-foreground',
                isLast
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {label}
            </Link>
          </Fragment>
        );
      })}
    </nav>
  );
} 