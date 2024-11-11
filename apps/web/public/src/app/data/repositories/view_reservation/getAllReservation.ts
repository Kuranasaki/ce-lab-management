import {
  BaseResponse,
  GetAllReservationResponse,
} from '@ce-lab-mgmt/api-interfaces';
import { api, reservationApi } from '../../adapter/axios';
import { AxiosError } from 'axios';

export default async function getAllReservation(): Promise<
  BaseResponse<GetAllReservationResponse>
> {
  try {
    const response = await reservationApi.reservations.get();
    // const response = await api.get<BaseResponse<GetAllReservationResponse>>(
    //   '/reservations'
    // );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return new BaseResponse({ error: { code: error.response.data.status } });
    }
    return new BaseResponse({ error: { code: 500 } });
  }
}
