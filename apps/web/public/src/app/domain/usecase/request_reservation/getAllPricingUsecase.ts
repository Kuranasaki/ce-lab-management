import { PricingListProps } from '../../entity/request_reservation/pricingListProps';
import pricingListMapper from '../../mapper/request_reservation/pricingListMapper';

export default async function getAllPricingUsecase(): Promise<PricingListProps> {
  // To be implemented (Get all pricing list)
  // const response = await getAllPricing(); // Call Repository
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return pricingListMapper({});
}
