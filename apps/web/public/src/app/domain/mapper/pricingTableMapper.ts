import { ToastEntity } from '@ce-lab-mgmt/shared-ui';
import { PricingApiResponse } from '../../data/models/Pricing';
import PricingTableItem from '../entity/pricingTableItem';
import { BaseResponse } from '@ce-lab-mgmt/api-interfaces';

export default async function mapper(
  rawData: PricingApiResponse | undefined
): Promise<PricingTableItem[] | ToastEntity> {
  if (!rawData) {
    return [];
  }
  if (rawData.success === false) {
    return ToastEntity.fromCode(400);
  }

  if (!rawData.prices) {
    return ToastEntity.unknownError();
  }

  const groupedData: PricingTableItem[] = rawData.prices.map((priceItem) => {
    return new PricingTableItem(
      priceItem.description,
      priceItem.id,
      priceItem.name,
      priceItem.pricing,
      priceItem.tags
    );
  });

  return groupedData;
}
