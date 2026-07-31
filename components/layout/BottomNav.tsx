"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Utensils, ReceiptText, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();

  // Hide BottomNav on onboarding and auth pages
  const hiddenRoutes = ['/', '/login', '/register'];
  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Meals', href: '/meals', icon: Utensils },
    { name: 'Bazaar', href: '/bazaar', icon: ReceiptText },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-6 left-4 right-4 z-50">
      <div className="flex items-center justify-around px-2 py-3 rounded-3xl
        bg-white/70 dark:bg-stone-900/60 
        backdrop-blur-2xl backdrop-saturate-150 
        border border-white/40 dark:border-white/10 
        shadow-xl shadow-black/10 dark:shadow-black/30"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-16 h-12 transition-all duration-300"
            >
              {/* Active Indicator Glow */}
              {isActive && (
                <div className="absolute inset-0 bg-primary/10 rounded-2xl -z-10 mix-blend-screen" />
              )}
              
              <Icon
                className={cn(
                  "w-6 h-6 mb-1 transition-all duration-300",
                  isActive 
                    ? "text-primary drop-shadow-[0_0_8px_rgba(249,115,22,0.5)] scale-110" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span 
                className={cn(
                  "text-[10px] font-medium transition-all duration-300",
                  isActive ? "text-primary opacity-100" : "text-muted-foreground opacity-70"
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
