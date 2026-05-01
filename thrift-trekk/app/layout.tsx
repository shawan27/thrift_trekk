import type { Metadata, Viewport } from 'next'
import { Anton, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/lib/cart-context'
import { GrainOverlay } from '@/components/effects/grain'
import './globals.css'

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
})

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
})

const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-jb',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'THRIFT TREKK — Decide The Fashion',
  description: 'Premium baggy denim, wide-leg jeans & cargo. Built loud, worn louder. Free shipping above ₹1499.',
  generator: 'v0.app',
  keywords: 'baggy jeans, wide leg denim, streetwear india, cargo pants, thrift trekk',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${grotesk.variable} ${jbMono.variable} bg-background`}
    >
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        <CartProvider>
          {children}
        </CartProvider>
        <GrainOverlay />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
