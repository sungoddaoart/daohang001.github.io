import { dapps } from '../dapps'
import Link from 'next/link'
import Image from 'next/image'

interface Ad {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
}

const ads: Ad[] = [
  {
    id: 1,
    title: "区块链峰会",
    imageUrl: "/ads/blockchain-summit.webp",
    link: "https://example.com/blockchain-summit"
  },
  {
    id: 2,
    title: "加密货币交易所",
    imageUrl: "/ads/crypto-exchange.webp",
    link: "https://example.com/crypto-exchange"
  }
]

export function DAppSidebar({ currentDappId }: { currentDappId: number }) {
  const topDapps = dapps
    .filter(dapp => dapp.id !== currentDappId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  return (
    <div className="lg:w-1/3 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">广告</h2>
        <div className="space-y-4">
          {ads.map(ad => (
            <a 
              key={ad.id} 
              href={ad.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block"
            >
              <Image 
                src={ad.imageUrl} 
                alt={ad.title} 
                width={300} 
                height={200} 
                className="rounded-lg mb-2"
              />
              <p className="text-sm font-semibold">{ad.title}</p>
            </a>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">热门 DApps</h2>
        <div className="space-y-4">
          {topDapps.map(dapp => (
            <Link key={dapp.id} href={`/dapp/${dapp.id}`} className="flex items-center hover:bg-gray-100 p-2 rounded-lg">
              <Image
                src={dapp.icon}
                alt={`${dapp.title} icon`}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{dapp.title}</p>
                <p className="text-sm text-gray-600">{dapp.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

