import { getPayloadClient } from '../payload/payloadClient';
import Link from 'next/link';
import Image from 'next/image';
import Ad from '../components/Ad';

export default async function Home() {
  const payload = await getPayloadClient();

  const { docs: categories } = await payload.find({
    collection: 'categories',
    limit: 10,
  });

  const { docs: dapps } = await payload.find({
    collection: 'dapp-projects',
    limit: 10,
    sort: '-createdAt',
  });

  const { docs: topDapps } = await payload.find({
    collection: 'dapp-projects',
    limit: 5,
    sort: '-popularity',
  });

  const { docs: topAds } = await payload.find({
    collection: 'advertisements',
    where: {
      position: {
        equals: 'top',
      },
      startDate: {
        less_than_or_equal_to: new Date(),
      },
      endDate: {
        greater_than_or_equal_to: new Date(),
      },
    },
    limit: 1,
  });

  const { docs: sidebarAds } = await payload.find({
    collection: 'advertisements',
    where: {
      position: {
        equals: 'sidebar',
      },
      startDate: {
        less_than_or_equal_to: new Date(),
      },
      endDate: {
        greater_than_or_equal_to: new Date(),
      },
    },
    limit: 2,
  });

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Categories */}
        <aside className="lg:w-1/4">
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/categories/${category.id}`} className="text-blue-600 hover:underline">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content - DApp Projects */}
        <main className="lg:w-2/4">
          {/* Top Ad Space */}
          {topAds.length > 0 && (
            <div className="mb-8">
              <Ad {...topAds[0]} />
            </div>
          )}

          <h2 className="text-2xl font-semibold mb-4">Featured DApps</h2>
          <ul className="space-y-6">
            {dapps.map((dapp) => (
              <li key={dapp.id} className="border-b pb-4">
                <Link href={`/dapps/${dapp.id}`} className="flex items-center">
                  {dapp.logo && (
                    <Image
                      src={dapp.logo.url}
                      alt={dapp.title}
                      width={64}
                      height={64}
                      className="mr-4 rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-medium text-blue-600 hover:underline">{dapp.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{dapp.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </main>

        {/* Right Sidebar - Top DApps and Ads */}
        <aside className="lg:w-1/4">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Top DApps</h2>
            <ul className="space-y-4">
              {topDapps.map((dapp, index) => (
                <li key={dapp.id} className="flex items-center">
                  <span className="text-2xl font-bold mr-4 text-gray-400">{index + 1}</span>
                  <Link href={`/dapps/${dapp.id}`} className="text-blue-600 hover:underline">
                    {dapp.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Sponsored</h2>
            <div className="space-y-4">
              {sidebarAds.map((ad) => (
                <Ad key={ad.id} {...ad} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

