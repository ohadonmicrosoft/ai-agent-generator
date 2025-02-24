import React from 'react';
import {
  Bot,
  MessageSquare,
  Users,
  Activity,
  Zap,
  Clock,
  BarChart,
} from 'lucide-react';

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

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-xl text-muted-foreground">
          Overview of your AI agents and system performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    stat.change.startsWith('+')
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Activity Feed */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <button className="text-sm text-primary hover:underline">
              View all
            </button>
          </div>
          <div className="mt-6 space-y-6">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Performance Overview</h2>
            <button className="rounded-lg p-2 hover:bg-accent">
              <BarChart className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Response Time</span>
                  <span className="font-medium">0.8s</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div className="h-full w-[85%] rounded-full bg-primary" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Success Rate</span>
                  <span className="font-medium">98.5%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div className="h-full w-[98.5%] rounded-full bg-green-500" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Error Rate</span>
                  <span className="font-medium">1.5%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div className="h-full w-[1.5%] rounded-full bg-red-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 