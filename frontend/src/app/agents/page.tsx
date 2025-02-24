import React from 'react';
import Link from 'next/link';
import { Bot, Plus, Settings, Trash2 } from 'lucide-react';

const agents = [
  {
    id: '1',
    name: 'Customer Support Bot',
    description: 'Handles customer inquiries and support tickets',
    status: 'active',
    lastActive: '2 hours ago',
  },
  {
    id: '2',
    name: 'Sales Assistant',
    description: 'Helps with product recommendations and sales queries',
    status: 'active',
    lastActive: '5 hours ago',
  },
  {
    id: '3',
    name: 'Data Analyst Bot',
    description: 'Analyzes data and generates reports',
    status: 'inactive',
    lastActive: '1 day ago',
  },
];

export default function AgentsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">AI Agents</h1>
          <p className="text-xl text-muted-foreground">
            Manage and monitor your AI agents
          </p>
        </div>
        <Link
          href="/agents/create"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-5 w-5" />
          Create Agent
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="rounded-xl border bg-card p-6 text-card-foreground shadow transition-all hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{agent.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {agent.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 font-medium ${
                  agent.status === 'active'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                }`}
              >
                {agent.status}
              </span>
              <span className="text-muted-foreground">
                Last active: {agent.lastActive}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
              <button
                className="rounded-lg p-2 text-destructive hover:bg-destructive/10"
                title="Delete"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 