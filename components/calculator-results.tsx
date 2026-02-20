'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { EmissionResults, GapAnalysis, calculateGapAnalysis } from '@/lib/emissions';
import { AlertCircle, TrendingDown, Target, Award } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ExportButton } from '@/components/export-button';
import { ExportData } from '@/lib/export-utils';

interface CalculatorResultsProps {
  results: EmissionResults;
}

export function CalculatorResults({ results }: CalculatorResultsProps) {
  const [targetEmissions, setTargetEmissions] = useState(1000);
  const [carbonSequestration, setCarbonSequestration] = useState(200);
  const [gapAnalysis, setGapAnalysis] = useState<GapAnalysis | null>(null);
  const [showGapAnalysis, setShowGapAnalysis] = useState(false);

  const handleCalculateGap = () => {
    const analysis = calculateGapAnalysis(results.total, targetEmissions, carbonSequestration);
    setGapAnalysis(analysis);
    setShowGapAnalysis(true);
  };

  const getExportData = (): ExportData => ({
    type: 'calculator',
    timestamp: new Date().toISOString(),
    data: results,
    gapAnalysis: gapAnalysis || undefined,
  });

  // Chart colors - using primary color scheme
  const colors = ['#22c55e', '#86efac', '#dcfce7', '#f0fdf4'];

  // Prepare chart data
  const chartData = results.breakdown.map((item) => ({
    name: item.label,
    value: parseFloat(item.value.toFixed(2)),
  }));

  return (
    <div className="space-y-6">
      {/* Visualization Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Emissions Visualization</CardTitle>
              <CardDescription>View your emissions data in different formats</CardDescription>
            </div>
            <ExportButton data={getExportData()} />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pie" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-background border border-border">
              <TabsTrigger value="pie" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Pie Chart
              </TabsTrigger>
              <TabsTrigger value="bar" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Bar Chart
              </TabsTrigger>
            </TabsList>

            {/* Pie Chart */}
            <TabsContent value="pie" className="h-96 flex items-center justify-center mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#22c55e"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${(value as number).toFixed(2)} kg CO₂`}
                    contentStyle={{
                      backgroundColor: 'var(--background)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </TabsContent>

            {/* Bar Chart */}
            <TabsContent value="bar" className="h-96 flex items-center justify-center mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="var(--muted-foreground)"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip
                    formatter={(value) => `${(value as number).toFixed(2)} kg CO₂`}
                    contentStyle={{
                      backgroundColor: 'var(--background)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="var(--primary)"
                    radius={[8, 8, 0, 0]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Gap Analysis Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Gap Analysis & Carbon Credits
          </CardTitle>
          <CardDescription>
            Compare your emissions against targets and calculate carbon credits needed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input for Gap Analysis Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-background rounded-lg border border-border">
            <div className="space-y-2">
              <Label htmlFor="target-emissions" className="text-sm font-medium">
                Target Monthly Emissions (kg CO₂)
              </Label>
              <Input
                id="target-emissions"
                type="number"
                min="0"
                value={targetEmissions}
                onChange={(e) => setTargetEmissions(parseFloat(e.target.value) || 0)}
                className="bg-card border-border"
              />
              <p className="text-xs text-muted-foreground">
                Your desired maximum emissions for this period
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="carbon-sequestration" className="text-sm font-medium">
                Carbon Sequestration Capacity (kg CO₂)
              </Label>
              <Input
                id="carbon-sequestration"
                type="number"
                min="0"
                value={carbonSequestration}
                onChange={(e) => setCarbonSequestration(parseFloat(e.target.value) || 0)}
                className="bg-card border-border"
              />
              <p className="text-xs text-muted-foreground">
                CO₂ offset capacity from your operations
              </p>
            </div>
          </div>

          <Button
            onClick={handleCalculateGap}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Calculate Gap Analysis
          </Button>

          {/* Gap Analysis Results */}
          {showGapAnalysis && gapAnalysis && (
            <div className="space-y-4">
              {/* Status Indicator */}
              <div
                className={`p-4 rounded-lg border ${
                  gapAnalysis.status === 'above'
                    ? 'bg-destructive/10 border-destructive'
                    : gapAnalysis.status === 'below'
                      ? 'bg-primary/10 border-primary'
                      : 'bg-accent/10 border-accent'
                }`}
              >
                <div className="flex items-start gap-3">
                  {gapAnalysis.status === 'above' ? (
                    <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-semibold text-foreground">
                      {gapAnalysis.status === 'above'
                        ? 'Emissions Above Target'
                        : gapAnalysis.status === 'below'
                          ? 'Emissions Below Target'
                          : 'Emissions On Target'}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your emissions are{' '}
                      <span className="font-semibold">
                        {Math.abs(gapAnalysis.gapPercentage).toFixed(1)}%
                      </span>{' '}
                      {gapAnalysis.status === 'above' ? 'above' : 'below'} your target
                    </p>
                  </div>
                </div>
              </div>

              {/* Gap Analysis Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-background border-border">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground text-sm mb-2">Total Emissions</p>
                    <p className="text-2xl font-bold text-foreground">
                      {gapAnalysis.totalEmissions.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">kg CO₂</p>
                  </CardContent>
                </Card>

                <Card className="bg-background border-border">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground text-sm mb-2">Target Emissions</p>
                    <p className="text-2xl font-bold text-foreground">
                      {gapAnalysis.targetEmissions.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">kg CO₂</p>
                  </CardContent>
                </Card>

                <Card className="bg-background border-border">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground text-sm mb-2">Carbon Sequestration</p>
                    <p className="text-2xl font-bold text-foreground">
                      {gapAnalysis.carbonSequestration.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">kg CO₂</p>
                  </CardContent>
                </Card>

                <Card className="bg-background border-border">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground text-sm mb-2">Emission Gap</p>
                    <p className="text-2xl font-bold text-foreground">
                      {gapAnalysis.gap.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">kg CO₂</p>
                  </CardContent>
                </Card>
              </div>

              {/* Carbon Credits Section */}
              {gapAnalysis.carbonCreditsNeeded > 0 && (
                <Card className="bg-accent/10 border border-accent">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Award className="h-6 w-6 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Carbon Credits Required</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          You need{' '}
                          <span className="font-bold text-accent">
                            {gapAnalysis.carbonCreditsNeeded.toFixed(3)}
                          </span>{' '}
                          carbon credits (1 credit = 1 ton CO₂) to offset your excess emissions.
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Carbon credits can be purchased through verified carbon credit markets or offset programs.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
