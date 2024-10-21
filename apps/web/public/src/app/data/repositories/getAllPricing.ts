import { BaseResponse } from '@ce-lab-mgmt/api-interfaces';
import { api } from '../axios/api';
import { AxiosError } from 'axios';
import { PricingApiResponse } from '../models/Pricing';

export default async function getAllPricing(): Promise<
  PricingApiResponse | BaseResponse<PricingApiResponse>
> {
  try {
    const response = await api.get<PricingApiResponse>('/pricing');

    return response.data;

    // return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return new BaseResponse({ error: { code: error.response.data.status } });
    }
    return new BaseResponse({ error: { code: 500 } });
  }
}
