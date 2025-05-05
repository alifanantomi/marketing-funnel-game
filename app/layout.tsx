import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'From Buzz to Buy | Entrepreneurial Simulation Game',
  description:
    '"From Buzz to Buy" is an interactive entrepreneurial simulation game that guides players through strategic marketing, budgeting, and risk management decisions to launch a successful product.',
  keywords: [
    'entrepreneurship game',
    'business simulation',
    'marketing strategy game',
    'startup simulation',
    'product launch game',
    'educational business game',
    'From Buzz to Buy',
  ],
  authors: [{ name: 'Nabila Ariani', url: 'https://marketing-funnel-game.vercel.app' }],
  creator: 'Nabila Ariani',
  openGraph: {
    title: 'From Buzz to Buy | Entrepreneurial Simulation Game',
    description:
      'Play "From Buzz to Buy" — an interactive business simulation where you navigate startup challenges through smart marketing, budgeting, and risk decisions.',
    url: 'https://marketing-funnel-game.vercel.app',
    siteName: 'From Buzz to Buy',
    type: 'website',
    images: [
      {
        url: '/images/mille-happi.png',
        width: 1200,
        height: 630,
        alt: 'From Buzz to Buy Game Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Buzz to Buy',
    description:
      'An interactive entrepreneurial simulation game for learning business strategy, marketing, and risk management.',
    images: ['/images/mille-happi'],
    creator: '',
  },
  metadataBase: new URL('https://marketing-funnel-game.vercel.app'),
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/mille-happi.png" />
      </head>
      <body>
        {children}
        </body>
    </html>
  )
}
