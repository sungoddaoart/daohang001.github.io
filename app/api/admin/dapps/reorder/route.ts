import { NextResponse } from 'next/server'
import { dapps } from '../../../dapps'

export async function POST(request: Request) {
  const { id, direction } = await request.json()
  const index = dapps.findIndex(dapp => dapp.id === id)
  
  if (index === -1) {
    return NextResponse.json({ error: 'DApp not found' }, { status: 404 })
  }

  const newIndex = direction === 'up' ? Math.max(0, index - 1) : Math.min(dapps.length - 1, index + 1)
  
  if (index !== newIndex) {
    const [movedDapp] = dapps.splice(index, 1)
    dapps.splice(newIndex, 0, movedDapp)
  }

  return NextResponse.json(dapps)
}

