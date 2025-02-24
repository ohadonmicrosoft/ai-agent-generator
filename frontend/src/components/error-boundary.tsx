'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-[400px] items-center justify-center p-6"
        >
          <div className="text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <h2 className="mb-2 text-2xl font-semibold">Something went wrong</h2>
            <p className="mb-4 text-muted-foreground">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <div className="space-x-4">
              <Button onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
              <Button variant="outline" onClick={this.handleReset}>
                Try Again
              </Button>
            </div>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
} 