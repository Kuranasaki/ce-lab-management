import getAllReservations from '../../data/repositories/getAllPricing';
import mapper from '../mapper/pricingTableMapper';

export default async function getReservationTable() {
  const rawData = await getAllReservations();
  if (rawData.error) {
    return [];
  }
  const mappedData = await mapper(rawData);
  return mappedData;
}
