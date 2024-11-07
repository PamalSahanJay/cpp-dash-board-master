import { Product } from '../app/state/models/Product';

export const mockProductData: Product[] = [
  {
    productId: '12345678',
    authorName: 'Author 1',
    productItems: [
      {
        fileName: 'File 1',
        size: 500,
        modifiedDate: 1627545600000, // This is a timestamp for July 29, 2021
        versionLabel: 1,
        versions: [
          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },
        ],
      },      {
        fileName: 'File 2',
        size: 120,
        modifiedDate: 1627545600000, // This is a timestamp for July 29, 2021
        versionLabel: 1,
        versions: [
          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },
        ],
      },      {
        fileName: 'File 3',
        size: 100,
        modifiedDate: 1627545600000, // This is a timestamp for July 29, 2021
        versionLabel: 1,
        versions: [
          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          }
        ],
      },      {
        fileName: 'File 5',
        size: 200,
        modifiedDate: 1627545600000, // This is a timestamp for July 29, 2021
        versionLabel: 1,
        versions: [
          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          }
        ],
      },
    ],
  },
];

export const mockProductionData: Product[] = [
  {
    productId: '1d58d097-9248-4e2c-ac1b-270d47989c69',
    authorName: 'Author 1',
    productItems: [
      {
        fileName: 'File 1',
        size: 500,
        modifiedDate: 1627545600000, // This is a timestamp for July 29, 2021
        versionLabel: 1,
        versions: [
          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },
        ],
      },      {
        fileName: 'File 2',
        size: 120,
        modifiedDate: 1627545600000, // This is a timestamp for July 29, 2021
        versionLabel: 1,
        versions: [
          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },
        ],
      },      {
        fileName: 'File 3',
        size: 100,
        modifiedDate: 1627545600000, // This is a timestamp for July 29, 2021
        versionLabel: 1,
        versions: [
          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          }
        ],
      },      {
        fileName: 'File 5',
        size: 200,
        modifiedDate: 1627545600000, // This is a timestamp for July 29, 2021
        versionLabel: 1,
        versions: [
          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          },          {
            date: '2021-07-29',
            versionLabel: '1.0',
            size: 30,
          }
        ],
      },
    ],
  },
];

export const mockProductGenerator: Product[] = Array.from({ length: 5 }, (_, productIndex) => ({
  productId: `${productIndex + 1}`,
  authorName: `Author ${productIndex + 1}`,
  productItems: Array.from({ length: 11 }, (_, itemIndex) => ({
    fileName: `File ${productIndex * 10 + itemIndex + 1}`,
    size: 100 * (productIndex * 10 + itemIndex + 1),
    modifiedDate: 1627545600000 + (productIndex * 10 + itemIndex) * 24 * 60 * 60 * 1000, // This is a timestamp for July 29, 2021, plus some days
    versionLabel: itemIndex + 1,
    versions: Array.from({ length: 3 }, (_, versionIndex) => ({
      date: new Date(1627545600000 + (productIndex * 10 + itemIndex + versionIndex) * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // This is a date string for July 29, 2021, plus some days
      versionLabel: `${itemIndex + 1}.${versionIndex}`,
      size: 30 * (versionIndex + 1),
    })),
  })),
}));

