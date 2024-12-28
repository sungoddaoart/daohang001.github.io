import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // 确保上传目录存在
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  await writeFile(path.join(uploadDir, file.name), buffer)

  return NextResponse.json({ success: true, url: `/uploads/${file.name}` })
}

