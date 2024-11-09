import getAllPricing from '../../../data/repositories/get_all_pricing/getAllPricing';
import { PricingListProps } from '../../entity/request_reservation/pricingListProps';
import pricingListMapper from '../../mapper/request_reservation/pricingListMapper';

export default async function getAllPricingUsecase(): Promise<PricingListProps | null> {
  // To be implemented (Get all pricing list)
  const response = await getAllPricing(); // Call Repository
  const data = response.data;
  if (data) return pricingListMapper(data);
  return null;
}
