'use client';

export function AnimatedDivider() {
  return (
    <div className="relative h-1 bg-gradient-to-r from-transparent via-primary to-transparent overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, transparent, hsl(160, 60%, 35%), hsl(160, 70%, 45%), transparent)',
          animation: 'wave 6s ease-in-out infinite',
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  );
}
