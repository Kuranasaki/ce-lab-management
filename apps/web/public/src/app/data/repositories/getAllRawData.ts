import { Response } from '@ce-lab-mgmt/api-interfaces';
import { RawData } from '../models/rawData';

export default async function getAllRawData(): Promise<Response<RawData[]>> {
  // Actual thing would be fetching data from API

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return new Response<RawData[]>(true, [
    {
      id: '1233212342',
      name: 'John Doe',
      price: 100,
    },
    {
      id: '1233212343',
      name: 'John Dee',
      price: 120,
    },
    {
      id: '1233212354',
      name: 'John Die',
      price: 150,
    },
  ]);
}
