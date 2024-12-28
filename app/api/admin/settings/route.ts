import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const settings = await prisma.siteSettings.findFirst()
  return NextResponse.json(settings)
}

export async function POST(request: Request) {
  const newSettings = await request.json()
  const updatedSettings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: newSettings,
    create: newSettings,
  })
  return NextResponse.json(updatedSettings)
}

