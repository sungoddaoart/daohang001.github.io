import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File
  const type: string | null = data.get('type') as string

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const fileExtension = path.extname(file.name)
  const fileName = `${type}_${Date.now()}${fileExtension}`
  const filePath = path.join(process.cwd(), 'public', 'uploads', fileName)

  try {
    await writeFile(filePath, buffer)
    return NextResponse.json({ url: `/uploads/${fileName}` })
  } catch (error) {
    console.error('Error saving file:', error)
    return NextResponse.json({ error: 'Error saving file' }, { status: 500 })
  }
}

