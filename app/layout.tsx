import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navigation } from './components/Navigation'
import { SiteSettingsProvider } from '@/components/SiteSettingsProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DApp 目录',
  description: '探索去中心化应用的世界',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <SiteSettingsProvider>
        <body className={inter.className}>
          <Navigation />
          {children}
        </body>
      </SiteSettingsProvider>
    </html>
  )
}

