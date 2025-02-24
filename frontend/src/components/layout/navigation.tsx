'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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