import React from 'react';
import {
  Bell,
  Key,
  Moon,
  Palette,
  Shield,
  Sun,
  User,
  Zap,
} from 'lucide-react';

const sections = [
  {
    id: 'profile',
    title: 'Profile Settings',
    icon: User,
    description: 'Manage your account information and preferences',
    fields: [
      {
        label: 'Name',
        type: 'text',
        value: 'John Doe',
      },
      {
        label: 'Email',
        type: 'email',
        value: 'john@example.com',
      },
    ],
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: Palette,
    description: 'Customize the look and feel of your workspace',
    fields: [
      {
        label: 'Theme',
        type: 'theme-toggle',
      },
      {
        label: 'Sidebar Position',
        type: 'select',
        options: ['Left', 'Right'],
        value: 'Left',
      },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    description: 'Configure how you want to be notified',
    fields: [
      {
        label: 'Email Notifications',
        type: 'checkbox',
        checked: true,
      },
      {
        label: 'Push Notifications',
        type: 'checkbox',
        checked: false,
      },
    ],
  },
  {
    id: 'api',
    title: 'API Settings',
    icon: Key,
    description: 'Manage your API keys and access tokens',
    fields: [
      {
        label: 'API Key',
        type: 'password',
        value: '••••••••••••••••',
      },
      {
        label: 'Webhook URL',
        type: 'text',
        value: 'https://api.example.com/webhook',
      },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    icon: Shield,
    description: 'Manage your security preferences',
    fields: [
      {
        label: 'Two-Factor Authentication',
        type: 'toggle',
        enabled: false,
      },
      {
        label: 'Session Timeout',
        type: 'select',
        options: ['30 minutes', '1 hour', '4 hours', '24 hours'],
        value: '4 hours',
      },
    ],
  },
  {
    id: 'performance',
    title: 'Performance',
    icon: Zap,
    description: 'Optimize your AI agent performance',
    fields: [
      {
        label: 'Response Cache',
        type: 'toggle',
        enabled: true,
      },
      {
        label: 'Concurrent Requests',
        type: 'select',
        options: ['1', '2', '5', '10'],
        value: '5',
      },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Settings</h1>
        <p className="text-xl text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid gap-8">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.id}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {section.fields.map((field) => (
                  <div key={field.label} className="flex items-center justify-between">
                    <label className="text-sm font-medium">{field.label}</label>
                    {field.type === 'theme-toggle' ? (
                      <div className="flex items-center gap-2 rounded-lg border p-1">
                        <button className="rounded-md p-2 hover:bg-accent">
                          <Sun className="h-4 w-4" />
                        </button>
                        <button className="rounded-md p-2 hover:bg-accent">
                          <Moon className="h-4 w-4" />
                        </button>
                      </div>
                    ) : field.type === 'toggle' || field.type === 'checkbox' ? (
                      <button
                        className={`relative h-6 w-11 rounded-full transition-colors ${
                          field.enabled || field.checked
                            ? 'bg-primary'
                            : 'bg-muted'
                        }`}
                      >
                        <span
                          className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                            field.enabled || field.checked
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          }`}
                        />
                      </button>
                    ) : field.type === 'select' ? (
                      <select className="rounded-md border bg-background px-3 py-1 text-sm">
                        {field.options?.map((option) => (
                          <option key={option} selected={option === field.value}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        className="rounded-md border bg-background px-3 py-1 text-sm"
                        value={field.value}
                        readOnly
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 