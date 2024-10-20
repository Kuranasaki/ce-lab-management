import getAllReservations from '../../data/repositories/getAllPricing';
import mapper from '../mapper/pricingTableMapper';
import { PricingApiResponse } from '../../data/models/Pricing';

export default async function getReservationTable() {
  const rawData = await getAllReservations();
  if ((rawData as PricingApiResponse).prices === undefined) {
    return [];
  }
  const mappedData = await mapper(rawData as PricingApiResponse);
  return mappedData;
}
