'use client';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, hsl(160, 60%, 35%, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, hsl(160, 70%, 45%, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, hsl(45, 93%, 62%, 0.05) 0%, transparent 50%)
          `,
          animation: 'gradient-shift 15s ease infinite',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl opacity-20 animate-float" />
      <div
        className="absolute top-1/3 right-20 w-40 h-40 bg-accent rounded-full blur-3xl opacity-15"
        style={{ animation: 'drift 12s ease-in-out infinite' }}
      />
      <div
        className="absolute bottom-20 left-1/4 w-36 h-36 rounded-full blur-3xl opacity-10"
        style={{
          background: 'hsl(45, 93%, 62%)',
          animation: 'float 8s ease-in-out infinite 2s',
        }}
      />

      {/* Animated grid lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        style={{ animation: 'pulse-glow 6s ease-in-out infinite' }}
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="hsl(160, 60%, 35%)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `fade-in-out ${3 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            boxShadow: '0 0 8px hsl(160, 60%, 35%)',
          }}
        />
      ))}

      {/* Subtle wave animation */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 opacity-5"
        style={{
          background: 'linear-gradient(to right, hsl(160, 60%, 35%), hsl(160, 70%, 45%), hsl(160, 60%, 35%))',
          animation: 'wave 10s linear infinite',
          backgroundSize: '200% 100%',
        }}
      />

      {/* Center glow orb */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl"
        style={{
          background: 'hsl(160, 60%, 35%)',
          opacity: 0.05,
          animation: 'scale-pulse 6s ease-in-out infinite',
        }}
      />
    </div>
  );
}
