import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SOC 2 Timing for Startups: Know Exactly When to Start | Gosure',
  description: 'Free tool tells early-stage startups the exact best month to start SOC 2 compliance. Avoid wasting $50K+ and 6 months. Get your timeline in 60 seconds.',
  generator: 'v0.app',
  openGraph: {
    title: 'Free SOC 2 Timing Calculator for Startups | Gosure',
    description: 'Know exactly when your startup should start SOC 2. Takes 60 seconds.',
    url: 'https://gosure.online',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SOC 2 Timing Calculator for Startups | Gosure',
    description: 'Know exactly when your startup should start SOC 2. Takes 60 seconds.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
