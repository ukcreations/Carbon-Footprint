'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { StatCard } from '@/components/stat-card';
import { AlertCircle, TrendingUp, TrendingDown, Leaf } from 'lucide-react';
import { ExportButton } from '@/components/export-button';
import { ExportData, RealtimeData } from '@/lib/export-utils';
import { useAuth } from '@/contexts/auth-context';
import { LoginOverlay } from '@/components/login-overlay';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const router = useRouter();

  const handleLogin = (username: string, password: string): boolean => {
    return login(username, password);
  };

  // Show login overlay if not authenticated
  if (!isAuthenticated || isLoading) {
    return <LoginOverlay isOpen={!isAuthenticated && !isLoading} onLogin={handleLogin} />;
  }
  // Daily emissions data
  const dailyData = [
    { day: 'Mon', actual: 450, predicted: 480, target: 400 },
    { day: 'Tue', actual: 520, predicted: 510, target: 400 },
    { day: 'Wed', actual: 480, predicted: 500, target: 400 },
    { day: 'Thu', actual: 510, predicted: 490, target: 400 },
    { day: 'Fri', actual: 560, predicted: 540, target: 400 },
    { day: 'Sat', actual: 380, predicted: 420, target: 400 },
    { day: 'Sun', actual: 350, predicted: 380, target: 400 },
  ];

  // Monthly trends
  const monthlyData = [
    { month: 'Jan', emissions: 12400, credits: 8200 },
    { month: 'Feb', emissions: 13200, credits: 7800 },
    { month: 'Mar', emissions: 11800, credits: 8600 },
    { month: 'Apr', emissions: 14300, credits: 7200 },
    { month: 'May', emissions: 13100, credits: 8900 },
    { month: 'Jun', emissions: 12800, credits: 8500 },
  ];

  // Source breakdown
  const sourceData = [
    { name: 'Excavation', value: 45, color: '#1a5f3f' },
    { name: 'Equipment', value: 30, color: '#2d9d5e' },
    { name: 'Transportation', value: 20, color: '#4db877' },
    { name: 'Other', value: 5, color: '#7ec9a3' },
  ];

  // Prediction accuracy
  const accuracyData = [
    { week: 'W1', actual: 3200, predicted: 3180, diff: 20 },
    { week: 'W2', actual: 3450, predicted: 3420, diff: 30 },
    { week: 'W3', actual: 3100, predicted: 3080, diff: 20 },
    { week: 'W4', actual: 3350, predicted: 3400, diff: -50 },
  ];

  const stats = [
    {
      label: 'Today\'s Emissions',
      value: '485 tons',
      icon: <TrendingUp className="h-8 w-8" />,
      trend: { value: 8, isPositive: false },
    },
    {
      label: 'Week Average',
      value: '470 tons',
      icon: <Leaf className="h-8 w-8" />,
      trend: { value: 5, isPositive: true },
    },
    {
      label: 'Carbon Credits',
      value: '8,200',
      icon: <TrendingDown className="h-8 w-8" />,
      trend: { value: 12, isPositive: true },
    },
    {
      label: 'Emission Gap',
      value: '18.5%',
      icon: <AlertCircle className="h-8 w-8" />,
      trend: { value: 3, isPositive: false },
    },
  ];

  const getExportData = (): ExportData => {
    const realtimeData: RealtimeData = {
      dailyData,
      monthlyData,
      sourceData,
      accuracyData,
      stats,
    };

    return {
      type: 'realtime',
      timestamp: new Date().toISOString(),
      data: realtimeData,
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Real-Time Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Live monitoring and prediction of carbon emissions
            </p>
          </div>
          <ExportButton data={getExportData()} />
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <StatCard
              key={idx}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily vs Predicted */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Daily Emissions vs Predicted</CardTitle>
              <CardDescription>
                Actual vs ML predicted emissions with target baseline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  actual: {
                    label: 'Actual',
                    color: 'hsl(160 60% 35%)',
                  },
                  predicted: {
                    label: 'Predicted',
                    color: 'hsl(160 80% 50%)',
                  },
                  target: {
                    label: 'Target',
                    color: 'hsl(45 93% 62%)',
                  },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 25%)" />
                    <XAxis dataKey="day" stroke="hsl(0 0% 70%)" />
                    <YAxis stroke="hsl(0 0% 70%)" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="hsl(160 60% 35%)"
                      name="Actual"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="hsl(160 80% 50%)"
                      name="Predicted"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="hsl(45 93% 62%)"
                      name="Target"
                      strokeWidth={2}
                      strokeDasharray="8 4"
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Emission Sources */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Emissions by Source</CardTitle>
              <CardDescription>
                Breakdown of CO₂ emissions by activity type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: { label: 'Percentage', color: 'hsl(160 60% 35%)' },
                }}
                className="h-80 flex items-center justify-center"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `${value}%`}
                      contentStyle={{
                        backgroundColor: 'hsl(160 25% 8%)',
                        border: '1px solid hsl(160 20% 25%)',
                        borderRadius: '8px',
                        color: 'hsl(0 0% 95%)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trends */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
              <CardDescription>
                Emissions and carbon credits over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  emissions: {
                    label: 'Emissions (tons)',
                    color: 'hsl(0 84.2% 60.2%)',
                  },
                  credits: {
                    label: 'Credits Earned',
                    color: 'hsl(160 60% 35%)',
                  },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(0 84.2% 60.2%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(0 84.2% 60.2%)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(160 60% 35%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(160 60% 35%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 25%)" />
                    <XAxis dataKey="month" stroke="hsl(0 0% 70%)" />
                    <YAxis stroke="hsl(0 0% 70%)" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="emissions"
                      stroke="hsl(0 84.2% 60.2%)"
                      fillOpacity={1}
                      fill="url(#colorEmissions)"
                      name="Emissions (tons)"
                    />
                    <Area
                      type="monotone"
                      dataKey="credits"
                      stroke="hsl(160 60% 35%)"
                      fillOpacity={1}
                      fill="url(#colorCredits)"
                      name="Credits Earned"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Prediction Accuracy */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Prediction Accuracy</CardTitle>
              <CardDescription>
                Model accuracy vs actual emissions (weekly)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  actual: {
                    label: 'Actual',
                    color: 'hsl(160 60% 35%)',
                  },
                  predicted: {
                    label: 'Predicted',
                    color: 'hsl(160 80% 50%)',
                  },
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={accuracyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(160 20% 25%)" />
                    <XAxis dataKey="week" stroke="hsl(0 0% 70%)" />
                    <YAxis stroke="hsl(0 0% 70%)" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar
                      dataKey="actual"
                      fill="hsl(160 60% 35%)"
                      name="Actual Emissions"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar
                      dataKey="predicted"
                      fill="hsl(160 80% 50%)"
                      name="Predicted Emissions"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Alerts and Status */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Alerts & Status</CardTitle>
            <CardDescription>
              Current system alerts and operational status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">Emission Limit Exceeded</h4>
                  <p className="text-sm text-muted-foreground">
                    Current day emissions (485 tons) exceed target (400 tons) by 21.25%
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">High Variance Detected</h4>
                  <p className="text-sm text-muted-foreground">
                    Equipment usage shows 15% deviation from predicted pattern
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <AlertCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">System Healthy</h4>
                  <p className="text-sm text-muted-foreground">
                    All sensors operational, data quality: 99.2%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
