import { BaseResponse } from '@ce-lab-mgmt/api-interfaces';
import { api } from '../axios/api';
import { AxiosError } from 'axios';
import { PricingItem } from '../models/Pricing';

export default async function getAllPricing(): Promise<
  BaseResponse<PricingItem[]>
> {
  try {
    const response = await api.get<BaseResponse<PricingItem[]>>('/pricing');

    return response.data;

    // return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return new BaseResponse({ error: { code: error.response.data.status } });
    }
    return new BaseResponse({ error: { code: 500 } });
  }
}
