import { getPayloadClient } from '../../../payload/payloadClient';
import Link from 'next/link';

export default async function AdminDappProjectsPage() {
  const payload = await getPayloadClient();

  const { docs: dapps } = await payload.find({
    collection: 'dapp-projects',
    sort: '-createdAt',
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Manage Dapp Projects</h1>
      <Link href="/admin/dapp-projects/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create New Dapp Project
      </Link>
      <ul className="mt-4 space-y-2">
        {dapps.map((dapp) => (
          <li key={dapp.id} className="flex items-center justify-between bg-white p-4 shadow rounded-lg">
            <span>{dapp.title}</span>
            <div>
              <Link href={`/admin/dapp-projects/edit/${dapp.id}`} className="text-blue-600 hover:text-blue-800 mr-4">
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

