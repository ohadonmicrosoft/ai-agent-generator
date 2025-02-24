'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
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

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.email}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="bg-background p-4 rounded-lg border border-border">
              <h3 className="font-medium mb-2">Quick Actions</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/agents/new" className="text-primary hover:underline">
                    Create New Agent
                  </a>
                </li>
                <li>
                  <a href="/prompts" className="text-primary hover:underline">
                    Manage Prompts
                  </a>
                </li>
              </ul>
            </div>

            {/* Recent Activity */}
            <div className="bg-background p-4 rounded-lg border border-border">
              <h3 className="font-medium mb-2">Recent Activity</h3>
              <p className="text-muted-foreground">No recent activity</p>
            </div>

            {/* System Status */}
            <div className="bg-background p-4 rounded-lg border border-border">
              <h3 className="font-medium mb-2">System Status</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 