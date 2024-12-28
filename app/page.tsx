'use client'

import { useState } from 'react'
import Link from 'next/link'
import { dapps, categories, blockchains } from './dapps'
import { DAppCard } from './components/DAppCard'
import { Sidebar } from './components/Sidebar'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedBlockchain, setSelectedBlockchain] = useState<string | null>(null)

  const filteredDapps = dapps.filter(dapp => 
    (!selectedCategory || dapp.category === selectedCategory) &&
    (!selectedBlockchain || dapp.blockchain === selectedBlockchain)
  )

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar 
        categories={categories}
        blockchains={blockchains}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedBlockchain={selectedBlockchain}
        setSelectedBlockchain={setSelectedBlockchain}
      />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">DApp 目录</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDapps.map((dapp) => (
            <Link key={dapp.id} href={`/dapp/${dapp.id}`}>
              <DAppCard dapp={dapp} />
            </Link>
          ))}
        </div>
        {filteredDapps.length === 0 && (
          <p className="text-center text-gray-500 mt-10">没有找到符合条件的 DApp</p>
        )}
      </main>
    </div>
  )
}

