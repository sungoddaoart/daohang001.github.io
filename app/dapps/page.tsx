import { getPayloadClient } from '../../payload/payloadClient';
import Link from 'next/link';
import Image from 'next/image';

export default async function DappsPage() {
  const payload = await getPayloadClient();

  const { docs: dapps } = await payload.find({
    collection: 'dapp-projects',
    sort: '-createdAt',
  });

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Dapp Projects</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dapps.map((dapp) => (
          <li key={dapp.id} className="border rounded-lg p-4">
            <Link href={`/dapps/${dapp.id}`} className="block">
              {dapp.logo && (
                <Image
                  src={dapp.logo.url}
                  alt={dapp.title}
                  width={64}
                  height={64}
                  className="mb-4 rounded-full"
                />
              )}
              <h2 className="text-xl font-medium text-blue-600 hover:underline">{dapp.title}</h2>
            </Link>
            <p className="text-sm text-gray-600 mt-2">{dapp.description}</p>
            <div className="mt-4">
              <span className="text-xs font-semibold bg-gray-200 rounded-full px-2 py-1">
                {dapp.category.name}
              </span>
              {dapp.subcategory && (
                <span className="text-xs font-semibold bg-gray-200 rounded-full px-2 py-1 ml-2">
                  {dapp.subcategory.name}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

