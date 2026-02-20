'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  calculateEmissions,
  EmissionInputs,
  EmissionResults,
  EMISSION_FACTORS,
} from '@/lib/emissions';
import { Info, Download } from 'lucide-react';
import { ExportButton } from '@/components/export-button';
import { ExportData } from '@/lib/export-utils';

interface EmissionsCalculatorProps {
  onCalculate?: (results: EmissionResults) => void;
  showFactors?: boolean;
}

export function EmissionsCalculator({ onCalculate, showFactors = true }: EmissionsCalculatorProps) {
  const [inputs, setInputs] = useState<EmissionInputs>({
    diesel: 0,
    electricity: 0,
    explosives: 0,
    methane: 0,
  });

  const [results, setResults] = useState<EmissionResults | null>(null);
  const [error, setError] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof EmissionInputs, value: string) => {
    const numValue = parseFloat(value) || 0;

    if (numValue < 0) {
      setError('Values cannot be negative');
      return;
    }

    setError('');
    setInputs((prev) => ({
      ...prev,
      [field]: numValue,
    }));
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    try {
      const calculatedResults = calculateEmissions(inputs);
      setResults(calculatedResults);
      onCalculate?.(calculatedResults);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during calculation');
      setResults(null);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setInputs({
      diesel: 0,
      electricity: 0,
      explosives: 0,
      methane: 0,
    });
    setResults(null);
    setError('');
  };

  const getExportData = (): ExportData | null => {
    if (!results) return null;
    return {
      type: 'calculator',
      timestamp: new Date().toISOString(),
      data: results,
    };
  };

  const inputFields = [
    {
      id: 'diesel',
      label: 'Diesel Consumption',
      unit: 'Litres',
      factor: EMISSION_FACTORS.diesel,
      placeholder: 'Enter diesel litres',
      value: inputs.diesel,
    },
    {
      id: 'electricity',
      label: 'Electricity Consumption',
      unit: 'KWh',
      factor: EMISSION_FACTORS.electricity,
      placeholder: 'Enter electricity KWh',
      value: inputs.electricity,
    },
    {
      id: 'explosives',
      label: 'Explosives Usage',
      unit: 'Kg',
      factor: EMISSION_FACTORS.explosives,
      placeholder: 'Enter explosives kg',
      value: inputs.explosives,
    },
    {
      id: 'methane',
      label: 'Methane Emissions',
      unit: 'Tons',
      factor: EMISSION_FACTORS.methane,
      placeholder: 'Enter methane tons',
      value: inputs.methane,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Carbon Emissions Calculator</CardTitle>
          <CardDescription>
            Enter your coal mining activity data to calculate carbon emissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields.map((field) => (
              <div key={field.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor={field.id} className="text-sm font-medium">
                    {field.label}
                  </Label>
                  {showFactors && (
                    <div
                      className="flex items-center gap-1 text-xs text-muted-foreground cursor-help"
                      title={`Emission factor: ${field.factor} kg CO₂/${field.unit}`}
                    >
                      <Info className="h-3 w-3" />
                      <span>{field.factor} kg CO₂/{field.unit}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    id={field.id}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder={field.placeholder}
                    value={field.value === 0 ? '' : field.value}
                    onChange={(e) => handleInputChange(field.id as keyof EmissionInputs, e.target.value)}
                    className="flex-1 bg-input border-border"
                  />
                  <span className="flex items-center px-3 text-sm text-muted-foreground bg-card border border-border rounded-md">
                    {field.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleCalculate}
              disabled={isCalculating}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              {isCalculating ? 'Calculating...' : 'Calculate Emissions'}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1 border-border hover:bg-card"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Display */}
      {results && (
        <Card className="border-primary/50 bg-card">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Emissions Calculation Results</CardTitle>
              {getExportData() && <ExportButton data={getExportData()!} />}
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Total Emissions */}
            <div className="bg-background rounded-lg p-6 border border-border">
              <p className="text-muted-foreground text-sm mb-2">Total Carbon Emissions</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">
                  {results.total.toFixed(2)}
                </span>
                <span className="text-xl text-muted-foreground">kg CO₂</span>
              </div>
              {results.total >= 1000 && (
                <p className="text-xs text-muted-foreground mt-2">
                  = {(results.total / 1000).toFixed(2)} tons CO₂
                </p>
              )}
            </div>

            {/* Emissions Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Emission Breakdown</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Diesel', value: results.diesel },
                    { label: 'Electricity', value: results.electricity },
                    { label: 'Explosives', value: results.explosives },
                    { label: 'Methane', value: results.methane },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center p-3 bg-background rounded border border-border">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className="font-semibold text-foreground">
                        {item.value.toFixed(2)} kg CO₂
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Percentage Breakdown */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Contribution %</h4>
                <div className="space-y-3">
                  {results.breakdown.map((item) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-semibold">{item.percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-border">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Information Notice */}
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-xs text-foreground">
                These calculations are based on standard emission factors. Actual emissions may vary based on specific operational conditions and equipment efficiency.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
