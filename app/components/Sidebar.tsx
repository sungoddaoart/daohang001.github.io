import { Dispatch, SetStateAction } from 'react'

interface SidebarProps {
  categories: string[]
  blockchains: string[]
  selectedCategory: string | null
  setSelectedCategory: Dispatch<SetStateAction<string | null>>
  selectedBlockchain: string | null
  setSelectedBlockchain: Dispatch<SetStateAction<string | null>>
}

export function Sidebar({
  categories,
  blockchains,
  selectedCategory,
  setSelectedCategory,
  selectedBlockchain,
  setSelectedBlockchain
}: SidebarProps) {
  return (
    <aside className="w-full md:w-64 bg-gray-100 p-6">
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">分类</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`w-full text-left px-2 py-1 rounded ${!selectedCategory ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
            >
              全部
            </button>
          </li>
          {categories.map(category => (
            <li key={category}>
              <button
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-2 py-1 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">区块链</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setSelectedBlockchain(null)}
              className={`w-full text-left px-2 py-1 rounded ${!selectedBlockchain ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
            >
              全部
            </button>
          </li>
          {blockchains.map(blockchain => (
            <li key={blockchain}>
              <button
                onClick={() => setSelectedBlockchain(blockchain)}
                className={`w-full text-left px-2 py-1 rounded ${selectedBlockchain === blockchain ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
              >
                {blockchain}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

