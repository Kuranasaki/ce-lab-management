import { BaseResponse, PricingItem } from '@ce-lab-mgmt/api-interfaces';
import { pricingApi } from '../../adapter/axios';
import { AxiosError } from 'axios';

export default async function getAllPricing(): Promise<
  BaseResponse<PricingItem[]>
> {
  try {
    const response = await pricingApi.pricing.index.get();
    return response.data;

    // return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return new BaseResponse({ error: { code: error.response.data.status } });
    }
    return new BaseResponse({ error: { code: 500 } });
  }
}
