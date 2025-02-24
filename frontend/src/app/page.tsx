import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Sparkles, Shield, Zap, Code } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI Agent Creation',
    description: 'Build custom AI agents with our intuitive wizard interface',
  },
  {
    icon: Sparkles,
    title: 'Smart Prompts',
    description: 'Craft and optimize prompts with real-time AI feedback',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade security with role-based access control',
  },
  {
    icon: Code,
    title: 'API Integration',
    description: 'Seamlessly integrate AI agents into your applications',
  },
  {
    icon: Zap,
    title: 'Real-time Processing',
    description: 'Lightning-fast responses with optimized performance',
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <header className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-background" />
        <div className="container relative mx-auto flex min-h-screen items-center px-4">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold tracking-tight lg:text-7xl">
                  Create Powerful{' '}
                  <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                    AI Agents
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Build, deploy, and manage intelligent AI agents that transform your business operations.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 font-medium hover:bg-accent"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              {/* Add hero illustration or animation here */}
              <div className="relative h-full w-full rounded-lg bg-gradient-to-br from-primary/20 to-background p-8">
                <div className="absolute inset-0 bg-grid-white/10" />
                {/* Placeholder for interactive demo or animation */}
                <div className="relative rounded-lg border bg-card/50 p-4 backdrop-blur">
                  <code className="text-sm text-muted-foreground">
                    {`// Example AI Agent Configuration
{
  "name": "Customer Support Bot",
  "model": "GPT-4",
  "personality": "Professional",
  "capabilities": ["Chat", "Email", "Knowledge Base"]
}`}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Powerful Features</h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Everything you need to create and manage AI agents
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-xl border bg-card p-6 transition-all hover:shadow-lg"
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-accent/50">
        <div className="container mx-auto px-4 py-24">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold">Ready to get started?</h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Create your first AI agent in minutes
            </p>
            <Link
              href="/auth/signup"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
            >
              Start Building
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2024 AI Agent Generator. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 