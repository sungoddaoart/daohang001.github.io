import { blogPosts } from '../../blogPosts'
import Link from 'next/link'

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = blogPosts.find(p => p.id === parseInt(params.id))

  if (!post) {
    return <div>文章未找到</div>
  }

  return (
    <div>
      <Link href="/blog" className="text-blue-600 hover:underline mb-4 inline-block">&larr; 返回博客列表</Link>
      <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
      <div className="mb-4 text-gray-600">
        <span>{post.author}</span> · <span>{post.date}</span> · 
        <Link href={`/blog?category=${post.category}`} className="text-blue-500 hover:underline ml-1">
          {post.category}
        </Link>
      </div>
      <p className="whitespace-pre-wrap">{post.content}</p>
    </div>
  )
}

