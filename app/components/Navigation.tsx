import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link href="/" className="hover:text-gray-300">DApp 列表</Link></li>
        <li><Link href="/admin" className="hover:text-gray-300">开发团队后台</Link></li>
        <li><Link href="/client" className="hover:text-gray-300">客户后台</Link></li>
        <li><Link href="/submit" className="hover:text-gray-300">提交 DApp</Link></li>
        <li><Link href="/blog" className="hover:text-gray-300">博客</Link></li>
      </ul>
    </nav>
  )
}

