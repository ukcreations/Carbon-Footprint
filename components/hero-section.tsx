'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-card py-20 sm:py-28 lg:py-32">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">{subtitle}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            {description}
          </p>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {primaryCTA && (
            <Link
              href={primaryCTA.href}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              {primaryCTA.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
            >
              {secondaryCTA.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
