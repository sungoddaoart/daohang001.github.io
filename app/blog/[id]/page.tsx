import { getPayloadClient } from '../../../payload/payloadClient';
import Link from 'next/link';

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const payload = await getPayloadClient();

  const post = await payload.findByID({
    collection: 'blog-posts',
    id: params.id,
  });

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-8">
        By {post.author.name} | Category: <Link href={`/categories/${post.category.id}`} className="text-blue-600 hover:underline">{post.category.name}</Link>
      </p>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              {tag.tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

