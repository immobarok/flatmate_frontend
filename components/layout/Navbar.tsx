"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();

  // Hide Navbar on onboarding and auth pages
  const hiddenRoutes = ['/', '/login', '/register'];
  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Meals', href: '/meals' },
    { name: 'Bazaar', href: '/bazaar' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 
      bg-white/70 dark:bg-stone-950/60 backdrop-blur-2xl backdrop-saturate-150"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo - visible on both mobile and desktop */}
        <Link 
          href="/" 
          className="text-2xl font-black tracking-tighter hover:scale-105 transition-transform"
        >
          <span className="text-foreground">FLAT</span>
          <span className="text-primary drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]">MATE</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-semibold transition-colors duration-200",
                  isActive 
                    ? "text-primary drop-shadow-[0_0_4px_rgba(249,115,22,0.5)]" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA / Profile */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="px-5 py-2 text-sm font-semibold bg-primary text-white rounded-full transition-all duration-300 hover:bg-orange-500 hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] active:scale-95"
          >
            Login
          </Link>
        </div>
        
        {/* Mobile Spacer (Keeps logo centered or handles right side if needed later) */}
        <div className="md:hidden w-8" />
      </div>
    </header>
  );
}
