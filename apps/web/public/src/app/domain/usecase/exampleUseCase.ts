import getAllRawData from '../../data/repositories/getAllRawData';
import mapper from '../mapper/exampleMapper';

export default async function exampleUseCase() {
  const rawData = await getAllRawData();
  const mappedData = await mapper(rawData);
  return mappedData;
}
