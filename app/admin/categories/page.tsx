import { getPayloadClient } from '../../../payload/payloadClient';
import Link from 'next/link';

export default async function AdminCategoriesPage() {
  const payload = await getPayloadClient();

  const { docs: categories } = await payload.find({
    collection: 'categories',
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Manage Categories</h1>
      <Link href="/admin/categories/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create New Category
      </Link>
      <ul className="mt-4 space-y-2">
        {categories.map((category) => (
          <li key={category.id} className="flex items-center justify-between bg-white p-4 shadow rounded-lg">
            <span>{category.name}</span>
            <div>
              <Link href={`/admin/categories/edit/${category.id}`} className="text-blue-600 hover:text-blue-800 mr-4">
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

