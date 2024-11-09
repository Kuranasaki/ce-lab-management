import getAllPricing from '../../../data/repositories/get_all_pricing/getAllPricing';
import mapper from '../../mapper/view_pricing/pricingTableMapper';

export default async function getReservationTable() {
  const rawData = await getAllPricing();
  if (rawData.error) {
    return [];
  }
  const mappedData = await mapper(rawData);
  return mappedData;
}
