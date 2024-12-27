import { getPayloadClient } from '../../payload/payloadClient';
import Link from 'next/link';

export default async function BlogPage() {
  const payload = await getPayloadClient();

  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    sort: '-createdAt',
  });

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-4">
            <Link href={`/blog/${post.id}`} className="text-xl font-medium text-blue-600 hover:underline">
              {post.title}
            </Link>
            <p className="text-sm text-gray-600 mt-2">
              By {post.author.name} | Category: {post.category.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

