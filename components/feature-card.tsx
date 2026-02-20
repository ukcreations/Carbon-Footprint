'use client';

import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  details?: string[];
}

export function FeatureCard({ icon, title, description, details }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
      <div className="flex items-start gap-4">
        <div className="mt-1 flex-shrink-0 text-2xl text-primary">{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          {details && details.length > 0 && (
            <ul className="space-y-2">
              {details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
