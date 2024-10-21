import { BaseResponse } from '@ce-lab-mgmt/api-interfaces';
import { api } from '../../adapter/axios';
import { RequestReservationRequest } from '../../models/request_reservation/request';
import { RequestReservationResponse } from '../../models/request_reservation/response';
import { AxiosError } from 'axios';

export default async function postRequestReservationRepository(
  data: RequestReservationRequest
): Promise<BaseResponse<RequestReservationResponse>> {
  try {
    const result = await api.post<BaseResponse<RequestReservationResponse>>(
      '/reservation',
      data
    );
    return result.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return new BaseResponse({ error: error.response.data.error });
    }
    return new BaseResponse({ error: { code: 500 } });
  }
}
