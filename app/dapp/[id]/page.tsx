import { dapps } from '../../dapps'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { DAppSidebar } from '../../components/DAppSidebar'
import { DAppStats } from '../../components/DAppStats'
import { DAppCard } from '../../components/DAppCard'

export default function DAppPage({ params }: { params: { id: string } }) {
  const dapp = dapps.find(d => d.id === parseInt(params.id))

  if (!dapp) {
    notFound()
  }

  const relatedDapps = dapps
    .filter(d => d.category === dapp.category && d.id !== dapp.id)
    .slice(0, 4)

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6">
      <div className="lg:w-2/3">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <Image
              src={dapp.icon}
              alt={`${dapp.title} icon`}
              width={64}
              height={64}
              className="rounded-full mr-4"
            />
            <h1 className="text-3xl font-bold">{dapp.title}</h1>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">描述</h2>
            <p className="text-gray-600">{dapp.description}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">详情</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">类别：</p>
                <p>{dapp.category}</p>
              </div>
              <div>
                <p className="font-semibold">区块链：</p>
                <p>{dapp.blockchain}</p>
              </div>
            </div>
          </div>
          <Link 
            href={dapp.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            访问网站
          </Link>
          
          <div className="mt-8 bg-gray-100 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">DApp 简介</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">主要功能</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>功能1：{dapp.features?.[0] || '暂无信息'}</li>
                  <li>功能2：{dapp.features?.[1] || '暂无信息'}</li>
                  <li>功能3：{dapp.features?.[2] || '暂无信息'}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">技术特点</h3>
                <p className="text-gray-600">{dapp.techFeatures || '暂无信息'}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">用户群体</h3>
                <p className="text-gray-600">{dapp.targetAudience || '暂无信息'}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">发布日期</h3>
                <p className="text-gray-600">{dapp.launchDate || '暂无信息'}</p>
              </div>
            </div>
          </div>

          {dapp.showStats && dapp.stats && (
            <DAppStats stats={dapp.stats} />
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">相关 DApps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedDapps.map((relatedDapp) => (
              <DAppCard key={relatedDapp.id} dapp={relatedDapp} />
            ))}
          </div>
        </div>
      </div>
      <DAppSidebar currentDappId={dapp.id} />
    </div>
  )
}

