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
    const response = await reservationApi.index.get();
    // const response = await api.get<BaseResponse<GetAllReservationResponse>>(
    //   '/reservations'
    // );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        error: {
          code: error.response.data.status,
          message: error.response.data.message,
        },
        success: false,
      };
    }
    return {
      error: { code: '500', message: 'Internal Server Error' },
      success: false,
    };
  }
}
