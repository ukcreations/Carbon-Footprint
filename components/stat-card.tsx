'use client';

import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({ label, value, unit, icon, trend }: StatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-foreground">{value}</span>
            {unit && <span className="text-lg text-muted-foreground">{unit}</span>}
          </div>
        </div>
        {icon && <div className="text-primary">{icon}</div>}
      </div>

      {trend && (
        <div
          className={`inline-flex items-center gap-1 text-sm font-medium ${
            trend.isPositive ? 'text-green-400' : 'text-red-400'
          }`}
        >
          <span>{trend.isPositive ? '↑' : '↓'}</span>
          <span>{Math.abs(trend.value)}%</span>
        </div>
      )}
    </div>
  );
}
