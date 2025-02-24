'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Home,
  Bot,
  MessageSquare,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Search,
  Bell,
  Command,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Agents', href: '/agents', icon: Bot },
  { label: 'Prompts', href: '/prompts', icon: MessageSquare },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Agent Created',
      message: 'Your AI agent "Customer Support" is ready.',
      time: '5m ago',
    },
    {
      id: 2,
      title: 'Prompt Updated',
      message: 'Changes to "Sales Bot" prompt were saved.',
      time: '1h ago',
    },
  ]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        className="fixed left-4 top-4 z-50 h-10 w-10 p-2 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Navigation Sidebar */}
      <motion.nav
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 240,
          transition: { duration: 0.2 },
        }}
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex flex-col border-r bg-background',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Toggle Button */}
        <Button
          variant="ghost"
          className="absolute -right-4 top-4 hidden h-8 w-8 p-1.5 md:flex"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="h-4 w-4" />
          </motion.div>
        </Button>

        {/* Logo */}
        <div className="flex h-16 items-center px-4">
          <motion.span
            className="font-semibold"
            animate={{ opacity: isCollapsed ? 0 : 1 }}
          >
            AI Agent Generator
          </motion.span>
        </div>

        {/* Top Actions */}
        <div className="flex items-center justify-end gap-2 px-4 py-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden rounded bg-muted px-2 py-0.5 text-xs md:inline">
              ⌘K
            </kbd>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {notifications.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {notifications.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start gap-1 p-4"
                >
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {notification.message}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {notification.time}
                  </div>
                </DropdownMenuItem>
              ))}
              {notifications.length === 0 && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No new notifications
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-1 flex-col gap-2 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <motion.a
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-4 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className={cn('h-5 w-5', isActive && 'text-inherit')} />
                <motion.span
                  animate={{
                    opacity: isCollapsed ? 0 : 1,
                    width: isCollapsed ? 0 : 'auto',
                  }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
                {isActive && (
                  <motion.div
                    className="absolute inset-y-0 left-0 w-1 rounded-full bg-primary"
                    layoutId="activeTab"
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </motion.a>
            );
          })}
        </div>

        {/* User Section */}
        <div className="border-t p-4">
          <div className="flex items-center gap-4">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
            >
              {user?.displayName?.[0] || user?.email?.[0] || '?'}
            </div>
            <motion.div
              animate={{
                opacity: isCollapsed ? 0 : 1,
                width: isCollapsed ? 0 : 'auto',
              }}
              className="overflow-hidden"
            >
              <p className="truncate text-sm font-medium">
                {user?.displayName || user?.email}
              </p>
            </motion.div>
          </div>
          <Button
            variant="ghost"
            className="mt-4 w-full justify-start gap-4"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <motion.span
              animate={{
                opacity: isCollapsed ? 0 : 1,
                width: isCollapsed ? 0 : 'auto',
              }}
              className="overflow-hidden whitespace-nowrap"
            >
              Sign Out
            </motion.span>
          </Button>
        </div>
      </motion.nav>

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="max-w-2xl">
          <div className="flex items-center gap-2 border-b pb-4">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search agents, prompts, or settings..."
              className="border-0 focus-visible:ring-0"
              autoFocus
            />
            <kbd className="rounded bg-muted px-2 py-1 text-xs">ESC</kbd>
          </div>
          <div className="mt-4">
            <h4 className="mb-2 text-sm font-medium">Recent Searches</h4>
            {/* Add recent searches here */}
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
} 