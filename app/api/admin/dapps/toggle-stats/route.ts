import { NextResponse } from 'next/server'
import { dapps } from '../../../dapps'

export async function POST(request: Request) {
  const { id } = await request.json()
  const dapp = dapps.find(d => d.id === id)
  
  if (!dapp) {
    return NextResponse.json({ error: 'DApp not found' }, { status: 404 })
  }

  dapp.showStats = !dapp.showStats

  return NextResponse.json(dapps)
}

