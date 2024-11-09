import {
  BaseResponse,
  CreateTestFormRequestSchema,
  CreateTestFormResponseSchema,
} from '@ce-lab-mgmt/api-interfaces';
import { api } from '../../adapter/axios';
import { AxiosError } from 'axios';

export default async function postAddTestFormRepository(
  request: typeof CreateTestFormRequestSchema.static
): Promise<BaseResponse<typeof CreateTestFormResponseSchema.static>> {
  try {
    const response = await api.post<
      BaseResponse<typeof CreateTestFormResponseSchema.static>
    >('/test-form', request);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return new BaseResponse({ error: { code: error.response.data.status } });
    }
    return new BaseResponse({ error: { code: 500 } });
  }
}
