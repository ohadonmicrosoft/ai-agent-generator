import React from 'react';
import Link from 'next/link';
import { Bot } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2">
      <div className="relative hidden md:block md:col-span-2 lg:col-span-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background">
          <div className="absolute inset-0 bg-grid-white/10" />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center p-8">
          <div className="mx-auto w-full max-w-xl space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome to AI Agent Generator
              </h1>
              <p className="text-muted-foreground">
                Create and manage powerful AI agents with ease
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border bg-card/50 p-4 backdrop-blur">
                <Bot className="mx-auto h-6 w-6 text-primary" />
                <h3 className="mt-2 font-semibold">Custom AI Agents</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Build agents tailored to your needs
                </p>
              </div>
              <div className="rounded-lg border bg-card/50 p-4 backdrop-blur">
                <Bot className="mx-auto h-6 w-6 text-primary" />
                <h3 className="mt-2 font-semibold">Smart Integration</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Seamless API and webhook support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg font-semibold"
            >
              <Bot className="h-5 w-5" />
              AI Agent Generator
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
} 