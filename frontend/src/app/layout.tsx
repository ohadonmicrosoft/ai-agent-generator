import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/components/theme-provider';
import { AppLayout } from '@/components/layout/app-layout';
import { ErrorBoundary } from '@/components/error-boundary';
import './globals.css';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Agent Generator',
  description: 'Build, deploy, and manage intelligent AI agents that transform your business operations.',
  icons: {
    icon: '/favicon.ico',
  },
};

const publicRoutes = ['/', '/signin', '/signup'];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              {isPublicRoute ? (
                children
              ) : (
                <AppLayout>{children}</AppLayout>
              )}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 5000,
                  style: {
                    background: 'var(--background)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--border)',
                  },
                }}
              />
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
} 