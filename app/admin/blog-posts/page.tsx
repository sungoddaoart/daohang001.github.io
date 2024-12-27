import { getPayloadClient } from '../../../payload/payloadClient';
import Link from 'next/link';

export default async function AdminBlogPostsPage() {
  const payload = await getPayloadClient();

  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    sort: '-createdAt',
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Manage Blog Posts</h1>
      <Link href="/admin/blog-posts/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create New Blog Post
      </Link>
      <ul className="mt-4 space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="flex items-center justify-between bg-white p-4 shadow rounded-lg">
            <span>{post.title}</span>
            <div>
              <Link href={`/admin/blog-posts/edit/${post.id}`} className="text-blue-600 hover:text-blue-800 mr-4">
                Edit
              </Link>
              <button className="text-red-600 hover:text-red-800">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

