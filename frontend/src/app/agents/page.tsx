'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorMessage } from '@/components/ui/error-message';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Plus,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Clock,
  Settings,
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

const ITEMS_PER_PAGE = 8;

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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
    case 'inactive':
      return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
    case 'error':
      return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
  }
};

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
                className={showFilters ? 'bg-secondary' : ''}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters {showFilters ? '(Active)' : ''}
              </Button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
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
                            className={filters.status.includes(status) ? getStatusColor(status) : ''}
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
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {paginatedAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Card 
                  className="h-full cursor-pointer transition-all hover:shadow-lg"
                  onClick={() => router.push(`/agents/${agent.id}`)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1.5">
                        <CardTitle className="flex items-center gap-2">
                          <Bot className="h-5 w-5" />
                          {agent.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {agent.description}
                        </p>
                      </div>
                      <Badge className={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <MessageSquare className="h-4 w-4" />
                          {agent.totalInteractions.toLocaleString()} interactions
                        </span>
                        <Badge variant="outline">{agent.model}</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Last active: {new Date(agent.lastActive).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredAgents.length > ITEMS_PER_PAGE && (
          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredAgents.length)} of {filteredAgents.length} agents
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? 'bg-primary text-primary-foreground' : ''}
                  >
                    {page}
                  </Button>
                ))}
              </div>
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
    </ProtectedRoute>
  );
} 