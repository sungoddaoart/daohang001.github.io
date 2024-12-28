import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const adData = await request.json()
  // 这里应该添加将新广告保存到数据库的逻辑
  console.log('Adding new ad:', adData)
  return NextResponse.json({ ...adData, id: Date.now() }) // 模拟生成 ID
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  // 这里应该添加从数据库中删除广告的逻辑
  console.log('Deleting ad:', id)
  return NextResponse.json({ success: true })
}

