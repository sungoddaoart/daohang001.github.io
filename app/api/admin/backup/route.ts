import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import archiver from 'archiver'
import fs from 'fs'
import path from 'path'

export async function POST() {
  try {
    const backupDir = path.join(process.cwd(), 'backups')
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir)
    }

    const timestamp = new Date().toISOString().replace(/:/g, '-')
    const filename = `backup_${timestamp}.zip`
    const output = fs.createWriteStream(path.join(backupDir, filename))
    const archive = archiver('zip', { zlib: { level: 9 } })

    output.on('close', () => {
      console.log(`Backup created: ${archive.pointer()} total bytes`)
    })

    archive.on('error', (err) => {
      throw err
    })

    archive.pipe(output)

    // Backup database
    const dapps = await prisma.dapp.findMany()
    const categories = await prisma.category.findMany()
    const settings = await prisma.siteSettings.findFirst()

    archive.append(JSON.stringify({ dapps, categories, settings }), { name: 'database_backup.json' })

    // Backup uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    archive.directory(uploadsDir, 'uploads')

    await archive.finalize()

    // Stream the file to the client
    const fileStream = fs.createReadStream(path.join(backupDir, filename))
    return new NextResponse(fileStream, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename=${filename}`,
      },
    })
  } catch (error) {
    console.error('Error creating backup:', error)
    return NextResponse.json({ error: 'Failed to create backup' }, { status: 500 })
  }
}

