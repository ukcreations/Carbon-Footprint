'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/features' },
    { label: 'Calculator', href: '/calculator' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Impact', href: '/impact' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              CC
            </div>
            <span className="hidden sm:inline">COUNT CARBON</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-secondary'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-2">
            <Link
              href="/calculator"
              className="hidden sm:inline-flex px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Calculate
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
