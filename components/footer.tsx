'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                CC
              </div>
              <span className="font-bold text-foreground">COUNT CARBON</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering coal mining industries to reduce carbon footprint through advanced monitoring and prediction.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/technical" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Technical
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/feasibility" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Feasibility
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Impact
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <p className="text-sm text-muted-foreground mb-2">
              For inquiries and support
            </p>
            <p className="text-sm text-primary font-medium">
              info@countcarbon.com
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8">
          <p className="text-sm text-muted-foreground text-center">
            © 2025 COUNT CARBON FOOTPRINT. All rights reserved. | SIH Idea Submission
          </p>
        </div>
      </div>
    </footer>
  );
}
