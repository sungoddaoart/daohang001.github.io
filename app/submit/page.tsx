'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { categories, blockchains } from '../dapps'

export default function SubmitDApp() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [blockchain, setBlockchain] = useState('')
  const [url, setUrl] = useState('')
  const [price, setPrice] = useState(100) // 默认价格
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // 这里应该调用支付API，但现在我们只是模拟
    const response = await fetch('/api/submit-dapp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, category, blockchain, url, price }),
    })

    if (response.ok) {
      alert('DApp 提交成功！')
      router.push('/client') // 提交后跳转到客户后台
    } else {
      alert('提交失败，请重试。')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">提交 DApp</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2">DApp 名称</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2">DApp 描述</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-2">分类</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">选择分类</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="blockchain" className="block mb-2">区块链</label>
          <select
            id="blockchain"
            value={blockchain}
            onChange={(e) => setBlockchain(e.target.value)}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">选择区块链</option>
            {blockchains.map(chain => (
              <option key={chain} value={chain}>{chain}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="url" className="block mb-2">DApp URL</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-2">广告费用 (元)</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            min="1"
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          提交并支付
        </button>
      </form>
    </div>
  )
}

