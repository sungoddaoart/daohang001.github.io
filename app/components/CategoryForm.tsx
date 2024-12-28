'use client'

import { useState, useEffect } from 'react'
import { Category } from '../categories'

interface CategoryFormProps {
  category?: Category
  allCategories: Category[]
  onSubmit: (category: Partial<Category>) => void
  onCancel: () => void
}

export function CategoryForm({ category, allCategories, onSubmit, onCancel }: CategoryFormProps) {
  const [formData, setFormData] = useState<Partial<Category>>(category || {
    name: '',
    keywords: [],
    description: '',
    parentId: null,
    children: []
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keywords = e.target.value.split(',').map(keyword => keyword.trim())
    setFormData(prev => ({ ...prev, keywords }))
  }

  const handleParentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const parentId = e.target.value ? parseInt(e.target.value) : null
    setFormData(prev => ({ ...prev, parentId }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">分类名称</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">关键词（用逗号分隔）</label>
        <input
          type="text"
          id="keywords"
          name="keywords"
          value={formData.keywords?.join(', ')}
          onChange={handleKeywordsChange}
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
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="parentId" className="block text-sm font-medium text-gray-700">父分类</label>
        <select
          id="parentId"
          name="parentId"
          value={formData.parentId || ''}
          onChange={handleParentChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">无 (顶级分类)</option>
          {allCategories
            .filter(c => c.id !== formData.id)
            .map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))
          }
        </select>
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

