import Image from 'next/image'
import Link from 'next/link'
import { DApp } from '../dapps'

interface DAppCardProps {
  dapp: DApp;
}

export function DAppCard({ dapp }: DAppCardProps) {
  return (
    <Link href={`/dapp/${dapp.id}`} className="block">
      <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center mb-4">
          <Image
            src={dapp.icon}
            alt={`${dapp.title} icon`}
            width={48}
            height={48}
            className="rounded-full mr-4"
          />
          <h3 className="text-xl font-semibold">{dapp.title}</h3>
        </div>
        <p className="text-gray-600 mb-2 line-clamp-2">{dapp.description}</p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {dapp.category}
          </span>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {dapp.blockchain}
          </span>
        </div>
      </div>
    </Link>
  )
}

