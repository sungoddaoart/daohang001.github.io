import { getPayloadClient } from '../../../payload/payloadClient';
import Link from 'next/link';

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const payload = await getPayloadClient();

  const category = await payload.findByID({
    collection: 'categories',
    id: params.id,
  });

  const { docs: blogPosts } = await payload.find({
    collection: 'blog-posts',
    where: {
      category: {
        equals: params.id,
      },
    },
  });

  const { docs: dapps } = await payload.find({
    collection: 'dapp-projects',
    where: {
      category: {
        equals: params.id,
      },
    },
  });

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">{category.name}</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Blog Posts</h2>
        <ul className="space-y-4">
          {blogPosts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.id}`} className="text-lg text-blue-600 hover:underline">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Dapp Projects</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dapps.map((dapp) => (
            <li key={dapp.id} className="border rounded-lg p-4">
              <Link href={`/dapps/${dapp.id}`} className="text-lg font-medium text-blue-600 hover:underline">
                {dapp.title}
              </Link>
              <p className="text-sm text-gray-600 mt-2">{dapp.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

