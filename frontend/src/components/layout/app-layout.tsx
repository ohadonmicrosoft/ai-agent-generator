'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from './navigation';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main
        className={cn(
          'min-h-screen transition-all duration-200 ease-in-out md:pl-[240px]',
          pathname === '/' && 'md:pl-0'
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className="container mx-auto p-6"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
} 