import { NextResponse } from 'next/server'
import { dapps } from '../../../../dapps'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const updatedDapp = await request.json()
  const index = dapps.findIndex(d => d.id === id)
  
  if (index !== -1) {
    dapps[index] = { ...dapps[index], ...updatedDapp }
    return NextResponse.json(dapps)
  }
  
  return NextResponse.json({ error: 'DApp not found' }, { status: 404 })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const index = dapps.findIndex(d => d.id === id)
  
  if (index !== -1) {
    dapps.splice(index, 1)
    return NextResponse.json(dapps)
  }
  
  return NextResponse.json({ error: 'DApp not found' }, { status: 404 })
}

