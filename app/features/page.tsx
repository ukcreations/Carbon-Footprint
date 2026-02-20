'use client';

import { HeroSection } from '@/components/hero-section';
import { FeatureCard } from '@/components/feature-card';
import {
  Activity,
  Calculator,
  TrendingDown,
  Coins,
  BarChart3,
} from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Activity Tracking',
      description: 'Real-time monitoring of mining operations',
      details: [
        'Excavation volume tracking (m³/hour)',
        'Equipment usage and fuel consumption',
        'Transportation distance and load monitoring',
        'Worker activity and operational hours',
      ],
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: 'Advanced Carbon Calculation',
      description: 'Sophisticated emission computation',
      details: [
        'Formula: CO₂ = (Excavation × Factor₁) + (Fuel × Factor₂) + (Transport × Factor₃)',
        'Industry-specific emission factors',
        'Real-time calculation updates',
        'Multi-scope emissions (Scope 1, 2, 3)',
      ],
    },
    {
      icon: <TrendingDown className="w-6 h-6" />,
      title: 'Gap Analysis',
      description: 'Identify emission reduction opportunities',
      details: [
        'Compare actual vs target emissions',
        'Gap calculation: (Target - Actual) / Target × 100%',
        'Trend analysis and forecasting',
        'Optimization recommendations',
      ],
    },
    {
      icon: <Coins className="w-6 h-6" />,
      title: 'Carbon Credit System',
      description: 'Track and manage carbon credits',
      details: [
        'Automatic credit calculation',
        'Credit balance tracking',
        'Regulatory compliance reporting',
        'Carbon offset insights',
      ],
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Daily vs Predicted',
      description: 'Compare actual performance with predictions',
      details: [
        'Daily emission tracking',
        'ML-based prediction models',
        'Variance analysis and alerts',
        'Performance trending and insights',
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection
        title="Features"
        subtitle="Comprehensive Emission Management"
        description="Explore the powerful features that enable real-time monitoring, prediction, and optimization of carbon emissions for coal mining operations."
      />

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard
                key={idx}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                details={feature.details}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-t border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Key Metrics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg border border-border bg-background p-6">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-foreground font-semibold mb-2">Continuous Monitoring</p>
              <p className="text-sm text-muted-foreground">
                Real-time data collection without interruption
              </p>
            </div>

            <div className="rounded-lg border border-border bg-background p-6">
              <div className="text-4xl font-bold text-primary mb-2">{'<'}1s</div>
              <p className="text-foreground font-semibold mb-2">Data Processing</p>
              <p className="text-sm text-muted-foreground">
                Instant calculation and analysis of emissions
              </p>
            </div>

            <div className="rounded-lg border border-border bg-background p-6">
              <div className="text-4xl font-bold text-primary mb-2">99.2%</div>
              <p className="text-foreground font-semibold mb-2">Accuracy Rate</p>
              <p className="text-sm text-muted-foreground">
                Highly accurate emission predictions
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
