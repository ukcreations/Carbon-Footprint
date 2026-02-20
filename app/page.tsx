'use client';

import { useState } from 'react';
import { HeroSection } from '@/components/hero-section';
import { FeatureCard } from '@/components/feature-card';
import { StatCard } from '@/components/stat-card';
import { AnimatedDivider } from '@/components/animated-divider';
import { LoginOverlay } from '@/components/login-overlay';
import {
  Zap,
  TrendingDown,
  BarChart3,
  CheckCircle2,
  Leaf,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';

function HomeContent() {
  const { isAuthenticated, user, isLoading, login, logout } = useAuth();

  const handleLogin = (username: string, password: string) => {
    // Simple authentication - in real app, this would validate against a backend
    if (username === 'sneha' && password === 'sneha@2208') {
      login(username, password);
    }
  };

  const solutions = [
    {
      icon: <Zap />,
      title: 'Real-Time Monitoring',
      description:
        'Continuous tracking of excavation volume, equipment usage, and transportation to capture live emission data.',
    },
    {
      icon: <Leaf />,
      title: 'AI-Powered Prediction',
      description:
        'Advanced ML models predict future emissions based on operational patterns, enabling proactive emission management.',
    },
    {
      icon: <CheckCircle2 />,
      title: 'Gap Analysis & Credits',
      description:
        'Automatic calculation of emission gaps against targets and carbon credit assessments for regulatory compliance.',
    },
  ];

  const stats = [
    {
      label: 'Coal Mining Sites',
      value: '500+',
      icon: <Zap className="h-8 w-8" />,
    },
    {
      label: 'Daily Monitoring',
      value: '24/7',
      icon: <BarChart3 className="h-8 w-8" />,
    },
    {
      label: 'Emission Reduction',
      value: '40%',
      unit: 'potential',
      icon: <TrendingDown className="h-8 w-8" />,
    },
    {
      label: 'Accuracy Rate',
      value: '99.2%',
      icon: <CheckCircle2 className="h-8 w-8" />,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Login Overlay - Show when not authenticated */}
      <LoginOverlay isOpen={!isAuthenticated && !isLoading} onLogin={handleLogin} />

      {/* Main Content - Show when authenticated */}
      {isAuthenticated && (
        <>
          {/* User Info Bar */}
          <div className="fixed top-4 right-4 z-40 bg-card/95 backdrop-blur-sm border border-border rounded-lg px-4 py-2 flex items-center gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-foreground">Welcome, {user}</span>
            </div>
            <button
              onClick={logout}
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Hero Section */}
          <HeroSection
            title="Count Your Carbon Footprint"
            subtitle="Advanced Emission Tracking for Coal Mining"
            description="Real-time monitoring, AI-powered prediction, and gap analysis to help Indian coal mining industries reduce emissions and meet regulatory requirements."
            primaryCTA={{
              label: 'View Dashboard',
              href: '/dashboard',
            }}
            secondaryCTA={{
              label: 'Learn More',
              href: '/features',
            }}
          />

          {/* Solution Section */}
          <AnimatedDivider />
          <section className="py-20 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {solutions.map((solution, idx) => (
                  <FeatureCard
                    key={idx}
                    icon={solution.icon}
                    title={solution.title}
                    description={solution.description}
                  />
                ))}
              </div>
            </div>
          </section>
          <AnimatedDivider />

          {/* Stats Section */}
          <section className="py-20 bg-card border-y border-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Scale & Impact
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <StatCard
                    key={idx}
                    label={stat.label}
                    value={stat.value}
                    unit={stat.unit}
                    icon={stat.icon}
                  />
                ))}
              </div>
            </div>
          </section>
          <AnimatedDivider />

          {/* CTA Section */}
          <section className="py-20 bg-background">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Ready to Track & Reduce Emissions?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Explore our comprehensive dashboard, technical approach, and impact metrics to understand how COUNT CARBON helps reduce your carbon footprint.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/calculator"
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Calculate Emissions Now
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
                >
                  View Live Dashboard
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default function Home() {
  return <HomeContent />;
}
