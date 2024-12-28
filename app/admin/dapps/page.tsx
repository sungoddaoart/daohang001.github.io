'use client'

import { useState, useEffect } from 'react'
import { DApp } from '../../dapps'
import { DAppForm } from '../../components/DAppForm'

export default function ManageDApps() {
  const [dapps, setDapps] = useState<DApp[]>([])
  const [editingDapp, setEditingDapp] = useState<DApp | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    const fetchDapps = async () => {
      const response = await fetch('/api/admin/dapps')
      if (response.ok) {
        const data = await response.json()
        setDapps(data)
      } else {
        console.error('Failed to fetch DApps')
      }
    }
    fetchDapps()
  }, [])

  const moveDApp = async (id: number, direction: 'up' | 'down') => {
    const response = await fetch('/api/admin/dapps/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, direction }),
    })

    if (response.ok) {
      const updatedDapps = await response.json()
      setDapps(updatedDapps)
    } else {
      alert('更新排序失败')
    }
  }

  const toggleStats = async (id: number) => {
    const response = await fetch('/api/admin/dapps/toggle-stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })

    if (response.ok) {
      const updatedDapps = await response.json()
      setDapps(updatedDapps)
    } else {
      alert('更新统计显示设置失败')
    }
  }

  const handleSubmit = async (dapp: Partial<DApp>) => {
    const url = editingDapp ? `/api/admin/dapps/${editingDapp.id}` : '/api/admin/dapps'
    const method = editingDapp ? 'PUT' : 'POST'

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dapp),
    })

    if (response.ok) {
      const updatedDapps = await response.json()
      setDapps(updatedDapps)
      setEditingDapp(null)
      setIsAdding(false)
    } else {
      alert('保存 DApp 失败')
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('确定要删除这个 DApp 吗？')) {
      const response = await fetch(`/api/admin/dapps/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        const updatedDapps = await response.json()
        setDapps(updatedDapps)
      } else {
        alert('删除 DApp 失败')
      }
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">管理 DApps</h1>
      {(editingDapp || isAdding) && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{editingDapp ? '编辑 DApp' : '添加新 DApp'}</h2>
          <DAppForm
            dapp={editingDapp || undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditingDapp(null)
              setIsAdding(false)
            }}
          />
        </div>
      )}
      {!editingDapp && !isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          添加新 DApp
        </button>
      )}
      <ul className="space-y-2">
        {dapps.map((dapp, index) => (
          <li key={dapp.id} className="flex justify-between items-center bg-white p-2 rounded shadow">
            <span>{dapp.title}</span>
            <div>
              <button
                onClick={() => moveDApp(dapp.id, 'up')}
                disabled={index === 0}
                className="bg-blue-500 text-white px-2 py-1 rounded text-sm mr-2 disabled:bg-gray-300"
              >
                上移
              </button>
              <button
                onClick={() => moveDApp(dapp.id, 'down')}
                disabled={index === dapps.length - 1}
                className="bg-blue-500 text-white px-2 py-1 rounded text-sm mr-2 disabled:bg-gray-300"
              >
                下移
              </button>
              <button
                onClick={() => toggleStats(dapp.id)}
                className={`px-2 py-1 rounded text-sm mr-2 ${dapp.showStats ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
              >
                {dapp.showStats ? '隐藏统计' : '显示统计'}
              </button>
              <button
                onClick={() => setEditingDapp(dapp)}
                className="bg-yellow-500 text-white px-2 py-1 rounded text-sm mr-2"
              >
                编辑
              </button>
              <button
                onClick={() => handleDelete(dapp.id)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm"
              >
                删除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

