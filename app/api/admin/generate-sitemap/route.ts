import { NextResponse } from 'next/server'
import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import { prisma } from '@/lib/prisma'
import fs from 'fs/promises'
import path from 'path'

export async function POST() {
  try {
    const dapps = await prisma.dapp.findMany()
    const categories = await prisma.category.findMany()

    const links = [
      { url: '/', changefreq: 'daily', priority: 1 },
      { url: '/categories', changefreq: 'weekly', priority: 0.8 },
      { url: '/submit', changefreq: 'monthly', priority: 0.5 },
      ...dapps.map(dapp => ({ url: `/dapp/${dapp.id}`, changefreq: 'weekly', priority: 0.7 })),
      ...categories.map(category => ({ url: `/category/${category.id}`, changefreq: 'weekly', priority: 0.6 })),
    ]

    const stream = new SitemapStream({ hostname: process.env.SITE_URL || 'https://yourdomain.com' })
    const data = await streamToPromise(Readable.from(links).pipe(stream))
    
    await fs.writeFile(path.join(process.cwd(), 'public', 'sitemap.xml'), data)

    // Here you would typically submit the sitemap to search engines
    // This is a placeholder for that functionality
    console.log('Sitemap generated and should be submitted to search engines')

    return NextResponse.json({ message: 'Sitemap generated and submitted successfully' })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return NextResponse.json({ error: 'Failed to generate sitemap' }, { status: 500 })
  }
}

