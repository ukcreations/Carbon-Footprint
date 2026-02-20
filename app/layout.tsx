import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AnimatedBackground } from '@/components/animated-background'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/contexts/auth-context'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'COUNT CARBON FOOTPRINT - Coal Mining Emissions Tracking',
  description: 'Advanced carbon footprint monitoring and prediction system for Indian coal mining industries. Track, predict, and reduce emissions with AI-powered insights.',
  generator: 'v0.app',
  keywords: 'carbon footprint, coal mining, emissions tracking, India, sustainability',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <AnimatedBackground />
            <Header />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
