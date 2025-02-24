import React from 'react';
import { MessageSquare, Plus, Search, Tag } from 'lucide-react';

const prompts = [
  {
    id: '1',
    title: 'Customer Greeting',
    content: 'You are a friendly customer service representative...',
    category: 'Customer Service',
    tags: ['greeting', 'support'],
    lastModified: '2 hours ago',
  },
  {
    id: '2',
    title: 'Technical Support Response',
    content: 'You are a technical support specialist helping users...',
    category: 'Technical Support',
    tags: ['technical', 'troubleshooting'],
    lastModified: '1 day ago',
  },
  {
    id: '3',
    title: 'Sales Inquiry Handler',
    content: 'You are a sales representative helping potential customers...',
    category: 'Sales',
    tags: ['sales', 'inquiry'],
    lastModified: '3 days ago',
  },
];

const categories = [
  'All Prompts',
  'Customer Service',
  'Technical Support',
  'Sales',
  'Marketing',
];

export default function PromptsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Prompt Library</h1>
          <p className="text-xl text-muted-foreground">
            Create and manage your AI prompts
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
          <Plus className="h-5 w-5" />
          Create Prompt
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 shrink-0 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search prompts..."
              className="w-full rounded-md border bg-background pl-10 pr-4 py-2"
            />
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">Categories</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="grid gap-6">
            {prompts.map((prompt) => (
              <div
                key={prompt.id}
                className="rounded-xl border bg-card p-6 text-card-foreground shadow transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{prompt.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {prompt.content.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <div className="flex gap-2">
                    {prompt.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Category: {prompt.category}
                  </span>
                  <span className="text-muted-foreground">
                    Modified: {prompt.lastModified}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 