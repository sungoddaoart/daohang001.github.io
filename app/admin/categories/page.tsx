'use client'

import { useState, useEffect } from 'react'
import { Category } from '../../categories'
import { CategoryForm } from '../../components/CategoryForm'

export default function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/admin/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      } else {
        console.error('Failed to fetch categories')
      }
    }
    fetchCategories()
  }, [])

  const handleSubmit = async (category: Partial<Category>) => {
    const url = editingCategory ? `/api/admin/categories/${editingCategory.id}` : '/api/admin/categories'
    const method = editingCategory ? 'PUT' : 'POST'

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    })

    if (response.ok) {
      const updatedCategories = await response.json()
      setCategories(updatedCategories)
      setEditingCategory(null)
      setIsAdding(false)
    } else {
      alert('保存分类失败')
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('确定要删除这个分类吗？')) {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        const updatedCategories = await response.json()
        setCategories(updatedCategories)
      } else {
        alert('删除分类失败')
      }
    }
  }

  const renderCategoryTree = (category: Category, depth = 0) => {
    return (
      <li key={category.id} className={`bg-white p-4 rounded shadow ${depth > 0 ? 'ml-8 mt-4' : ''}`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{category.name}</h3>
          <div>
            <button
              onClick={() => setEditingCategory(category)}
              className="bg-yellow-500 text-white px-2 py-1 rounded text-sm mr-2"
            >
              编辑
            </button>
            <button
              onClick={() => handleDelete(category.id)}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              删除
            </button>
          </div>
        </div>
        <p className="text-gray-600 mb-2">{category.description}</p>
        <p className="text-sm text-gray-500">关键词: {category.keywords.join(', ')}</p>
        {category.children && category.children.length > 0 && (
          <ul className="mt-4 space-y-4">
            {category.children.map(child => renderCategoryTree(child, depth + 1))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">管理分类</h1>
      {(editingCategory || isAdding) && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{editingCategory ? '编辑分类' : '添加新分类'}</h2>
          <CategoryForm
            category={editingCategory || undefined}
            allCategories={categories}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditingCategory(null)
              setIsAdding(false)
            }}
          />
        </div>
      )}
      {!editingCategory && !isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          添加新分类
        </button>
      )}
      <ul className="space-y-4">
        {categories.filter(c => c.parentId === null).map(category => renderCategoryTree(category))}
      </ul>
    </div>
  )
}

