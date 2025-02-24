'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorMessage } from '@/components/ui/error-message';
import { ProtectedRoute } from '@/components/auth/protected-route';
import {
  Bot,
  Plus,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  model: string;
  status: 'active' | 'inactive' | 'error';
  lastActive: string;
  totalInteractions: number;
}

interface SortConfig {
  key: keyof Agent;
  direction: 'asc' | 'desc';
}

interface FilterConfig {
  status: string[];
  model: string[];
}

const ITEMS_PER_PAGE = 10;

// Sample data - replace with API call
const sampleAgents: Agent[] = Array.from({ length: 50 }, (_, i) => ({
  id: `agent-${i + 1}`,
  name: `Agent ${i + 1}`,
  description: `Description for Agent ${i + 1}`,
  model: i % 2 === 0 ? 'gpt-4' : 'gpt-3.5-turbo',
  status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'inactive' : 'error',
  lastActive: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  totalInteractions: Math.floor(Math.random() * 10000),
}));

export default function Agents() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<SortConfig>({ key: 'lastActive', direction: 'desc' });
  const [filters, setFilters] = useState<FilterConfig>({
    status: [],
    model: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setAgents(sampleAgents);
        setLoading(false);
      } catch (err) {
        setError('Failed to load agents');
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const filteredAgents = agents
    .filter((agent) => {
      const matchesSearch = agent.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = filters.status.length === 0 || filters.status.includes(agent.status);
      const matchesModel = filters.model.length === 0 || filters.model.includes(agent.model);

      return matchesSearch && matchesStatus && matchesModel;
    })
    .sort((a, b) => {
      const aValue = a[sort.key];
      const bValue = b[sort.key];
      const direction = sort.direction === 'asc' ? 1 : -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction * aValue.localeCompare(bValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction * (aValue - bValue);
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredAgents.length / ITEMS_PER_PAGE);
  const paginatedAgents = filteredAgents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (key: keyof Agent) => {
    setSort((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const toggleFilter = (type: keyof FilterConfig, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
    setCurrentPage(1);
  };

  if (loading) {
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
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Agents</h1>
          <Button onClick={() => router.push('/agents/create')}>
            <Plus className="mr-2 h-4 w-4" />
            Create Agent
          </Button>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-1 items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            {showFilters && (
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="mb-2 font-medium">Status</h3>
                  <div className="flex gap-2">
                    {['active', 'inactive', 'error'].map((status) => (
                      <Button
                        key={status}
                        variant={filters.status.includes(status) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleFilter('status', status)}
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">Model</h3>
                  <div className="flex gap-2">
                    {['gpt-4', 'gpt-3.5-turbo'].map((model) => (
                      <Button
                        key={model}
                        variant={filters.model.includes(model) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleFilter('model', model)}
                      >
                        {model}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-[1fr,1fr,auto,auto,auto] gap-4 border-b pb-2 font-medium">
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort('name')}
                >
                  Name
                  <ArrowUpDown className="h-4 w-4" />
                </button>
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort('model')}
                >
                  Model
                  <ArrowUpDown className="h-4 w-4" />
                </button>
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort('status')}
                >
                  Status
                  <ArrowUpDown className="h-4 w-4" />
                </button>
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort('lastActive')}
                >
                  Last Active
                  <ArrowUpDown className="h-4 w-4" />
                </button>
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort('totalInteractions')}
                >
                  Total Interactions
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </div>

              {paginatedAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="grid grid-cols-[1fr,1fr,auto,auto,auto] gap-4 rounded-lg border p-4 transition-colors hover:bg-accent"
                  onClick={() => router.push(`/agents/${agent.id}`)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <span>{agent.name}</span>
                  </div>
                  <div>{agent.model}</div>
                  <div>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        agent.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : agent.status === 'inactive'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {agent.status}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(agent.lastActive).toLocaleDateString()}
                  </div>
                  <div className="text-right">{agent.totalInteractions.toLocaleString()}</div>
                </div>
              ))}

              {paginatedAgents.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  No agents found matching your criteria
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t pt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredAgents.length)} of{' '}
                    {filteredAgents.length} agents
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
} 