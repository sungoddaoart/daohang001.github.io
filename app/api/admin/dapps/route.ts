import { NextResponse } from 'next/server'
import { dapps } from '../../../dapps'

export async function GET() {
  return NextResponse.json(dapps)
}

export async function POST(request: Request) {
  const newDapp = await request.json()
  newDapp.id = Math.max(...dapps.map(d => d.id)) + 1
  dapps.push(newDapp)
  return NextResponse.json(dapps)
}

