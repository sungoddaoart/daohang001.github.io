import { getPayloadClient } from '../../../payload/payloadClient';
import Link from 'next/link';
import Image from 'next/image';

export default async function DappProjectPage({ params }: { params: { id: string } }) {
  const payload = await getPayloadClient();

  const dapp = await payload.findByID({
    collection: 'dapp-projects',
    id: params.id,
  });

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center mb-8">
        {dapp.logo && (
          <Image
            src={dapp.logo.url}
            alt={dapp.title}
            width={128}
            height={128}
            className="mr-6 rounded-full"
          />
        )}
        <h1 className="text-4xl font-bold">{dapp.title}</h1>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Categories</h2>
        <div className="flex gap-2">
          <Link href={`/categories/${dapp.category.id}`} className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold">
            {dapp.category.name}
          </Link>
          {dapp.subcategory && (
            <Link href={`/categories/${dapp.subcategory.id}`} className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold">
              {dapp.subcategory.name}
            </Link>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p>{dapp.description}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Details</h2>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: dapp.details }} />
      </div>

      {dapp.officialWebsite && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Official Website</h2>
          <a href={dapp.officialWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {dapp.officialWebsite}
          </a>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-2">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {dapp.tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              {tag.tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

