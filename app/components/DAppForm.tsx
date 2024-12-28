'use client'

import { useState, useEffect } from 'react'
import { DApp } from '../dapps'
import { categories } from '../dapps'

interface DAppFormProps {
  dapp?: DApp
  onSubmit: (dapp: Partial<DApp>) => void
  onCancel: () => void
}

export function DAppForm({ dapp, onSubmit, onCancel }: DAppFormProps) {
  const [formData, setFormData] = useState<Partial<DApp>>(dapp || {
    title: '',
    description: '',
    category: '',
    blockchain: '',
    url: '',
    icon: '',
    showStats: false,
  })
  const [iconFile, setIconFile] = useState<File | null>(null)
  const [blockchainTags, setBlockchainTags] = useState<string[]>(dapp?.blockchain ? [dapp.blockchain] : [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIconFile(e.target.files[0])
    }
  }

  const handleBlockchainTagsChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
      e.preventDefault()
      const newTag = e.currentTarget.value.trim()
      if (!blockchainTags.includes(newTag)) {
        setBlockchainTags([...blockchainTags, newTag])
        setFormData(prev => ({ ...prev, blockchain: [...blockchainTags, newTag].join(', ') }))
      }
      e.currentTarget.value = ''
    }
  }

  const removeBlockchainTag = (tagToRemove: string) => {
    const updatedTags = blockchainTags.filter(tag => tag !== tagToRemove)
    setBlockchainTags(updatedTags)
    setFormData(prev => ({ ...prev, blockchain: updatedTags.join(', ') }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let iconUrl = formData.icon

    if (iconFile) {
      // 这里应该实现文件上传逻辑，并获取上传后的 URL
      // 为了示例，我们假设有一个 uploadIcon 函数来处理这个
      iconUrl = await uploadIcon(iconFile)
    }

    onSubmit({ ...formData, icon: iconUrl })
  }

  // 这个函数应该实现实际的文件上传逻辑
  const uploadIcon = async (file: File): Promise<string> => {
    // 这里应该是实际的文件上传逻辑
    // 为了示例，我们只是返回一个假的 URL
    return URL.createObjectURL(file)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">标题</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">描述</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">类别</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">选择类别</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="blockchain" className="block text-sm font-medium text-gray-700">区块链标签</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {blockchainTags.map(tag => (
            <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center">
              {tag}
              <button type="button" onClick={() => removeBlockchainTag(tag)} className="ml-1 text-blue-800 hover:text-blue-900">
                &times;
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          id="blockchain"
          onKeyDown={handleBlockchainTagsChange}
          placeholder="输入标签并按 Enter"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
        <input
          type="url"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="icon" className="block text-sm font-medium text-gray-700">图标</label>
        <div className="mt-1 flex items-center space-x-2">
          <input
            type="file"
            id="iconFile"
            accept="image/*"
            onChange={handleIconChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <span className="text-sm text-gray-500">或</span>
          <input
            type="url"
            id="icon"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            placeholder="输入图标 URL"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="showStats"
          name="showStats"
          checked={formData.showStats}
          onChange={(e) => setFormData(prev => ({ ...prev, showStats: e.target.checked }))}
          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <label htmlFor="showStats" className="ml-2 block text-sm text-gray-900">显示统计</label>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          取消
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          保存
        </button>
      </div>
    </form>
  )
}

