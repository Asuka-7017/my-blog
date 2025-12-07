import type { Metadata } from 'next'
import Link from 'next/link'
import {
  WEBSITE_NAME,
  WEBSITE_DESCRIPTION,
  WEBSITE_URL,
  AUTHOR,
} from '@/lib/getEnvVar'
import { Geist, Geist_Mono } from 'next/font/google'
import Menu from '@/components/menu'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: WEBSITE_NAME,
    template: `%s | ${WEBSITE_NAME}`,
  },
  description: WEBSITE_DESCRIPTION,
  openGraph: {
    title: {
      default: WEBSITE_NAME,
      template: `%s | ${WEBSITE_NAME}`,
    },
  },
  alternates: {
    canonical: WEBSITE_URL,
    types: {
      'application/rss+xml': [{ url: '/Feed.xml', title: 'RSS Feed' }],
    },
  },
  metadataBase: new URL(WEBSITE_URL),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="w-full h-20 relative flex items-center justify-center py-4 px-8 border-b">
          <Link href="/" className="text-3xl flex items-center font-bold">
            {WEBSITE_NAME}
          </Link>
          <nav>
            <Menu />
          </nav>
        </header>
        {children}
        <footer className="w-full h-20 flex items-center justify-center px-8 py-4 border-t">
          {`Copyright ${new Date().getFullYear()} ${AUTHOR}`}
        </footer>
      </body>
    </html>
  )
}
