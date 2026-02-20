'use client';

import { useState } from 'react';
import { Eye, EyeOff, Leaf, Lock, User } from 'lucide-react';

interface LoginOverlayProps {
  isOpen: boolean;
  onLogin: (username: string, password: string) => boolean;
}

export function LoginOverlay({ isOpen, onLogin }: LoginOverlayProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setError('');
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      const success = onLogin(username, password);
      if (!success) {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen) {
    console.log('LoginOverlay: isOpen is false, not rendering');
    return null;
  }

  console.log('LoginOverlay: Rendering with isOpen:', isOpen);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur - non-clickable to force login */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full animate-float" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent/10 rounded-full animate-drift" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary/5 rounded-full animate-pulse-glow" />
      </div>

      {/* Login Card */}
      <div 
        className="relative bg-card/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl w-full max-w-md p-8 animate-scale-pulse"
        onClick={handleCardClick}
      >
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 animate-pulse-glow">
            <Leaf className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to access your carbon footprint dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <User className="w-4 h-4" />
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground pr-12"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Secure access to your environmental dashboard</p>
        </div>
      </div>
    </div>
  );
}
