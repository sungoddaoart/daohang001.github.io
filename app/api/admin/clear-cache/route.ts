import { NextResponse } from 'next/server'
import { redis } from '@/lib/redis'

export async function POST() {
  try {
    await redis.flushall()
    return NextResponse.json({ message: 'Cache cleared successfully' })
  } catch (error) {
    console.error('Error clearing cache:', error)
    return NextResponse.json({ error: 'Failed to clear cache' }, { status: 500 })
  }
}

