import { CollectionConfig } from 'payload/types';

const DappProjects: CollectionConfig = {
  slug: 'dapp-projects',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      required: true,
    },
    {
      name: 'subcategory',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'officialWebsite',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'details',
      type: 'richText',
    },
    {
      name: 'popularity',
      type: 'number',
      defaultValue: 0,
    },
  ],
};

export default DappProjects;

