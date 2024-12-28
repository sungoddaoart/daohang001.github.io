import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-5">
          <Link href="/admin/dashboard" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            仪表板
          </Link>
          <Link href="/admin/categories" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            管理分类
          </Link>
          <Link href="/admin/dapps" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            管理 DApps
          </Link>
          <Link href="/admin/ads" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            管理广告
          </Link>
          <Link href="/admin/settings" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            网站设置
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

