import { CollectionConfig } from 'payload/types';

const Advertisements: CollectionConfig = {
  slug: 'advertisements',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      required: true,
    },
    {
      name: 'position',
      type: 'select',
      options: [
        { label: 'Top', value: 'top' },
        { label: 'Sidebar', value: 'sidebar' },
      ],
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
    },
  ],
};

export default Advertisements;

