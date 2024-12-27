import { getPayloadClient } from '../../payload/payloadClient';
import Link from 'next/link';

export default async function CategoriesPage() {
  const payload = await getPayloadClient();

  const { docs: categories } = await payload.find({
    collection: 'categories',
  });

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Categories</h1>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <li key={category.id} className="border rounded-lg p-4">
            <Link href={`/categories/${category.id}`} className="text-lg font-medium text-blue-600 hover:underline">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

