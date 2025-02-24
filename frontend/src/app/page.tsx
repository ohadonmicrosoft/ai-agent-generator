'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  Bot,
  Shield,
  Code,
  Sparkles,
  Star,
  Check,
  ExternalLink,
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const features: Feature[] = [
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

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    role: 'CTO at TechCorp',
    content: 'The AI Agent Generator has transformed how we handle customer support. Our response times have improved by 80%.',
    avatar: '/avatars/sarah.jpg',
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager',
    content: 'Setting up AI agents was incredibly easy. The interface is intuitive and the results are impressive.',
    avatar: '/avatars/michael.jpg',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Customer Success Lead',
    content: 'Our team loves how customizable the agents are. We\'ve created specialized agents for different use cases.',
    avatar: '/avatars/emily.jpg',
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$49',
    period: 'per month',
    description: 'Perfect for small teams getting started with AI',
    features: [
      '3 AI Agents',
      '1,000 requests per month',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    price: '$99',
    period: 'per month',
    description: 'For growing businesses needing more power',
    features: [
      'Unlimited AI Agents',
      '10,000 requests per month',
      'Advanced analytics',
      'Priority support',
      'Custom prompts library',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'per month',
    description: 'For large organizations with specific needs',
    features: [
      'Unlimited everything',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantees',
      'On-premise deployment',
    ],
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

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

      {/* Interactive Demo Section */}
      <section className="border-t py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">See it in Action</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Watch how easy it is to create and deploy an AI agent. Our
                intuitive interface guides you through the process.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Step 1: Configure Your Agent</h3>
                    <p className="text-muted-foreground">
                      Choose from pre-built templates or start from scratch
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-lg border bg-card p-2">
              <div className="aspect-video overflow-hidden rounded-lg">
                {/* Add demo video or interactive preview */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Powerful Features
          </h2>
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

      {/* Testimonials Section */}
      <section className="border-t py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Trusted by Industry Leaders
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <Star className="absolute -left-1 -top-1 h-6 w-6 text-yellow-400 opacity-15" />
                      <p className="text-muted-foreground">
                        "{testimonial.content}"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="border-t py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Simple, Transparent Pricing
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={cn(
                    'relative overflow-hidden',
                    plan.popular && 'border-primary shadow-lg'
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -right-12 top-6 rotate-45 bg-primary px-12 py-1 text-sm text-primary-foreground">
                      Popular
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="ml-2 text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-8 w-full"
                      variant={plan.popular ? 'default' : 'outline'}
                      onClick={() => router.push('/signup')}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
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

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="mb-4 text-sm font-semibold">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2024 AI Agent Generator. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 