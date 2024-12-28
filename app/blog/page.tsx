'use client'

import Link from 'next/link'
import { useState } from 'react'
import { blogPosts, categories } from '../blogPosts'

export default function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredPosts = selectedCategory
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">博客文章</h2>
      <div className="mb-4">
        <span className="mr-2">分类:</span>
        <button
          onClick={() => setSelectedCategory(null)}
          className={`mr-2 px-2 py-1 rounded ${!selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          全部
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`mr-2 px-2 py-1 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg shadow">
            <Link href={`/blog/${post.id}`} className="text-xl font-semibold hover:text-blue-600">
              {post.title}
            </Link>
            <p className="text-gray-600 mt-2">{post.content.substring(0, 100)}...</p>
            <div className="mt-2 text-sm text-gray-500">
              <span>{post.author}</span> · <span>{post.date}</span> · <span className="text-blue-500">{post.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

