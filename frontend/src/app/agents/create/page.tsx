import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    id: 'basic-info',
    name: 'Basic Information',
    fields: [
      {
        label: 'Agent Name',
        type: 'text',
        placeholder: 'e.g., Customer Support Assistant',
        required: true,
      },
      {
        label: 'Description',
        type: 'textarea',
        placeholder: 'Describe what your agent does...',
        required: true,
      },
    ],
  },
  {
    id: 'behavior',
    name: 'Agent Behavior',
    fields: [
      {
        label: 'Personality',
        type: 'select',
        options: ['Professional', 'Friendly', 'Technical', 'Casual'],
        required: true,
      },
      {
        label: 'Response Style',
        type: 'select',
        options: ['Concise', 'Detailed', 'Conversational'],
        required: true,
      },
    ],
  },
  {
    id: 'model-config',
    name: 'Model Configuration',
    fields: [
      {
        label: 'AI Model',
        type: 'select',
        options: ['GPT-4', 'GPT-3.5', 'Claude-2', 'Custom'],
        required: true,
      },
      {
        label: 'Temperature',
        type: 'range',
        min: 0,
        max: 1,
        step: 0.1,
        defaultValue: 0.7,
        required: true,
      },
    ],
  },
];

export default function CreateAgentPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <Link
          href="/agents"
          className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Agents
        </Link>
        <h1 className="text-4xl font-bold">Create New Agent</h1>
        <p className="text-xl text-muted-foreground">
          Configure your AI agent in a few simple steps
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold ${
                  index === 0
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted text-muted-foreground'
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="mx-2 h-1 w-16 bg-muted" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between px-2">
          {steps.map((step, index) => (
            <span
              key={step.id}
              className={`text-sm ${
                index === 0 ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {step.name}
            </span>
          ))}
        </div>
      </div>

      {/* Form Fields */}
      <div className="rounded-lg border bg-card p-6">
        <div className="space-y-6">
          {steps[0].fields.map((field) => (
            <div key={field.label} className="space-y-2">
              <label className="text-sm font-medium">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  className="w-full rounded-md border bg-background px-3 py-2"
                  placeholder={field.placeholder}
                  rows={4}
                />
              ) : (
                <input
                  type={field.type}
                  className="w-full rounded-md border bg-background px-3 py-2"
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <Link
            href="/agents"
            className="rounded-lg border px-4 py-2 hover:bg-accent"
          >
            Cancel
          </Link>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
            Next Step
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 