'use client';

import { HeroSection } from '@/components/hero-section';
import { FeatureCard } from '@/components/feature-card';
import { TrendingDown, Users, Leaf, DollarSign } from 'lucide-react';

export default function ImpactPage() {
  const socialImpact = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Health',
      description: 'Reduced air pollution benefits local communities',
      details: [
        'Lower particulate matter emissions',
        'Improved respiratory health outcomes',
        'Enhanced quality of life for nearby residents',
        'Community trust and engagement',
      ],
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: 'Environmental Justice',
      description: 'Fair distribution of environmental benefits',
      details: [
        'Equitable pollution reduction',
        'Indigenous community involvement',
        'Transparent reporting mechanisms',
        'Long-term sustainability commitment',
      ],
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Employment Opportunities',
      description: 'Green jobs and workforce development',
      details: [
        'Training in clean technologies',
        'Career advancement in sustainability',
        'Competitive compensation',
        'Safe working conditions',
      ],
    },
  ];

  const economicBenefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Cost Savings',
      description: 'Operational efficiency improvements',
      details: [
        'Reduced energy consumption: ₹500K-1M annually',
        'Optimized equipment usage',
        'Lower compliance penalties',
        'Operational efficiency gains',
      ],
    },
    {
      icon: <TrendingDown className="w-6 h-6" />,
      title: 'Carbon Credit Revenue',
      description: 'Monetization of emission reductions',
      details: [
        'Carbon credit trading: ₹2-5M annually',
        'Premium market access',
        'Regulatory compliance benefits',
        'ESG rating improvements',
      ],
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Investment Appeal',
      description: 'Enhanced financial performance',
      details: [
        'Improved ESG ratings',
        'Access to green finance',
        'Higher valuation multiples',
        'Investor confidence boost',
      ],
    },
  ];

  const environmentalBenefits = [
    {
      icon: <Leaf className="w-6 h-6" />,
      title: 'Emission Reduction',
      description: 'Significant CO₂ footprint decrease',
      details: [
        '40% potential emission reduction',
        '50,000+ tons CO₂ saved annually',
        'Contribution to climate goals',
        'Net zero pathway',
      ],
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: 'Biodiversity Protection',
      description: 'Ecosystem conservation efforts',
      details: [
        'Reduced mining impact',
        'Habitat restoration support',
        'Water quality improvement',
        'Soil conservation measures',
      ],
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: 'Climate Action',
      description: 'Contribution to global sustainability',
      details: [
        'SDG alignment (Goal 13)',
        'Paris Agreement compliance',
        'Industry leadership',
        'Global benchmark setting',
      ],
    },
  ];

  const stats = [
    { label: 'Annual CO₂ Reduction Potential', value: '50,000+', unit: 'tons' },
    { label: 'Operational Cost Savings', value: '₹1M+', unit: 'annually' },
    { label: 'Carbon Credit Revenue', value: '₹2-5M', unit: 'annually' },
    { label: 'Environmental Impact Score', value: '9.2', unit: '/10' },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection
        title="Impact & Benefits"
        subtitle="Social, Economic & Environmental Outcomes"
        description="Discover the comprehensive positive impact of COUNT CARBON on communities, economies, and the environment."
      />

      {/* Social Impact */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Social Impact
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Improving quality of life and creating sustainable opportunities for communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialImpact.map((item, idx) => (
              <FeatureCard
                key={idx}
                icon={item.icon}
                title={item.title}
                description={item.description}
                details={item.details}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Economic Benefits */}
      <section className="py-20 bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Economic Benefits
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Creating financial value while meeting sustainability objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {economicBenefits.map((item, idx) => (
              <FeatureCard
                key={idx}
                icon={item.icon}
                title={item.title}
                description={item.description}
                details={item.details}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Benefits */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Environmental Benefits
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advancing climate action and ecosystem preservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {environmentalBenefits.map((item, idx) => (
              <FeatureCard
                key={idx}
                icon={item.icon}
                title={item.title}
                description={item.description}
                details={item.details}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 bg-card border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Impact Metrics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-background p-6 text-center">
                <p className="text-sm font-medium text-muted-foreground mb-4">
                  {stat.label}
                </p>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-primary">{stat.value}</span>
                  <span className="text-lg text-muted-foreground ml-2">{stat.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alignment with Global Goals */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Global Alignment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'UN SDG 13',
                subtitle: 'Climate Action',
                description: 'Contributing to global climate change mitigation efforts',
              },
              {
                title: 'UN SDG 7',
                subtitle: 'Affordable Clean Energy',
                description: 'Promoting efficient energy use in mining operations',
              },
              {
                title: 'UN SDG 8',
                subtitle: 'Decent Work',
                description: 'Creating sustainable employment opportunities',
              },
              {
                title: 'UN SDG 12',
                subtitle: 'Responsible Consumption',
                description: 'Promoting sustainable resource management',
              },
              {
                title: 'UN SDG 15',
                subtitle: 'Life on Land',
                description: 'Protecting terrestrial ecosystems',
              },
              {
                title: 'Paris Agreement',
                subtitle: 'Net Zero 2050',
                description: 'Supporting global net-zero emission targets',
              },
            ].map((goal, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">{goal.title}</h3>
                <p className="text-sm font-medium text-foreground mb-2">{goal.subtitle}</p>
                <p className="text-sm text-muted-foreground">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
