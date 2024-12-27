import { buildConfig } from 'payload/config';
import path from 'path';
import Categories from './collections/Categories';
import BlogPosts from './collections/BlogPosts';
import DappProjects from './collections/DappProjects';
import Users from './collections/Users';
import Advertisements from './collections/Advertisements';

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [
    Categories,
    BlogPosts,
    DappProjects,
    Users,
    Advertisements,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});

