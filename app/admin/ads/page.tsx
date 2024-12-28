'use client'

import { useState } from 'react'

interface Ad {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
}

export default function ManageAds() {
  const [ads, setAds] = useState<Ad[]>([])
  const [newAd, setNewAd] = useState({ title: '', imageUrl: '', link: '' })

  const addAd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAd.title || !newAd.imageUrl || !newAd.link) return

    const response = await fetch('/api/admin/ads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAd),
    })

    if (response.ok) {
      const addedAd = await response.json()
      setAds([...ads, addedAd])
      setNewAd({ title: '', imageUrl: '', link: '' })
    } else {
      alert('添加广告失败')
    }
  }

  const deleteAd = async (id: number) => {
    const response = await fetch(`/api/admin/ads?id=${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      setAds(ads.filter(ad => ad.id !== id))
    } else {
      alert('删除广告失败')
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">管理广告</h1>
      <form onSubmit={addAd} className="mb-4 space-y-2">
        <input
          type="text"
          value={newAd.title}
          onChange={(e) => setNewAd({...newAd, title: e.target.value})}
          placeholder="广告标题"
          className="border p-2 w-full"
        />
        <input
          type="text"
          value={newAd.imageUrl}
          onChange={(e) => setNewAd({...newAd, imageUrl: e.target.value})}
          placeholder="图片 URL"
          className="border p-2 w-full"
        />
        <input
          type="text"
          value={newAd.link}
          onChange={(e) => setNewAd({...newAd, link: e.target.value})}
          placeholder="链接 URL"
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          添加广告
        </button>
      </form>
      <ul className="space-y-2">
        {ads.map((ad) => (
          <li key={ad.id} className="flex justify-between items-center bg-white p-2 rounded shadow">
            <div>
              <h3 className="font-bold">{ad.title}</h3>
              <p className="text-sm text-gray-500">{ad.link}</p>
            </div>
            <button
              onClick={() => deleteAd(ad.id)}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

