'use client';

import { useState } from 'react';
import { HeroSection } from '@/components/hero-section';
import { EmissionsCalculator } from '@/components/emissions-calculator';
import { CalculatorResults } from '@/components/calculator-results';
import { EmissionResults } from '@/lib/emissions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Lightbulb, Leaf, BarChart3 } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { LoginOverlay } from '@/components/login-overlay';

export default function CalculatorPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const [results, setResults] = useState<EmissionResults | null>(null);

  const handleLogin = (username: string, password: string): boolean => {
    return login(username, password);
  };

  // Show login overlay if not authenticated
  if (!isAuthenticated || isLoading) {
    return <LoginOverlay isOpen={!isAuthenticated && !isLoading} onLogin={handleLogin} />;
  }

  const emissionFactors = [
    {
      icon: <Leaf className="h-6 w-6" />,
      name: 'Diesel',
      factor: '2.68 kg CO₂/L',
      description: 'Carbon dioxide from diesel fuel combustion in mining equipment',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      name: 'Electricity',
      factor: '0.65 kg CO₂/KWh',
      description: 'Grid-based emissions from electrical power usage (India average)',
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      name: 'Explosives',
      factor: '3.2 kg CO₂/Kg',
      description: 'Manufacturing and transport emissions from explosive usage',
    },
    {
      icon: <AlertCircle className="h-6 w-6" />,
      name: 'Methane',
      factor: '25 kg CO₂e/Ton',
      description: 'CO₂ equivalent with 25-year global warming potential',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Carbon Emissions Calculator"
        subtitle="Real-Time Calculation for Coal Mining"
        description="Input your mining activity data and instantly calculate your carbon emissions. Track, analyze, and reduce your environmental impact."
      />

      {/* Calculator Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Calculate Your Emissions</h2>
            <p className="text-lg text-muted-foreground">
              Enter your mining operation data to get real-time carbon emission calculations using industry-standard emission factors.
            </p>
          </div>

          <EmissionsCalculator onCalculate={setResults} showFactors={true} />
        </div>
      </section>

      {/* Emission Factors Information */}
      <section className="py-20 bg-card border-y border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Emission Factors Explained</h2>
            <p className="text-lg text-muted-foreground">
              These standardized factors convert activity data into CO₂ emissions, following international carbon accounting protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emissionFactors.map((factor, idx) => (
              <Card key={idx} className="bg-background border-border">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-primary">{factor.icon}</div>
                    <CardTitle className="text-lg">{factor.name}</CardTitle>
                  </div>
                  <CardDescription className="text-primary font-semibold">
                    {factor.factor}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{factor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      {results && (
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <CalculatorResults results={results} />
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Enter Activity Data',
                description:
                  'Input your coal mining activity metrics including diesel consumption, electricity usage, explosives, and methane emissions.',
              },
              {
                step: '2',
                title: 'Automatic Calculation',
                description:
                  'Our system calculates emissions using the formula: Emission = Activity Data × Emission Factor. Results are calculated in real-time.',
              },
              {
                step: '3',
                title: 'Analyze & Compare',
                description:
                  'View detailed breakdowns, visualizations, and gap analysis. Compare against targets and determine carbon credits needed.',
              },
            ].map((item, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground">
                  <span className="text-lg font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                question: 'What emission factors are used?',
                answer:
                  'We use internationally recognized emission factors based on IPCC guidelines, including standard factors for diesel (2.68 kg CO₂/L), electricity (0.65 kg CO₂/KWh for India grid), explosives (3.2 kg CO₂/Kg), and methane (25 kg CO₂e/ton with 25-year GWP).',
              },
              {
                question: 'How accurate are these calculations?',
                answer:
                  'Our calculations follow standard carbon accounting methodologies. However, actual emissions may vary based on equipment efficiency, operational conditions, and specific regional factors. We recommend regular audits and adjustments based on your actual operational data.',
              },
              {
                question: 'What are carbon credits?',
                answer:
                  'Carbon credits represent one ton of CO₂ equivalent emissions avoided or removed. If your emissions exceed your target, you can purchase verified carbon credits to offset the difference and meet environmental targets.',
              },
              {
                question: 'How can I reduce my emissions?',
                answer:
                  'Key strategies include: optimizing equipment efficiency, switching to renewable energy, reducing explosive usage, managing methane emissions through better ventilation, and implementing new low-carbon technologies in your mining operations.',
              },
            ].map((faq, idx) => (
              <Card key={idx} className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
