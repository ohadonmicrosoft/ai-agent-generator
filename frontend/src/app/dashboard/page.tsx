'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { useAuth } from '@/contexts/AuthContext';
import React, { useState, useEffect } from 'react';
import {
  Bot,
  MessageSquare,
  Users,
  Activity,
  Zap,
  Clock,
  BarChart,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart } from '@/components/ui/charts/line-chart';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorMessage } from '@/components/ui/error-message';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumb } from '@/components/ui/breadcrumb';

const stats = [
  {
    name: 'Total Agents',
    value: '24',
    change: '+4',
    icon: Bot,
    description: 'Active AI agents',
  },
  {
    name: 'Total Interactions',
    value: '12.5k',
    change: '+2.3k',
    icon: MessageSquare,
    description: 'Messages processed',
  },
  {
    name: 'Active Users',
    value: '1.2k',
    change: '+180',
    icon: Users,
    description: 'Users this month',
  },
  {
    name: 'Response Time',
    value: '0.8s',
    change: '-0.2s',
    icon: Clock,
    description: 'Average response time',
  },
];

const recentActivity = [
  {
    id: '1',
    type: 'agent_created',
    title: 'New Agent Created',
    description: 'Customer Support Bot v2',
    timestamp: '2 hours ago',
    icon: Bot,
  },
  {
    id: '2',
    type: 'high_traffic',
    title: 'High Traffic Alert',
    description: 'Sales Assistant experiencing increased load',
    timestamp: '4 hours ago',
    icon: Activity,
  },
  {
    id: '3',
    type: 'performance',
    title: 'Performance Improvement',
    description: 'Response time reduced by 20%',
    timestamp: '1 day ago',
    icon: Zap,
  },
];

// Sample chart data - replace with real data fetching
const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Agent Usage',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyticsData, setAnalyticsData] = useState(chartData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setAnalyticsData(chartData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'create-agent':
        router.push('/agents/create');
        break;
      case 'view-messages':
        router.push('/messages');
        break;
      case 'analytics':
        router.push('/analytics');
        break;
      case 'team-settings':
        router.push('/settings/team');
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} className="m-4" />;
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.name}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Chart Section */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <LineChart data={analyticsData} />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-4"
                    >
                      <div className="rounded-full bg-background p-2">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activity.timestamp}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <button
                className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-accent"
                onClick={() => handleQuickAction('create-agent')}
              >
                <Bot className="h-5 w-5" />
                <span>Create New Agent</span>
              </button>
              <button
                className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-accent"
                onClick={() => handleQuickAction('view-messages')}
              >
                <MessageSquare className="h-5 w-5" />
                <span>View Messages</span>
              </button>
              <button
                className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-accent"
                onClick={() => handleQuickAction('analytics')}
              >
                <BarChart className="h-5 w-5" />
                <span>Analytics</span>
              </button>
              <button
                className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-accent"
                onClick={() => handleQuickAction('team-settings')}
              >
                <Users className="h-5 w-5" />
                <span>Team Settings</span>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
} 