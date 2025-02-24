'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Bot, Shield, Zap, Code, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: 'AI Agent Creation',
      description: 'Build custom AI agents with our intuitive wizard interface',
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'Smart Prompts',
      description: 'Craft and optimize prompts with real-time AI feedback',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Enterprise Security',
      description: 'Bank-grade security with role-based access control',
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: 'API Integration',
      description: 'Seamlessly integrate AI agents into your applications',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background pb-16 pt-24">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
              Create Powerful{' '}
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                AI Agents
              </span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Build, deploy, and manage intelligent AI agents that transform your business operations.
              Get started in minutes with our intuitive platform.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group"
                onClick={() => router.push('/signup')}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Get Started
                <motion.span
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push('/signin')}
              >
                Sign In
              </Button>
            </div>
          </motion.div>

          {/* Code Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-lg border bg-card/50 backdrop-blur"
          >
            <pre className="overflow-x-auto p-6">
              <code className="text-sm text-foreground/80">
                {`// Example AI Agent Configuration
{
  "name": "Customer Support Bot",
  "model": "GPT-4",
  "personality": "Professional",
  "capabilities": [
    "Chat",
    "Email",
    "Knowledge Base"
  ]
}`}
              </code>
            </pre>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-1/2 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">Powerful Features</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full transition-transform hover:scale-105">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="mb-2 font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-24">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mb-8 text-muted-foreground">
            Create your first AI agent in minutes. No credit card required.
          </p>
          <Button
            size="lg"
            onClick={() => router.push('/signup')}
            className="group"
          >
            Create Your First Agent
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>
    </div>
  );
} 